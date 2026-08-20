import React, { useEffect, useRef } from 'react';

/**
 * High-performance smooth procedural culinary smoke / luxury mist canvas
 */
export function SmoothSmokeEffect({ 
  density = 25, 
  color = 'rgba(212, 175, 55, 0.12)', 
  speed = 0.6,
  style = {} 
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Smoke Particle Class
    class SmokeParticle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + Math.random() * 40;
        this.radius = 35 + Math.random() * 55;
        this.maxRadius = this.radius * (2 + Math.random() * 1.8);
        this.vx = (Math.random() - 0.5) * 0.4 * speed;
        this.vy = -(0.4 + Math.random() * 0.6) * speed;
        this.angle = Math.random() * Math.PI * 2;
        this.vAngle = (Math.random() - 0.5) * 0.015;
        this.alpha = 0;
        this.maxAlpha = 0.08 + Math.random() * 0.12;
        this.life = 0;
        this.maxLife = 180 + Math.random() * 140;
      }

      update() {
        this.x += this.vx + Math.sin(this.life * 0.02) * 0.3;
        this.y += this.vy;
        this.angle += this.vAngle;
        this.life++;

        // Smooth grow and fade
        const progress = this.life / this.maxLife;
        this.currentRadius = this.radius + (this.maxRadius - this.radius) * progress;

        if (progress < 0.25) {
          this.alpha = (progress / 0.25) * this.maxAlpha;
        } else if (progress > 0.6) {
          this.alpha = ((1 - progress) / 0.4) * this.maxAlpha;
        } else {
          this.alpha = this.maxAlpha;
        }

        if (this.life >= this.maxLife || this.y < -this.currentRadius) {
          this.reset(false);
        }
      }

      draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);

        const gradient = context.createRadialGradient(0, 0, 0, 0, 0, this.currentRadius);
        gradient.addColorStop(0, color.replace(/[\d.]+\)$/, `${this.alpha})`));
        gradient.addColorStop(0.5, color.replace(/[\d.]+\)$/, `${this.alpha * 0.5})`));
        gradient.addColorStop(1, 'transparent');

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(0, 0, this.currentRadius, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    // Initialize particle pool
    const particles = Array.from({ length: density }, () => new SmokeParticle());

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, color, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        ...style
      }}
    />
  );
}
