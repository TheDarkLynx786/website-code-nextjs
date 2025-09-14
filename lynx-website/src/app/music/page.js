import styles from "@/styles/music.module.css";
import AlbumContainer from "@/_components/album";
import musicInfo from '@/_content/musicInfo.json';

export default async function Music() {

  const album = musicInfo["elementals"];
  console.log(album);

  const albumName = "Elementals";
  const albumInfo = "Album Info"

  return (
    <div className={styles.page}>

      <h1 className={styles.contactInputTitles} >
        Music Player Demo
      </h1>

      <AlbumContainer albumName={albumName} albumInfo={albumInfo} album={album}/>
          
    </div>
  );
}