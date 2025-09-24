import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import breaks from 'remark-breaks';
import { notFound } from 'next/navigation';
import { PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER } from 'next/dist/lib/constants';

export const postsDirectory = path.join(process.cwd(), 'src', '_content', 'articles');

/* Return array of filenames in /src/app/_contents/articles (w/o .md extension) */
export function getPostFileNames(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getPostFileNames(filePath));
    } else if (file.endsWith('.md')) {
      // Get relative path from postsDirectory
      const relativePath = path.relative(postsDirectory, filePath);
      // Split into subfolder and filename (without .md)
      const parts = relativePath.split(path.sep);
      const filename = parts.pop().replace(/\.md$/, '');
      const subfolder = parts.join(path.sep); // '' if in root
      results.push({ filename, subfolder, filePath });
    }
  });
  
  return results;
}

/* Given a slug, retrieve the file it corresponds to */
export async function getFileNameFromSlug(slug) {
  const files = getPostFileNames(postsDirectory);
  // Map each file to a promise that resolves to { filename, slug }
  const posts = await Promise.all(
    files.map(async file => {
      const post = await getPostByFileName(file.filename, file.subfolder);
      console.log('filename:', file.filename, 'slug:', post.slug);
      return { filename: file.filename, subfolder: file.subfolder, slug: post.slug };
    })
  );
  const match = posts.find(post => post.slug === slug);
  if (!match) {
    notFound();
  }
  return match;
}

/* Read markdown file yaml frontmatter and retrieve contents */
export async function getPostByFileName(filename, subdir) {
  
  console.log("Fetching post by filename: ", filename, " in subdir: ", subdir);

  const fullPath = path.join(postsDirectory, `${subdir}`, `${filename}.md`);
  console.log("Post full path: ", fullPath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');


  const { data, content } = matter(fileContents);
  
  /* Convert markdown content to HTML */
  const processedContent = await remark().use(gfm).use(breaks).use(html).process(content);
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
    const filenames = getPostFileNames(postsDirectory);
    const posts = await Promise.all(
    filenames.map(async ({ filename, subfolder }) => {
      console.log("Filename: ", filename)
      const { frontmatter } = await getPostByFileName(filename, subfolder);
      console.log("Post frontmatter: ", frontmatter);
      
      // Draft filtering
      if (frontmatter.draft) {
        return null;
      }
      
      return {
        title: frontmatter.title,
        subtitle: frontmatter.subtitle,
        slug: frontmatter.slug || filename, 
        date: frontmatter.date,
        readTime: frontmatter.readTime,
        img: frontmatter.img,
        filename: filename,
      };
    })
  );
  
  // Filter out drafts from the mapping
  const filteredPosts = posts.filter(post => post !== null);
  return filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}