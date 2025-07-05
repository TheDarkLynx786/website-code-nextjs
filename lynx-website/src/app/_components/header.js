import styles from "./header.module.css"

export default function Header() {
    return(
        <header className={styles.header}>
            <a href="/" > <img src="/public/ChooChoo.png" alt="Lynx Logo" className={styles.logo} /> </a>
            <nav className={styles.navbar}>
                <a href='/' className={styles.divText}> Home </a>
                <p className={styles.divText}>|</p>
                <a href='/about' className={styles.divText}> About </a>
                <p className={styles.divText}>|</p>
                <a href='/' className={styles.divText}> Contact </a>
            </nav>
        </header>
    );
}