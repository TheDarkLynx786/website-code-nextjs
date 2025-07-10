import styles from './postFeed.module.css'
import Card from './card';

export default function PostFeed({posts}) {
    return (
        <div className={styles.postFeed}>
            {posts.map((post) => (
                <Card style={styles.postDisplayCard}>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <p className={styles.postContent}>{post.content}</p>
                </Card>
            ))}
        </div>
    );
}