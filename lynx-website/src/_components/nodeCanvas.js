"use client";

import { useEffect, useRef } from "react";
import styles from '@/styles/canvas.module.css';

export default function NodeCanvas({children}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Resize handling
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Node definition
    class Node {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3; // slight drift
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = 5;
        this.alpha = Math.random();
        this.fadeDir = Math.random() < 0.5 ? -1 : 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Fade in/out
        this.alpha += 0.01 * this.fadeDir;
        if (this.alpha <= 0) {
          this.alpha = 0;
          this.fadeDir = 1;
        } else if (this.alpha >= 1) {
          this.alpha = 1;
          this.fadeDir = -1;
        }
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(138, 142, 198, ${this.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "white";
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Create nodes (with sparsity)
    const nodes = [];
    const nodeCount = Math.floor((canvas.width * canvas.height) / 15000) + 150;
    const minDist = 50; // minimum distance between nodes

    for (let i = 0; i < nodeCount; i++) {
      let newNode;
      let valid = false;
      let attempts = 0;

      while (!valid && attempts < 100) { // avoid infinite loops
        newNode = new Node();
        valid = true;

        for (let j = 0; j < nodes.length; j++) {
          const dx = newNode.x - nodes[j].x;
          const dy = newNode.y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDist) {
            valid = false;
            break;
          }
        }

        attempts++;
      }

      if (valid) nodes.push(newNode);
    }

    const drawLines = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) { // proximity threshold
            const opacity = 1 - dist / 120;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${opacity * Math.min(nodes[i].alpha, nodes[j].alpha)})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx.fillStyle = "rgba(10, 2, 37, 100)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node) => {
        node.update();
        node.draw(ctx);
      });

      // Repulsion force to maintain sparsity
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < minDist && dist > 0) {
            const angle = Math.atan2(dy, dx);
            const overlap = (minDist - dist) / 2; // push them apart equally

            nodes[i].x += Math.cos(angle) * overlap;
            nodes[i].y += Math.sin(angle) * overlap;

            nodes[j].x -= Math.cos(angle) * overlap;
            nodes[j].y -= Math.sin(angle) * overlap;
          }
        }
      }

      drawLines();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={styles.container}> 
        <canvas ref={canvasRef} className={styles.nodeCanvas}> </canvas>
        <div className={styles.content}>    
            {children}
        </div>
    </div> 
  );
}
