import styles from "./footer.module.css"
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const date = new Date();
    const year = date.getFullYear();
    
    return(
        <footer className={styles.footer}>
            <div className={styles.div}>
                <Link href="https://github.com/TheDarkLynx786/" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/icons/brand-github.svg"
                            alt="Site Logo"
                            width={50}
                            height={50} 
                            className={styles.socialIcon}
                        />
                </Link>
                <Link href="https://www.instagram.com/murtazahaque/" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/icons/brand-instagram.svg"
                            alt="Site Logo"
                            width={50}
                            height={50} 
                            className={styles.socialIcon}
                        />
                </Link>
            </div>
            
            <div className={styles.div}>
                <p className={styles.divText}>© {year} Copyright:&nbsp;</p>
                <Link className={`${styles.divText} ${styles.link}`} href="/"> Murtaza Haque</Link>
            </div>
        </footer>
    );
}