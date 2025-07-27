import styles from "@/styles/page.module.css";
import Hero from "@/_components/hero";
import { HomePostFeed } from "@/_components/postFeed";
import { PostGen } from '@/_lib/posts';

export default async function Home() {
  
  const posts = await PostGen();
  
  return (
    <>
      <Hero />
      <div className={styles.page}>
        <HomePostFeed posts={posts}/>
      </div>
    </> 
  );
}
