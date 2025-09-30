"use client";

import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/canvas.module.css';

const MusicCanvas = ({ track, children }) => {
  
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    let width = rect.width;
    let height = rect.height;

    canvas.width = width;
    canvas.height = height;
    
    
    const fontSize = 14;
    let columns = Math.ceil(width / fontSize);

    // Handle resizing
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      columns = Math.ceil(width / fontSize);
      height = rect.height;
      width = rect.width;
      ctx.scale(dpr, dpr);
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    const freqArray = track.freqData || [];

    // index to step through frames in freqArray (updates at a slower rate)
    let frameIndex = 0;

    // Throttle settings: how often to pick a new snapshot (updates per second)
    const bpm = track.tempo || fallbackBpm || 120;
    const subdivisions = 2; // 4 updates per beat
    let updatesPerSecond = (bpm * 2 / 60) * subdivisions;
    const updateInterval = 1000 / updatesPerSecond;
    let lastUpdateTime = 0;

    // smoothing factor for displayed values (0..1). Higher = snappier, lower = smoother
    const smoothing = 0.15;

    // initialize target and displayed arrays
    let targetSnapshot = freqArray[0] || [];
    let displayed = targetSnapshot ? targetSnapshot.map(() => 0) : [];

    const draw = (time) => {
      // schedule next frame
      animationFrameId.current = requestAnimationFrame(draw);

      if (!time) time = performance.now();

      // On each update interval, advance the frameIndex and set a new targetSnapshot
      if (!lastUpdateTime) lastUpdateTime = time;

      if (time - lastUpdateTime >= updateInterval) {
        frameIndex = (frameIndex + 1) % Math.max(1, freqArray.length);
        targetSnapshot = freqArray[frameIndex] || targetSnapshot;
        lastUpdateTime = time;
        // ensure displayed array matches target length
        if (displayed.length !== targetSnapshot.length) {
          displayed = Array.from({ length: targetSnapshot.length }, (_, i) => displayed[i] || 0);
        }
      }

      // draw a translucent background for a soft trail effect
      ctx.fillStyle = 'rgba(10, 2, 37, 0.35)';
      ctx.fillRect(0, 0, width, height);

      // guard
      if (!targetSnapshot || targetSnapshot.length === 0) return;

      // smooth displayed values toward targetSnapshot
      for (let i = 0; i < targetSnapshot.length; i++) {
        const t = targetSnapshot[i] || 0;
        // exponential smoothing: displayed += (target - displayed) * alpha
        displayed[i] = displayed[i] + (t - (displayed[i] || 0)) * smoothing;
      }

      // compute barWidth and render using displayed values
      const barWidth = (width / displayed.length) * 2.5;
      let x = 0;
      const heightScale = 0.75;

      for (let i = 0; i < displayed.length; i++) {
        const value = displayed[i] || 0;
        const barHeight = (value / 255) * height * heightScale;

        ctx.fillStyle = `rgb(${Math.round(value)}, 100, 200)`;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    // start the animation loop
    animationFrameId.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <audio id="audio" src={track.url} autoPlay muted></audio>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default MusicCanvas;


// OLD

/*"use client";

import { useEffect, useRef } from 'react';
import styles from '@/styles/canvas.module.css';

const MusicCanvas = ({ track, children }) => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);


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

export default MusicCanvas;*/