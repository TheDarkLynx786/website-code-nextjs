import styles from "./header.module.css"

export default function Header() {
    return(
        <header className={styles.page}>
            <div className={styles.div}>
                My Website!
            </div>
        </header>
    );
}