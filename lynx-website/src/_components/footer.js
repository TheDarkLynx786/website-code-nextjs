import styles from "@/styles/footer.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const date = new Date();
    const year = date.getFullYear();
    
    return(
        <footer className={styles.footer}>
            <div className={styles.socialDiv}>
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
                <Link href="https://www.linkedin.com/in/murtaza-haque" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/icons/brand-linkedin.svg"
                            alt="Site Logo"
                            width={50}
                            height={50} 
                            className={styles.socialIcon}
                        />
                </Link>
            </div>
            
            <div className={styles.webringDiv}>
                

                <div className={styles.webringButtonDiv}>
                    <a className={styles.webringText} href="https://ring.purduehackers.com/previous">
                        &lt;&lt;
                    </a>
                    Previous
                </div>
                
                <div className={styles.webringButtonDiv}>
                    <a href="https://ring.purduehackers.com/">
                        <Image
                                src="/images/PurdueHackers.png"
                                alt="Purdue Hackers"
                                width={50}
                                height={50} 
                                className={styles.webringLogo}
                        />
                    </a>
                    Purdue Hackers Webring
                </div>

                <div className={styles.webringButtonDiv}>
                    <a className={styles.webringText} href="https://ring.purduehackers.com/next">
                        &gt;&gt;
                    </a>
                    Next
                </div>
            </div>

            <div className={styles.textDiv}>
                <p className={styles.divText}>© {year} Copyright:&nbsp;</p>
                <Link className={`${styles.divText} ${styles.link}`} href="/"> Murtaza Haque</Link>
            </div>

            
        </footer>
    );
}