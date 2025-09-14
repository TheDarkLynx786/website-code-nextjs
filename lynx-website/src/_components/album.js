import MusicPlayer from './musicPlayer';
import styles from '@/styles/album.module.css';


export default function AlbumContainer({ albumName, albumInfo, album }) {
    
    

    const tracks = Object.keys(album).map(track => {
        return ( 
            <MusicPlayer             
                key={album[track]["audioSrc"]}
                
                audioSrc={album[track]["audioSrc"]}
                
                title={album[track]["title"]}
                artist={album[track]["artist"]}
                year={album[track]["year"]}
                genre={album[track]["genre"]}
                
                imgSrc={album[track]["imgSrc"]}
                imgCaption={album[track]["imgCaption"]}
                
                trackInfo={album[track]["trackInfo"]}
            />
        );
    });

    
    return (
        <div className={styles.albumDiv}>
            <h1>{albumName}</h1>

            <p>{albumInfo}</p>
            
            {tracks}
        </div>
    );
}