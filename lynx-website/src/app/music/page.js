import styles from "@/styles/music.module.css";
import Card from "@/_components/card";
import MusicPlayer from "@/_components/musicPlayer";

export default async function Music() {

  return (
    <>
      <div className={styles.contactFormContainer}>
        <Card className={styles.contactForm}>

          <h1 className={styles.contactInputTitles} >
            Music Player Demo
          </h1>

          <div className={styles.contactDiv}> 
              <MusicPlayer 
                src="/music/ArmsMafia.wav" 
                title="Arms Mafia" 
                artist="Lynx" 
                className={styles.musicPlayer} 
              />
          </div>
          
        </Card>
      </div>
    
    </>
  );
}