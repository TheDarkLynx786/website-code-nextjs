"use client";

import styles from "@/styles/header.module.css";
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

    const header = (className) => {
        return (
            <header className={className}>
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
                    <Link href="/" className={styles.siteTitle}>
                        <h1> Murtaza Haque </h1>
                    </Link>
                    
                    
                    <Button style={styles.navbarButton} onClick={toggleMenu}>☰</Button>
                    
                </div>
                
                <nav className={`${styles.navbar} ${menuOpen ? styles.open : ""}`}>
                    <Link href='/' className={styles.divText}> Home </Link>
                    <Link href='/about' className={styles.divText}>About</Link>
                    <Link href='/' className={styles.divText}> Contact </Link>
                    <Link href='/posts' className={styles.divText}> Posts </Link>
                </nav>

            </header>
        );
    }

    return(
        <>
            {header(styles.header)}
            {header(`${styles.headerFixed} ${scrollPos ? styles.visible : ""}`)}
        </>
    );
}