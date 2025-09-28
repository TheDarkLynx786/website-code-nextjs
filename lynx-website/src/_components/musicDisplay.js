"use client"

import styles from "@/styles/musicDisplay.module.css"
import Card from "./card";
import Image from "next/image";
import { useState, useEffect } from 'react';
import musicInfo from '@/_content/musicInfo.json';

// I am in CS class right now
// Wanted to just write that assert is a really good debugging tool
// (Future reference for other languages)


// Create a display feed for the albums (clickable)
export default function MusicDisplay() {
    
    // In this context, albums are dictionaries with album metadata
    const album_list = Object.keys(musicInfo);

    // By-year sorting
    album_list.sort( (a, b) => musicInfo[a].albumYear - musicInfo[b].albumYear);

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
        const albumCover = album["albumCover"];
        const albumArtist = album["albumArtist"];
        const albumYear = album["albumYear"];
        const albumGenre = album["albumGenre"];
        const musicSlug = album["musicSlug"]

        const key = albumName + albumYear;

        console.log(album);
        
        // Year Format
        const date =
        <div className={styles.metaInfoDiv}>
            <Image
            src={'/icons/calendar-time.svg'}
            alt="Calendar Icon"
            width={24}
            height={24}
            className={styles.metaInfoIcon}
            />
            <h2 className={styles.metaInfoText}> {albumYear} </h2>
        </div>;

        // Genre Format
        const genre =
        <div className={styles.metaInfoDiv}>
            <Image
            src={'/icons/music.svg'}
            alt="Calendar Icon"
            width={24}
            height={24}
            className={styles.metaInfoIcon}
            />
            <h2 className={styles.metaInfoText}> {albumGenre} </h2>
        </div>;

        const dtGenre =
        <div className={styles.metaInfo}>
            {date} <h2 className={styles.metaInfoText}> | </h2> {genre}
        </div>;

        return ( 
            <Card key={key} cardStyle={`${styles.card} ${styles.musicDisplayCard}`} wrapperStyle={`${styles.musicDisplayWrapper}`} href={`/music/${musicSlug}`} img={albumCover} >
                <h2 className={styles.albumTitle}>{albumName}</h2>
                <p className={styles.albumArtist}>{albumArtist}</p>
                {dtGenre}
            </Card>
        );
    
    });

    return (
        <div className={styles.musicDisplayContainer}>
            <h1 className={styles.musicDisplayHeader}>My Music:</h1>
            <div className={styles.musicDisplay}>    
                {albumCards}
            </div>
        </div>
    );
    
};