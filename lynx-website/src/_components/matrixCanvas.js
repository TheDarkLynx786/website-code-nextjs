'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/matrixCanvas.module.css';

const MatrixCanvas = ({children}) => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);
    const characters = '01アカサタナハマヤラワABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Handle resizing
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    // Handle mouse movement
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = '#0F0';

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, x, y);

        // Repel effect
        const dx = mouseRef.current.x - x;
        const dy = mouseRef.current.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          drops[i] -= 1 + Math.random() * 2;
        } else {
          drops[i] += 1;
        }

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
      window.removeEventListener('mousemove', handleMouseMove);
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