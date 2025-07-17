import styles from '@/styles/postFeed.module.css'
import Link from 'next/link';
import Card from './card';

export default function PostFeed({posts}) {
    
    const postCards = posts.map((post) => (
        <Card key={post.slug} href={`/posts/${post.slug}`} style={styles.postDisplayCard} img={post.img ? `/images/${post.img}` : null}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postContent}>{post.content}</p>
        </Card>
    ));

    return (
        <div className={styles.postFeedContainer}>
            <h1>Latest Posts:</h1>
            <div className={styles.postFeed}>    
                {postCards}
            </div>
        </div>
    );
}