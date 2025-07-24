'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/matrixCanvas.module.css';

const MatrixCanvas = ({children}) => {
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
    let columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);
    const characters = '0123456789アカサタナハマヤラワABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

    // Handle resizing
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      columns = Math.floor(width / fontSize);
      height = rect.height;
      width = rect.width;
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 2, 37, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = 'rgba(138, 142, 198, 0.8)';

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, x, y);

        drops[i] += Math.random() * 0.7;

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }

      animationFrameId.current = requestAnimationFrame(draw);
    };

    animationFrameId.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.matrixContainer}> 
        <canvas ref={canvasRef} className={styles.matrixCanvas}> </canvas>
        <div className={styles.matrixContent}>    
            {children}
        </div>
    </div>   
  );
};

export default MatrixCanvas;