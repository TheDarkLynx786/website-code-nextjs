import styles from "./hero.module.css"

export default function Hero() {
    return(
        <div className={styles.heroContainer}>
            <div className={styles.heroCard}>
                <h1 className={styles.heroText}>
                    A shot in the dark <br/>
                    A walk in the park
                </h1>
            </div>
        </div>
    );
}