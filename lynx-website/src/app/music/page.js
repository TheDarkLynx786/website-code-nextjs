import styles from "@/styles/music.module.css";
import AlbumContainer from "@/_components/album";
import musicInfo from '@/_content/musicInfo.json';

export default async function Music() {

  const album = musicInfo["elementals"];
  console.log(album);

  const albumName = "Elementals";
  const albumArtist = "Lynx";
  const albumInfo = "Album Info";
  const albumYear = 2025;
  const albumGenre = "OST";
  

  return (
    <div className={styles.page}>

      <h1 className={styles.contactInputTitles} >
        Music Player Demo
      </h1>

      <AlbumContainer albumName={albumName} albumArtist={albumArtist} albumYear={albumYear} albumGenre={albumGenre} albumInfo={albumInfo} album={album}/>
          
    </div>
  );
}