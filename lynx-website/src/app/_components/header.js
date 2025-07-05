import styles from "./header.module.css"
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return(
        <header className={styles.header}>
            <Image
                src="/images/ChooChoo.png"
                alt="Site Logo"
                width={50}
                height={50} 
                className={styles.logo}
            />
            
            <nav className={styles.navbar}>
                <Link href='/' className={styles.divText}> Home </Link>
                <Link href='/about' className={styles.divText}>About</Link>
                <Link href='/' className={styles.divText}> Contact </Link>
            </nav>
        </header>
    );
}