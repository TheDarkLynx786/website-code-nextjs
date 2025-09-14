import MusicPlayer from './musicPlayer';
import styles from '@/styles/album.module.css';


export default function AlbumContainer({ albumName, albumArtist, albumYear, albumGenre, albumInfo, album }) {
    
    const trackDict = album['tracks'];

    const tracks = Object.keys(trackDict).map(track => {
        return ( 
            <MusicPlayer             
                key={trackDict[track]["audioSrc"]}
                
                audioSrc={trackDict[track]["audioSrc"]}
                
                title={trackDict[track]["title"]}
                artist={trackDict[track]["artist"]}
                year={trackDict[track]["year"]}
                genre={trackDict[track]["genre"]}
                
                imgSrc={trackDict[track]["imgSrc"]}
                imgCaption={trackDict[track]["imgCaption"]}
                
                trackInfo={trackDict[track]["trackInfo"]}
            />
        );
    });

    
    return (
        <div className={styles.albumDiv}>
            <h1 className={styles.albumTitle}>{albumName}</h1>
            <h2 className={styles.albumArtist}>{albumArtist}</h2>
            <h2 className={styles.albumYearGenre}>{albumYear} | {albumGenre} </h2>
            <p className={styles.albumInfo}>{albumInfo}</p>
            
            {tracks}
        </div>
    );
}