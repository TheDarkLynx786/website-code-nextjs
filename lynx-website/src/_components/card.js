import styles from "@/styles/card.module.css"
import Link from "next/link";
import Image from "next/image";

export default function Card({children, img, cardStyle, wrapperStyle, href}) {
    const image = img ? 
    <Image
        src={img}
        alt="Card Image"
        width={600}
        height={400}
        className={styles.image}
    /> : null;
    
    const overrideStyle = cardStyle ? cardStyle : null;
    const overrideWrapperStyle = wrapperStyle ? wrapperStyle : styles.wrapper;

    const cardImgClass = img ? styles.withImg : styles.noImg;

    const card =
    <div className={`${styles.card} ${overrideStyle} ${cardImgClass}`}>
        {children}
    </div>;
    
    const wrapper = href ? 
    <Link href={href} className={overrideWrapperStyle}>
        {image}
        {card}
    </Link>
    :
    <div className={overrideWrapperStyle}>
        {image}
        {card}
    </div>;

    return wrapper;
}