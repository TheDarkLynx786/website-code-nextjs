'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/matrixCanvas.module.css';

const MatrixCanvas = ({ children }) => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    let width = rect.width;
    let height = rect.height;

    canvas.width = width;
    canvas.height = height;

    let fontSize = 16;
    let columns = Math.floor(width / fontSize);
    const gravity = 0.5;
    const repelRadius = 30;
    const repelForce = 1;
    const characters = '01アカサタナハマヤラワABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Create one particle per column
    const createParticles = () => {
      fontSize = Math.random() * 4 + 12;
      columns = Math.floor(width / fontSize); // For responsive behavior and viewport compatibility

      particlesRef.current = Array.from({ length: columns }, (_, i) => {        
        return {
          x: i * fontSize,
          y: Math.random() * height,
          vx: 0,
          vy: Math.random() * 3 + 2,
          trail: [],
          char: characters[Math.floor(Math.random() * characters.length)],
          trailTimer: 0,
        }
      });
    };

    createParticles();

    const handleResize = () => {
      const rect = container.getBoundingClientRect(); 
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
      createParticles();
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      // Dark translucent background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (const p of particlesRef.current) {
        // Repel effect
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < repelRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (repelRadius - dist) / repelRadius * repelForce;
          p.vy -= Math.sin(angle) * force; // repel upward
          p.vx -= Math.cos(angle) * force; 
        }

        // Apply velocity and gravity
        p.y += p.vy;
        p.x += p.vx || 0;

        p.vy += gravity * 0.05;
        

        // Update trail timer and add to trail every few frames
        p.trailTimer = (p.trailTimer || 0) + 1;
        if (p.trailTimer > 2) {
          p.trail.unshift({ x: p.x, y: p.y, char: p.char });
          if (p.trail.length > 20) p.trail.pop();
          p.trailTimer = 0;
        }

        // Draw head character (not faded)
        if (p.trail.length > 0) {
          const head = p.trail[0];
          ctx.fillStyle = `rgba(0, 255, 0, 1)`;
          ctx.fillText(head.char, head.x, head.y);
        }

        // Draw trail (faded)
        for (let i = 1; i < p.trail.length; i++) {
          const t = p.trail[i];
          const fadeFactor = i / p.trail.length;
          const alpha = 1 - Math.pow(fadeFactor, 2); 
          ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
          ctx.fillText(t.char, t.x, t.y);
        }

        // Recycle particle
        if (p.y > height + fontSize * 2) {
          p.y = -fontSize * Math.random() * 10;
          p.vy = Math.random() * 3 + 2;
          p.trail = [];
        }

        // Randomly  change character
        if (Math.random() < 0.05) {
          p.char = characters[Math.floor(Math.random() * characters.length)];
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
      <canvas ref={canvasRef} className={styles.matrixCanvas} />
      <div className={styles.matrixContent}>{children}</div>
    </div>
  );
};

export default MatrixCanvas;