import styles from "@/styles/page.module.css";
import PostFeed from "@/_components/postFeed";
import { PostGen } from '@/_lib/posts';

export default async function About() {
  
  const posts = await PostGen();
  
  return (
    <div className={styles.page}>
      <PostFeed posts={posts}/>
    </div>
  );
}