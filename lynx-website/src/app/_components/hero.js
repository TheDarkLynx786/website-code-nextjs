import styles from "./hero.module.css"
import Button from "./button";
import Card from "./card";

export default function Hero() {
    return(
        <div className={styles.heroContainer}>
            <Card>
                <h1 className={styles.heroText}>
                    Hello, fellow net surfer! <br/>
                    Who might be me, you ask? <br/>
                    Click here to learn more!
                </h1>
                <Button link='/about' style={styles.heroButton} > About Me! </Button>
            </Card>
        </div>
    );
}