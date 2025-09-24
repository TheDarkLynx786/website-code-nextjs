"use client"

import styles from "@/styles/musicDisplay.module.css"
import Card from "./card";
import Link from "next/link"
import Image from "next/image";
import { useState, useEffect } from 'react';
import { formatDateWithSuffix } from '@/_lib/dateUtils';
import { usePathname } from 'next/navigation';
import musicInfo from '@/_content/musicInfo.json';

// I am in CS class right now
// Wanted to just write that assert is a really good debugging tool
// (Future reference for other languages)


// Create a display feed for the albums (clickable)
export default function MusicDisplay() {
    
    // In this context, albums are dictionaries with album metadata
    
    const pathname = usePathname();
    const album_list = Object.keys(musicInfo);

    // Page Check for page-specific rendering

    useEffect(() => {
        
        function handleResize() {
            
        }
        
        handleResize(); // set initial value
        window.addEventListener('resize', handleResize);
        
        return () => { window.removeEventListener('resize', handleResize); }

    }, []);


    
    

    const albumCards = album_list.map( (album_iter) => {

        console.log(album_iter);

        const album = musicInfo[album_iter]

        const albumName = album["albumTitle"];
        const albumArtist = album["albumArtist"];
        const albumInfo = album["albumInfo"];
        const albumYear = album["albumYear"];
        const albumGenre = album["albumGenre"];
        const musicSlug = album["musicSlug"]

        // DEBUG
        console.log(albumArtist, " ", albumName, " ", albumInfo, " ", albumYear, " ", albumGenre);

        const key = albumName + albumYear;

        console.log(album);

        return ( 
            <Card key={key} cardStyle={`${styles.card} ${styles.musicDisplayCard}`} wrapperStyle={`${styles.musicDisplayWrapper}`} href={`/music/${musicSlug}`}  >
                <h2 className={styles.postTitle}>{albumName}</h2>
                <p className={styles.postDesc}>{albumArtist}</p>
            </Card>
        );
    
    });

    return (
        <div className={styles.musicDisplayContainer}>
            <div className={styles.musicDisplay}>    
                {albumCards}
            </div>
        </div>
    );
    
};