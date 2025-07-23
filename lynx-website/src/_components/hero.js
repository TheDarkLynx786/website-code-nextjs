import styles from "@/styles/hero.module.css"
import Button from "./button";
import Card from "./card";
import MatrixCanvasPhysics from "@/_components/matrixCanvasPhysics";

export default function Hero() {
    return(
        <div className={styles.heroContainer}>
            <MatrixCanvasPhysics>
                <Card style={styles.heroCard}>
                    <h1 className={styles.heroText}>
                        Welcome, Internet Traveler! 
                    </h1>
                    <Button link='/about' style={styles.heroButton} > About Me! </Button>
                </Card>
            </MatrixCanvasPhysics>
        </div>
    );
}