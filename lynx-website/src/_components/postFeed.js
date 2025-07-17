"use client";

import styles from '@/styles/postFeed.module.css'
import Link from 'next/link';
import Card from './card';
import {useState, useEffect} from 'react';

export default function PostFeed({posts}) {
    
    const [limit, setLimit] = useState(6);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 600) {
                setLimit(3); // mobile
            } else if (window.innerWidth <= 900) {
                setLimit(4); // tablet
            } else {
                setLimit(6); // desktop
            }
        }
        handleResize(); // set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const postCards = posts.slice(0, limit).map((post) => (
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
            <Link href="/posts" className={styles.seeMore}> {'<'}{'<'} See More Posts {'>'}{'>'} </Link>
        </div>
    );
}