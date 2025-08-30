/*"use client";

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
} */

"use client";

import styles from "@/styles/header.module.css";
import Link from "next/link";
import Button from "./button";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
    const [showHeader, setShowHeader] = useState(true);
    const [atTop, setAtTop] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            const currentY = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const isAtTop = currentY <= 10;
                    if (isAtTop !== atTop) setAtTop(isAtTop);

                    const delta = currentY - lastScrollY;

                    // Add scroll threshold to avoid micro-movement noise
                    if (Math.abs(delta) > 5) {
                        if (delta > 0) {
                            setShowHeader(false); // scrolling down
                        } else {
                            setShowHeader(true); // scrolling up
                        }
                    }

                    setLastScrollY(currentY);
                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, atTop]);

    return (
        <>
            <div className={`${styles.headerOffset} ${atTop ? styles.offsetVisible : styles.offsetHidden}`}/>

            <header className={`${styles.headerBase} ${ showHeader ? styles.headerVisible : styles.headerHidden }`}>
                
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
                    <Link href="/about" className={styles.siteTitle}>
                        <h1> Murtaza Haque </h1>
                    </Link>

                    <Button style={styles.navbarButton} onClick={toggleMenu}>
                        ☰
                    </Button>
                </div>

                <nav className={`${styles.navbar} ${menuOpen ? styles.open : ""}`}>
                    
                    <Link href="/" className={styles.divText}>
                        Home
                    </Link>

                    <Link href="/about" className={styles.divText}>
                        About
                    </Link>

                    <Link href="/contact" className={styles.divText}>
                        Contact
                    </Link>

                    <Link href="/posts" className={styles.divText}>
                        Posts
                    </Link>

                </nav>
            </header>
        </>
    );
}