"use client";

import React, { useEffect, useRef, useState } from "react";
import Card from './card';
import Image from 'next/image';
import styles from '@/styles/musicPlayer.module.css';

export default function CustomMusicPlayer({ src, title = "Untitled", artist = "Unknown"}) {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const rafRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [loop, setLoop] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = loop;
  }, [loop]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        await audio.play();
        setPlaying(true);
        initVisualizer();
      } else {
        audio.pause();
        setPlaying(false);
        cancelAnimationFrame(rafRef.current);
      }
    } catch (err) {
      console.warn("Playback failed:", err);
    }
  };

  const formatTime = (t) => {
    if (!isFinite(t)) return "0:00";
    const minutes = Math.floor(t / 60);
    const seconds = Math.floor(t % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const seek = (fraction) => {
    const audio = audioRef.current;
    if (!audio || !isFinite(duration) || duration === 0) return;
    audio.currentTime = Math.max(0, Math.min(duration, fraction * duration));
    setCurrentTime(audio.currentTime);
  };

  const seekRelative = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
    setCurrentTime(audio.currentTime);
  };

  const handleProgressClick = (e) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const fraction = x / rect.width;
    seek(fraction);
  };

  function initVisualizer() {
    if (!audioRef.current) return;
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }

    if (!analyserRef.current) {
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
    }

    if (!sourceRef.current) {
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    }

    drawBars();
  }

  function drawBars() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const analyser = analyserRef.current;
    if (!canvas || !ctx || !analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const { width, height } = canvas;

    ctx.clearRect(0, 0, width, height);
    analyser.getByteFrequencyData(dataArray);

    const barWidth = (width / bufferLength) * 2.5;
    let x = 0;
    const heightScale = 0.75;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * height * heightScale;

      ctx.fillStyle = `rgb(${dataArray[i]}, 100, 200)`;
      ctx.fillRect(x, height - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }

    rafRef.current = requestAnimationFrame(drawBars);
  }

  return (
    <Card cardStyle={`${styles.musicPlayer}`}>
      {/* Track Cover and Audio Graphic */}
      <div>
        <Image 
          src='/images/fourhorsemen/FourHorsemen.jpg'
          alt='Track Cover'
          width={100}
          height={100}
          className={styles.trackCover}
        />
        <h3 className={styles.coverCaption}>Four Horsemen</h3>

        {/* Audio Visualizer Canvas */}
        <canvas ref={canvasRef} width={150} height={60} style={{ width: "100%", height: "60px", background: "#000", borderRadius: "4px" }} />
      </div>

      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Track Info */}
      <div>
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{title}</div>
          <div className={styles.trackArtist}>{artist}</div>
        </div>
        
        <div className={styles.btnsAndBar}>
          <button className={styles.playPauseBtn} onClick={togglePlay}>{playing ? "Pause" : "Play"}</button>

          <div className={styles.controls}>
            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className={styles.progressContainer}
            >
              <div className={styles.progressTrack}>
                <div
                  style={{ width: `${(currentTime / Math.max(1, duration)) * 100}%` }}
                  className={styles.progressFill}
                ></div>
              </div>
            </div>

            <div className={styles.time}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
        </div>

        {/* Volume + Options */}
        <div className={styles.controls}>
          <button onClick={() => seekRelative(-5)}>-5s</button>
          <button onClick={() => setMuted((m) => !m)}>{muted ? "Unmute" : "Mute"}</button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => {
              const v = Number(e.target.value);
              setVolume(v);
              if (v === 0) setMuted(true);
              else setMuted(false);
            }}
          />
          <button onClick={() => seekRelative(5)}>+5s</button>

          <label className="options">
            <input
              type="checkbox"
              checked={loop}
              onChange={(e) => setLoop(e.target.checked)}
              className={styles.loopBtn}
            />
            Loop
          </label>

          <label className="options">
            Speed:
            <select
              value={playbackRate}
              onChange={(e) => setPlaybackRate(Number(e.target.value))}
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </label>
        </div>
      </div>
    </Card>
  );
}

