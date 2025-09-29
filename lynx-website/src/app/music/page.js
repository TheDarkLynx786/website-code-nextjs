import styles from "@/styles/music.module.css";
import MusicDisplay from "@/_components/musicDisplay.js";
import HeroMusic from "@/_components/heroMusic";
import { getRandomTrack } from "@/_lib/randomMusic";

export default function MusicMain() {

  const track = getRandomTrack();
  console.log(track.file)
  
  return (
    <>
      <HeroMusic track={track} />
      <div className={styles.mainPage}>
        
        <MusicDisplay track={track} />
      </div>
    </>
  );
}