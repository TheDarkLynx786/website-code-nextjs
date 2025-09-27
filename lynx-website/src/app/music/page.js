import styles from "@/styles/music.module.css";
import MusicDisplay from "@/_components/musicDisplay.js";
import HeroMusic from "@/_components/heroMusic";
import { getRandomTrackWaveform } from "@/_lib/randomMusic";

export default async function MusicMain() {

  const peaksPerChannel = await getRandomTrackWaveform();

  console.log(peaksPerChannel);
  
  return (
    <>
      <HeroMusic />
      <div className={styles.mainPage}>
        
        <MusicDisplay track = { peaksPerChannel } />
      </div>
    </>
  );
}