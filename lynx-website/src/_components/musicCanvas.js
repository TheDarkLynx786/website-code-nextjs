"use client";

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

    canvas.width = width;
    canvas.height = height;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let peaksPerChannel = peaks;
    console.log("Hello ", peaksPerChannel);
    let playhead = 0;

    // Resizing
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const numChannels = peaksPerChannel.length || 1;
      const channelHeight = height / numChannels;

      peaksPerChannel.forEach((peaks, ch) => {
        const yMid = channelHeight * (ch + 0.5);
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(138, 142, 198, 0.8)';
        ctx.lineWidth = 1;

        for (let x = 0; x < width; x++) {
          const val = peaks[(x + playhead) % width];
          ctx.moveTo(x, yMid - val * (channelHeight / 2));
          ctx.lineTo(x, yMid + val * (channelHeight / 2));
        }

        ctx.stroke();
      });

      playhead = (playhead + 1) % width;
      animationFrameId.current = requestAnimationFrame(draw);
    }

    setup().then(() => {
      animationFrameId.current = requestAnimationFrame(draw);
    });

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