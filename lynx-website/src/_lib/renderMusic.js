import musicInfo from '../_content/musicInfo.json';

// For a given album, returns the album metadata.
// Unused, but potentially a future solution for server-siding client side processes
export default function getAlbum( album ) {
    const album = musicInfo[album]

    const albumName = album["albumTitle"];
    const albumArtist = album["albumArtist"];
    const albumInfo = album["albumInfo"];
    const albumYear = album["albumYear"];
    const albumGenre = album["albumGenre"];
    
    return(
        {
            albumName,
            albumArtist,
            albumInfo,
            albumYear,
            albumGenre,
        }
    );
}