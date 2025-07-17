import styles from "@/styles/card.module.css"
import Link from "next/link";
import Image from "next/image";

export default function Card({children, img, style, href}) {
    const image = img ? 
    <Image
        src={img}
        alt="Card Image"
        width={600}
        height={400}
        className={styles.image}
    /> : null;
    
    const overrideStyle = style ? style : null;

    const cardImgClass = img ? styles.withImg : styles.noImg;

    const card = href ? 
    <Link href={href} className={`${styles.card} ${overrideStyle} ${cardImgClass}`}>
        {children}
    </Link>
    :
    <div className={`${styles.card} ${overrideStyle} ${cardImgClass}`}>
        {children}
    </div>;
    

    if (img) {
        return (
            <div className={styles.imageWrapper}>
                {image}
                {card}
            </div>
        );
    }
    
    return card;
}