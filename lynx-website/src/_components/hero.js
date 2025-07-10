import styles from "@/styles/hero.module.css"
import Button from "./button";
import Card from "./card";

export default function Hero() {
    return(
        <div className={styles.heroContainer}>
            <Card style={styles.heroCard}>
                <h1 className={styles.heroText}>
                    Welcome, Internet Traveler! 
                </h1>
                <Button link='/about' style={styles.heroButton} > About Me! </Button>
            </Card>
        </div>
    );
}