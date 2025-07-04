import styles from "./header.module.css"

export default function Header() {
    return(
        <header className={styles.header}>
            <img src="/public/ChooChoo.png" alt="Lynx Logo" className={styles.logo} />
            
            <nav className={styles.navbar}>
                <a className={styles.divText}> Home </a>
                <p className={styles.divText}>|</p>
                <a className={styles.divText}> About </a>
                <p className={styles.divText}>|</p>
                <a className={styles.divText}> Contact </a>
            </nav>
        </header>
    );
}