"use client";

import styles from "./header.module.css"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
    const [scrollPos, setScrollPos] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {

            
            const triggerOffset = 200; // Show fixed header after scrolling this many px
            setScrollPos(window.scrollY > triggerOffset);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    //84 Scroll Pos

    return(
        <>
        <header className={styles.header}>
            <Link href="/">
                <Image
                    src="/images/ChooChoo.png"
                    alt="Site Logo"
                    width={50}
                    height={50} 
                    className={styles.logo}
                />
            </Link>

            <nav className={styles.navbar}>
                <Link href='/' className={styles.divText}> Home </Link>
                <Link href='/about' className={styles.divText}>About</Link>
                <Link href='/' className={styles.divText}> Contact </Link>
            </nav>
        </header>

        
        <header className={`${styles.headerFixed} ${scrollPos ? styles.visible : ""}`}>
            <Link href="/">
                <Image
                    src="/images/ChooChoo.png"
                    alt="Site Logo"
                    width={50}
                    height={50} 
                    className={styles.logo}
                />
            </Link>

            <nav className={styles.navbar}>
                <Link href='/' className={styles.divText}> Home </Link>
                <Link href='/about' className={styles.divText}>About</Link>
                <Link href='/' className={styles.divText}> Contact </Link>
            </nav>
        </header>
        
        </>
    );
}