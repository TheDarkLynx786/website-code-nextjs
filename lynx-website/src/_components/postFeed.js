import styles from '@/styles/postFeed.module.css'
import Link from 'next/link';
import Card from './card';

export default function PostFeed({posts}) {
    
    const postCards = posts.map((post) => (
        <Link key={post.slug} href={`/posts/${post.slug}`}>
            <Card  style={styles.postDisplayCard}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postContent}>{post.content}</p>
            </Card>
        </Link>
    ));

    return (
        <div className={styles.postFeed}>
            {postCards}
        </div>
    );
}