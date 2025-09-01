"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from '@/styles/musicPlayer.module.css';

export default function CustomMusicPlayer({ src, title = "Untitled", artist = "Unknown"}) {
  const audioRef = useRef(null);
  const progressRef = useRef(null);

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
      } else {
        audio.pause();
        setPlaying(false);
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

  return (
    <div className={`${styles.musicPlayer}`}>
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Track Info */}
      <div className="track-info">
        <div className="track-title">{title}</div>
        <div className="track-artist">{artist}</div>
      </div>

      {/* Controls Row */}
      <div className="controls">
        <button onClick={togglePlay}>{playing ? "Pause" : "Play"}</button>
        <button onClick={() => seekRelative(-5)}>-5s</button>
        <button onClick={() => seekRelative(5)}>+5s</button>
      </div>

      {/* Progress Bar */}
      <div className="controls">
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="progress-container"
        >
          <div
            style={{ width: `${(currentTime / Math.max(1, duration)) * 100}%` }}
            className="progress"
          />
        </div>
        <div className="time-display">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Volume + Options */}
      <div className="controls">
        <button onClick={() => setMuted((m) => !m)}>
          {muted ? "Unmute" : "Mute"}
        </button>

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

        <label className="options">
          <input
            type="checkbox"
            checked={loop}
            onChange={(e) => setLoop(e.target.checked)}
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
  );
}
