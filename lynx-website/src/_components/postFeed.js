"use client";

import styles from '@/styles/postFeed.module.css'
import Link from 'next/link';
import Card from './card';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import { formatDateWithSuffix } from '@/_lib/dateUtils';

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

    const postCards = posts.slice(0, limit).map((post) => {
        // Meta Information Compartmentalization
        
        // Date
        const date = post.date ? 
        <div className={styles.metaInfoDiv}>
            <Image
            src={'/icons/calendar-time.svg'}
            alt="Calendar Icon"
            width={24}
            height={24}
            className={styles.metaInfoIcon}
            />
            <h2 className={styles.metaInfoText}> {formatDateWithSuffix(post.date)} </h2>
        </div>
        : null;

        // Read Time
        const readTime = post.readTime ? 
        <div className={styles.metaInfoDiv}>
            <Image
            src={'/icons/clock-hour-4.svg'}
            alt="Clock Icon"
            width={24}
            height={24}
            className={styles.metaInfoIcon}
            />
            <h2 className={styles.metaInfoText}>{post.readTime} minute read</h2>
        </div>
        : null;

        // Meta Information
        const metaInfo = ( {date} || {readTime} ) ?
        <div className={styles.metaInfo}>
            {date}
            {readTime}
        </div>
        : null;
        
        
        return (
            <Card key={post.slug} style={`${styles.card} ${styles.postFeedCard}`} href={`/posts/${post.slug}`} img={post.img ? `/images/${post.img}` : null}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postDesc}>{post.subtitle}</p>
                { metaInfo }
            </Card>
        );    
    });

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