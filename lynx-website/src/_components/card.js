import styles from "@/styles/card.module.css"

export default function Card({children, style}) {
    return(
        <div className={style}>
            {children}
        </div>
    );
}