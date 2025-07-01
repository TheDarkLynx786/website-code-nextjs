import styles from "./page.module.css";
import Hero from "@/app/_components/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <div className={styles.page}/>
    </> 
  );
}
