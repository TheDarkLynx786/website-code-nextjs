import { getPostFileNames, getFileNameFromSlug, getPostByFileName } from '@/_lib/posts';
import styles from '@/styles/article.module.css';

let slugToFilenameMap = null;

export async function generateStaticParams() {
  const posts = getPostFileNames();
  console.log(posts);
  // Build a map from slug to filename
  slugToFilenameMap = {};
  return posts.map( ({ filename }) => ({ filename }) );
}

export default async function PostPage({ params }) {
  const filename = await getFileNameFromSlug(params.slug);
  console.log("filename fetched from slug: ", filename);
  const { contentHtml, frontmatter } = await getPostByFileName(filename);

  return (
    <div className={styles.bgColor}>
      <article className={styles.articleStyle} >
        <h1 className={styles.title}>{frontmatter.title}</h1>
        <h2 className={styles.subtitle}>{frontmatter.subtitle}</h2>
        <div className={styles.metaInfo}>
          <h2 className={styles.date}>{frontmatter.date}</h2>
          <h2 className={styles.readTime}>{frontmatter.readTime} minute read</h2>
        </div>

        <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </div>
  );
}