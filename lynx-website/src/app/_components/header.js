"use client";

import styles from "./header.module.css"
import Link from "next/link";
import Button from "./button";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
    const [scrollPos, setScrollPos] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };


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
                <div className={styles.div}>
                    <Link href="/">
                        <Image
                            src="/images/ChooChoo.png"
                            alt="Site Logo"
                            width={50}
                            height={50} 
                            className={styles.logo}
                        />
                    </Link>

                    
                    
                    <Button style={styles.navbarButton} onClick={toggleMenu}>☰</Button>
                    
                </div>
                
                <nav className={`${styles.navbar} ${menuOpen ? styles.open : ""}`}>
                    <Link href='/' className={styles.divText}> Home </Link>
                    <Link href='/about' className={styles.divText}>About</Link>
                    <Link href='/' className={styles.divText}> Contact </Link>
                </nav>

            </header>
            

            <header className={`${styles.headerFixed} ${scrollPos ? styles.visible : ""}`}>
                
                <div className={styles.div}>
                    <Link href="/">
                        <Image
                            src="/images/ChooChoo.png"
                            alt="Site Logo"
                            width={50}
                            height={50} 
                            className={styles.logo}
                        />
                    </Link>

                    <Button style={styles.navbarButton} onClick={toggleMenu}>☰</Button>
                </div>

                <nav className={`${styles.navbar} ${menuOpen ? styles.open : ""}`}>
                    <Link href='/' className={styles.divText}> Home </Link>
                    <Link href='/about' className={styles.divText}>About</Link>
                    <Link href='/' className={styles.divText}> Contact </Link>
                </nav>
                
            </header>
            </>
        );
}