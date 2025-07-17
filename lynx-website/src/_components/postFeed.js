import styles from '@/styles/postFeed.module.css'
import Link from 'next/link';
import Card from './card';

export default function PostFeed({posts}) {
    
    const postCards = posts.map((post) => (
        <Card key={post.slug} style={`${styles.card} ${styles.postFeedCard}`} href={`/posts/${post.slug}`} img={post.img ? `/images/${post.img}` : null}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postDesc}>{post.content}</p>
        </Card>
    ));

    return (
        <div className={styles.postFeedContainer}>
            <h1 className={styles.postFeedHeader}>Latest Posts:</h1>
            <div className={styles.postFeed}>    
                {postCards}
            </div>
        </div>
    );
}