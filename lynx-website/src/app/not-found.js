import styles from "@/styles/page.module.css";

export default function NotFound() {
    return(
        <div className={styles.page}>
            <h1 className={styles.notFoundTextTitle}> Well, you seem a little lost. </h1>
            <h2> Have a break </h2>
        </div>
    )
}