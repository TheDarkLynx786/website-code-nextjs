# Ok slightly cursed I'm using Python BUT this is just a "tool in the shed"
# This will NOT run during runtime, it's just a JSON file generator

import librosa
import os
import numpy as np
import json

# Load audio files

musicPath = "../../public/music"

for dir in os.listdir(musicPath):
    
    print(dir)

    dirPath = os.path.join(musicPath, dir)

    entries = []

    if os.path.isdir(dirPath):

        for file in os.listdir(dirPath):

            print("\t", file)

            fp = os.path.join(musicPath, dir, file)
            y, sr = librosa.load(fp, sr=None)

            # Compute short time fourier transform (stft)
            S = np.abs(librosa.stft(y, n_fft=512, hop_length=1024))

            # Convert to decibels for dynamic range
            S_db = librosa.amplitude_to_db(S, ref=np.max)

            # Transpose to get time slices as rows (array of arrays of frequency snapshots for each file)
            frames = S_db.T.tolist()

            # Normalize the data to be on a 0-255 scale from -80 to 0
            normalized_frames = []
            for frame in frames:
                clipped = np.clip(frame, -80, 0)
                scaled = 255 * (clipped + 80) / (80)
                normalized_frames.append(scaled.astype(int).tolist())

            fileEntry = {
                "filePath": fp,
                "freqData": normalized_frames
            }

            entries.append(fileEntry)
        

# Save to JSON
with open("../_content/frequencyData.json", 'w') as f:
    json.dump(entries, f)



