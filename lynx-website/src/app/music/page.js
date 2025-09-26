import styles from "@/styles/music.module.css";
import AlbumContainer from "@/_components/album";
import MusicDisplay from "@/_components/musicDisplay.js";
import musicInfo from '@/_content/musicInfo.json';

export default async function MusicMain() {


  
  return (
    <div className={styles.mainPage}>
      <MusicDisplay />
    </div>
  );
}