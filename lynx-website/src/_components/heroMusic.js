"use client";

import styles from "@/styles/heroMusic.module.css"
import cardStyles from "@/styles/card.module.css"
import Card from "./card";
import MusicCanvas from "@/_components/musicCanvas";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';

function hoverText() {
    const [hovered, setHovered] = useState(false);

  return (
    <span 
        className={styles.name}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={hovered ? 'hovered' : 'default'}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
          style={{ position: 'relative' }}
        >
          {!hovered ? "Murtaza Haque" : "TheDarkLynx786"}
        </motion.p>
      </AnimatePresence>
    </span>
  );
}

function imagePerspective() {
    const imgRef = useRef(null);

    const handleMouseMove = (e) => {
        const img = imgRef.current;
        const rect = img.getBoundingClientRect();
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate offset from center (-1 to 1)
        const offsetX = (x - centerX) / centerX;
        const offsetY = (y - centerY) / centerY;

        // Max rotation angles (in degrees)
        const maxRotate = 7;

        const rotateY = -offsetY * maxRotate;
        const rotateX = offsetX * maxRotate;

        img.style.setProperty('--degreeX', `${rotateX}deg`);
        img.style.setProperty('--degreeY', `${rotateY}deg`);
    };

    const handleMouseLeave = () => {
        const img = imgRef.current;
        img.style.setProperty('--degreeX', `0deg`);
        img.style.setProperty('--degreeY', `0deg`);
    };

    return (
        <Image
            ref = {imgRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            src="/images/MusicCovers/Placeholder.png"
            alt="Hero Image"
            width={300}
            height={300}
            className={styles.heroImage}
        />
    )
}

export default function Hero({track}) {
    const text = hoverText();
    const cur_track = track.file.split("\/").pop().split(".")[0];
    const image = imagePerspective();

    return(
        <div className={styles.heroContainer}>
            <MusicCanvas track={track} >
                <Card cardStyle={`${cardStyles.card} ${styles.heroCard}`} wrapperStyle={styles.heroWrapper}>
                    <div className={styles.textButtonDiv}>
                            <div>
                                <h1 className={styles.heroTextTitle}>
                                    The Best of
                                </h1>
                                <h1 className={styles.heroTextLynx}>
                                    "Lynx"
                                </h1>
                            </div>

                            <div>    
                                <h2 className={styles.heroTextSubtitle}>
                                    I compose music!
                                    <br/>
                                    Come listen to some of my tracks!
                                    <br/><br/>
                                    The visualizer plays: 
                                    <br/>
                                    "{cur_track}"
                                </h2>
                            </div>
                    </div>    
                    {image}
                </Card>
            </MusicCanvas>
        </div>
    );
}