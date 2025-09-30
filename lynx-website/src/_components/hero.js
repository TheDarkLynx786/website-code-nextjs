"use client";

import styles from "@/styles/hero.module.css"
import cardStyles from "@/styles/card.module.css"
import Button from "./button";
import Card from "./card";
import MatrixCanvasPhysics from "@/_components/matrixCanvasPhysics";
import MatrixCanvas from "@/_components/matrixCanvas";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';


export default function Hero() {
    const [hovered, setHovered] = useState(false);
    const imgRef = useRef(null);
    

    function hoverText(hovered) {
  
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

    function imagePerspective(imgRef) {
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
                src="/images/ChooChoo.png"
                alt="Hero Image"
                width={300}
                height={300}
                className={styles.heroImage}
            />
        )
    }


    const text = hoverText(hovered);
    const image = imagePerspective(imgRef);

    return(
        <div className={styles.heroContainer}>
            <MatrixCanvas>
                <Card cardStyle={`${cardStyles.card} ${styles.heroCard}`} wrapperStyle={styles.heroWrapper}>
                    <div className={styles.textButtonDiv}>
                            <h1 className={styles.heroTextTitle}>
                                Greetings, Internet Traveller! 
                            </h1>
                            
                            <div>    
                                <h2 className={styles.heroTextSubtitle}>
                                    I am
                                </h2>
                                <h2 className={styles.heroTextSubtitle}>{text};</h2>
                                <h2 className={styles.heroTextSubtitle}>
                                    Welcome to my domain!
                                </h2>
                            </div>

                            <Button link='/about' style={styles.heroButton} > About Me! </Button>
                    </div>    
                    {image}
                </Card>
            </MatrixCanvas>
        </div>
    );
}