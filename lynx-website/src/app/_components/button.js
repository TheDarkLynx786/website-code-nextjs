import Link from "next/link";

export default function Button({children, link, onClick, style}) {
    
    if(link) {
        return(
            <Link href={link} className={style}>
                {children}
            </Link>
        );
    }
    
    return(
        <button onClick={onClick} className={style}>
            {children}
        </button>
    );
}