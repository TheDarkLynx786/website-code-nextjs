import { getPostFileNames, getFileNameFromSlug, getPostByFileName } from '@/_lib/posts';
import styles from '@/styles/article.module.css';
import Image from 'next/image';
import { load } from 'cheerio';
import { formatDateWithSuffix } from '@/_lib/dateUtils';
import { notFound } from 'next/navigation';

let slugToFilenameMap = null;

export async function generateStaticParams() {
  const posts = getPostFileNames();
  console.log(posts);
  
  // Build a map from slug to filename
  slugToFilenameMap = {};
  return posts.map( ({ filename }) => ({ filename }) );
}


export default async function PostPage({ params }) {
  // Ensure params is awaited and resolved
  params = await params;

  const filename = await getFileNameFromSlug(params.slug);
  console.log("filename fetched from slug: ", filename);
  const { contentHtml, frontmatter } = await getPostByFileName(filename);

   // Redirect to 404 if draft
  if (frontmatter.draft) {
    return notFound();
  }

  const image = frontmatter.img ? <Image src={`/images/${filename}/${frontmatter.img}`} alt={frontmatter.title} width={800} height={400} className={styles.image} /> : null;
 
  // Table of Contents Generation
  const $ = load(contentHtml);
  const headers = [];
  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const tag = el.tagName.toLowerCase();
    headers.push({
      text: $(el).text(),
      id: $(el).attr('id') || $(el).text(), // If no markdown file ID, then generate one
      level: parseInt(tag.replace('h', ''), 10),
    });
  });

  // Build hierarchical structure
  function buildTocTree(headers) {
    const toc = [];
    const stack = [];
    headers.forEach(header => {
      const item = { ...header, children: [] };
      while (stack.length && stack[stack.length - 1].level >= item.level) {
        stack.pop();
      }
      if (stack.length === 0) {
        toc.push(item);
        stack.push(item);
      } else {
        stack[stack.length - 1].children.push(item);
        stack.push(item);
      }
    });
    return toc;
  }
  const tocTree = buildTocTree(headers);

  // Helper to render ToC recursively
  function renderToc(items) {
    if (!items.length) return null;
    return (
      <ol>
        {items.map(item => (
          <li key={item.text + item.level}>
            <a href={`#${item.id}`}>{item.text}</a>
            {renderToc(item.children)}
          </li>
        ))}
      </ol>
    );
  }

  // Compartmentalization (in case certain frontmatters are not present)
  
  // Date
  const date = frontmatter.date ? 
  <div className={styles.metaInfoDiv}>
    <Image
      src={'/icons/calendar-time.svg'}
      alt="Calendar Icon"
      width={24}
      height={24}
      className={styles.metaInfoIcon}
    />
    <h2 className={styles.metaInfoText}> {formatDateWithSuffix(frontmatter.date)} </h2>
  </div>
  : null;

  // Read Time
  const readTime = frontmatter.readTime ? 
  <div className={styles.metaInfoDiv}>
    <Image
      src={'/icons/clock-hour-4.svg'}
      alt="Clock Icon"
      width={24}
      height={24}
      className={styles.metaInfoIcon}
    />
    <h2 className={styles.metaInfoText}>{frontmatter.readTime} minute read</h2>
  </div>
  : null;

  // Meta Information
  const metaInfo = ( {date} || {readTime} ) ?
  <div className={styles.metaInfo}>
    {date}
    {readTime}
  </div>
  : null;
  
  // Table of Contents
  const toc = tocTree.length > 0 ?
  <div className={styles.toc}>
    <h1>Table of Contents:</h1>
    {renderToc(tocTree)}
  </div>
  : null;

  // Return complete page
  return (
    <div className={styles.bgColor}>
      {image}
      <article className={`${styles.articleStyle} ${ (image == null) ? styles.noImg : styles.withImg }`} >
        
        

        <h1 className={styles.title}>{frontmatter.title}</h1>
        <h2 className={styles.subtitle}>{frontmatter.subtitle}</h2>
        
        {/* Meta Information */}
        { metaInfo}

        {/* Table of Contents */} 
        { toc }
        
        {/* Article Content */}
        <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </div>
  );
}