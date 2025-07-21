import styles from "./page.module.css";
import Hero from "@/_components/hero";
import PostFeed from "@/_components/postFeed";
import { PostGen } from '@/_lib/posts';

export default async function Home() {
  
  const posts = await PostGen();
  
  return (
    <>
      <Hero />
      <div className={styles.page}>
        <PostFeed posts={posts}/>
      </div>
    </> 
  );
}
