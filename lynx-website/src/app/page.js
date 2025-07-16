import styles from "./page.module.css";
import Hero from "@/_components/hero";
import PostFeed from "@/_components/postFeed";
import { getPostFileNames, getPostByFileName } from '@/_lib/posts';

export default async function Home() {
  
  const filenames = getPostFileNames();
  const posts = await Promise.all(
    filenames.map(async ({ filename }) => {
      console.log("Post filename: ", filename);
      const { frontmatter } = await getPostByFileName(filename);
      console.log("Post frontmatter: ", frontmatter);
      return {
        title: frontmatter.title,
        content: frontmatter.subtitle,
        slug: frontmatter.slug || filename, 
        date: frontmatter.date,
        readTime: frontmatter.readTime,
        img: frontmatter.img,
      };
    })
  );
  
  return (
    <>
      <Hero />
      <div className={styles.page}>
        <PostFeed posts={posts}/>
      </div>
    </> 
  );
}
