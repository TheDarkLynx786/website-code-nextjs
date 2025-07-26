import styles from "@/styles/page.module.css";
import PostsPostFeed from "@/_components/postFeed";
import { PostGen } from '@/_lib/posts';

export default async function About() {
  
  const posts = await PostGen();
  
  return (
    <div className={styles.page}>
      <PostsPostFeed posts={posts}/>
    </div>
  );
}