import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { notFound } from 'next/navigation';

const postsDirectory = path.join(process.cwd(), 'src', '_content', 'articles');

/* Return array of filenames in /src/app/_contents/articles (w/o .md extension) */
export function getPostFileNames() {
  return fs.readdirSync(postsDirectory).map((filename) => ({ filename: filename.replace(/\.md$/, ''), }));
}

export async function getFileNameFromSlug(slug) {
  const files = getPostFileNames();
  // Map each file to a promise that resolves to { filename, slug }
  const posts = await Promise.all(
    files.map(async file => {
      const post = await getPostByFileName(file.filename);
      console.log('filename:', file.filename, 'slug:', post.slug);
      return { filename: file.filename, slug: post.slug };
    })
  );
  const match = posts.find(post => post.slug === slug);
  if (!match) {
    notFound();
  }
  return match.filename;
}

/* Read markdown file yaml frontmatter and retrieve contents */
export async function getPostByFileName(filename) {
  const fullPath = path.join(postsDirectory, `${filename}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  
  /* Convert markdown content to HTML */
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  
  /* Custom slug handling (filename if slug not defined) */
  const slug = data.slug || filename;

  return {
    frontmatter: data,
    contentHtml,
    slug,
    filename,
  };
}

export async function PostGen() {
    const filenames = getPostFileNames();
    const posts = await Promise.all(
    filenames.map(async ({ filename }) => {
      console.log("Post filename: ", filename);
      const { frontmatter } = await getPostByFileName(filename);
      console.log("Post frontmatter: ", frontmatter);
      return {
        title: frontmatter.title,
        subtitle: frontmatter.subtitle,
        slug: frontmatter.slug || filename, 
        date: frontmatter.date,
        readTime: frontmatter.readTime,
        img: frontmatter.img,
      };
    })
  );

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}