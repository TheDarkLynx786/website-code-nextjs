import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import breaks from 'remark-breaks';
import styles from "@/styles/article.module.css";
import { formatDateWithSuffix } from "@/_lib/dateUtils";
import Image from "next/image";



/* Return array of filenames in /src/app/_contents/articles (w/o .md extension) */
export async function processAboutMarkdown() {
  const aboutMePath = path.join(process.cwd(), 'src', '_content', 'about.md');
  const fileContents = fs.readFileSync(aboutMePath, 'utf8');

  const { content } = matter(fileContents);
  
  /* Convert markdown content to HTML */
  const processedContent = await remark().use(gfm).use(breaks).use(html).process(content);
  const contentHtml = processedContent.toString();

  return contentHtml;
}

export default async function About() {
  const date = new Date();

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const dd = String(date.getDate()).padStart(2, '0');

  const formatted = `${yyyy}/${mm}/${dd}`;

  const readTime = 1;

  const contentHtml = await processAboutMarkdown();
  
  // Date
  const dateComponent =
  <div className={styles.metaInfoDiv}>
    <Image
      src={'/icons/calendar-time.svg'}
      alt="Calendar Icon"
      width={24}
      height={24}
      className={styles.metaInfoIcon}
    />
    <h2 className={styles.metaInfoText}> {formatDateWithSuffix(formatted)} </h2>
  </div>;

  // Read Time
  const readTimeComponent = 
  <div className={styles.metaInfoDiv}>
    <Image
      src={'/icons/clock-hour-4.svg'}
      alt="Clock Icon"
      width={24}
      height={24}
      className={styles.metaInfoIcon}
    />
    <h2 className={styles.metaInfoText}>{readTime} minute read</h2>
  </div>;

  // Meta Information
  const metaInfo =
  <div className={styles.metaInfo}>
    {dateComponent}
    {readTimeComponent}
  </div>;

  // Return complete page
  return (
    <div className={styles.bgColor}>
      <article className={`${styles.articleStyle} ${styles.noImg}`} >
        
        

        <h1 className={styles.title}>About Me</h1>
        <h2 className={styles.subtitle}>Welcome to my website!</h2>
        
        {/* Meta Information */}
        { metaInfo}
        
        {/* Article Content */}
        <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </div>
  );
}