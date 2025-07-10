import styles from "@/styles/sidebar.module.css"

export default function Sidebar() {
    return(
        <aside className={styles.sidebar}>
            <h2 className={styles.header}>
                This is the sidebar! Pretty cool right??
            </h2>
            <ol className={styles.list}>
                <a className={styles.link}>A link over here</a>
                <a className={styles.link}>A linker over there</a>
                <a className={styles.link}>And maybe a link to over here as well?</a>
            </ol>
        </aside>
    );
}