"use client";

import { useEffect, useRef } from 'react';
import styles from '@/styles/canvas.module.css';

const MusicCanvas = ({ track, children }) => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  console.log("Track", track);

  useEffect(() => {
    if (!track) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

  const container = canvas.parentElement;
  const rect = container.getBoundingClientRect();
  let width = rect.width;
  let height = rect.height;

  // Set CSS size initially; actual backing store will be set by handleResize
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let peaksPerChannel = track.peaksPerChannel;
    let playhead = 0;

    // Resizing
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      // Set CSS size (so layout uses the intended size)
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Set actual backing store size in device pixels and reset transform.
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('resize', handleResize);
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    function draw() {
      // Clear using CSS pixel dimensions (ctx has been scaled to CSS pixels)
      ctx.clearRect(0, 0, width, height);

      const numChannels = peaksPerChannel.length || 1;
      const channelHeight = height / numChannels;

      peaksPerChannel.forEach((peaks, ch) => {
        const yMid = channelHeight * (ch + 0.5);
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(138, 142, 198, 0.8)';
        ctx.lineWidth = 1;

        const peakCount = peaks.length || 1;
        const samplesPerPixel = peakCount / Math.max(1, width);

        for (let x = 0; x < width; x++) {
          // Map canvas x to peak array index, accounting for playhead offset
          const peakIndex = Math.floor(((x + playhead) % width) * samplesPerPixel) % peakCount;
          const val = peaks[peakIndex] || 0;
          ctx.moveTo(x, yMid - val * (channelHeight / 2));
          ctx.lineTo(x, yMid + val * (channelHeight / 2));
        }

        ctx.stroke();
      });

      playhead = (playhead + 1) % Math.max(1, width);
      animationFrameId.current = requestAnimationFrame(draw);
    }

    // Start with proper sizing and start the animation loop
    handleResize();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      audioCtx.close();
    };
  }, [track]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default MusicCanvas;