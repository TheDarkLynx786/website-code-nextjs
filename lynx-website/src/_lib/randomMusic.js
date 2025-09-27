import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import decodeAudio from "audio-decode";

// (Recursive) Gets all music files from public/music
function getAllFiles(dirPath, basePath = dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    let files = [];

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            files = files.concat(getAllFiles(fullPath, basePath));
        } else {

            // Store both filesystem path and web path
            const relativePath = path.relative(basePath, fullPath).replace(/\\/g, "/");
        
            files.push({
                fsPath: fullPath,
                urlPath: `/music/${relativePath}`,
            });

        }
    }

    return files;
}

export function getRandomTrack() {

    const moduleDir = path.dirname(fileURLToPath(import.meta.url));
    const musicPath = path.join(moduleDir, '..', '..', 'public', 'music');
    const files = getAllFiles(musicPath);

    if (files.length === 0) { return null; }

    const musicFile = files[Math.floor(Math.random() * files.length)];

    return {
        url: musicFile.urlPath,
        name: path.basename(musicFile.fsPath),
        fsPath: musicFile.fsPath,
    };
}

function computePeaks(audioBuffer, width = 1000) {
  const numChannels = audioBuffer.numberOfChannels;
  const peaksPerChannel = [];

  for (let ch = 0; ch < numChannels; ch++) {
    const data = audioBuffer.getChannelData(ch);
    const samplesPerPixel = Math.floor(data.length / width);
    const peaks = new Float32Array(width);

    for (let x = 0; x < width; x++) {
      let start = x * samplesPerPixel;
      let end = start + samplesPerPixel;
      let max = 0;

      for (let i = start; i < end && i < data.length; i++) {
        max = Math.max(max, Math.abs(data[i])); // max absolute amplitude
      }

      peaks[x] = max; // store peak value for this “pixel column”
    }

    peaksPerChannel.push(peaks);
  }

  return peaksPerChannel;
}

export async function getRandomTrackWaveform() {
    const track = getRandomTrack();
    if (!track) return null;

        // Prefer the filesystem path returned by getRandomTrack when possible.
        const musicPath = track.fsPath
            ? track.fsPath
            : path.join(process.cwd(), "public", track.url.replace(/^\/+/, ""));

        const buffer = fs.readFileSync(musicPath);

    // decodeAudio returns a Promise; await it to get the AudioBuffer.
    let audioBuffer;
    try {
        audioBuffer = await decodeAudio(buffer);
    } catch (err) {
        // Fail gracefully and return null if decoding fails.
        console.error("Failed to decode audio for", musicPath, err);
        return null;
    }

    const peaksPerChannel = computePeaks(audioBuffer);

    // Convert TypedArray (Float32Array) to plain arrays so the data can be
    // serialized across the server -> client boundary in Next.js without
    // throwing or closing the connection.
    const serializablePeaks = peaksPerChannel.map((channelPeaks) => Array.from(channelPeaks));

    return {
        name: track.name,
        peaksPerChannel: serializablePeaks,
    };
}