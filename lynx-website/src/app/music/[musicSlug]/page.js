// Role model for the generateStaticParams() method
// "That wasn't so hard, was it?""

import styles from "@/styles/music.module.css";
import AlbumContainer from "@/_components/album.js";
import musicInfo from '@/_content/musicInfo.json';

export async function generateStaticParams() {
  // Only return route params that match the dynamic segment name: [musicSlug]
  return Object.keys(musicInfo).map((album_iter) => {
    const musicSlug = musicInfo[album_iter]["musicSlug"];
    console.log(musicSlug);
    return { musicSlug };
  });
    
}

export default async function MusicPage( {params} ) {
  // Await params
  params = await params;
  
  console.log(params.musicSlug);
  const album_iter = Object.keys(musicInfo).find((key) => musicInfo[key].musicSlug === params.musicSlug);


  const album = album_iter ? musicInfo[album_iter] : null;

  const albumName = album["albumTitle"];
  const albumArtist = album["albumArtist"];
  const albumInfo = album["albumInfo"];
  const albumYear = album["albumYear"];
  const albumGenre = album["albumGenre"];

  const key = albumName + albumYear;

  return ( 
    <div className={styles.page}>
      <AlbumContainer key={key} albumName={albumName} albumArtist={albumArtist} albumYear={albumYear} albumGenre={albumGenre} albumInfo={albumInfo} album={album}/>
    </div>
  );
}