import frequencyData from "../_content/frequencyData.json";

// Only pulling from one album, must fix
const tracks = Object.keys(frequencyData);

export function getRandomTrack() {

    const musicFile = tracks[Math.floor(Math.random() * tracks.length)];

    return {
        file: frequencyData[musicFile]["filePath"],
        tempo: frequencyData[musicFile]["tempo"],
        freqData: frequencyData[musicFile]["freqData"]
    };
}