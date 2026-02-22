import { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  fadeSpeed: number;
}

export function Sparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let sparkles: Sparkle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createSparkle = (): Sparkle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      opacity: 0,
      fadeSpeed: Math.random() * 0.02 + 0.01,
    });

    const drawSparkle = (sparkle: Sparkle) => {
      ctx.save();
      ctx.globalAlpha = sparkle.opacity;

      // Draw star shape
      const spikes = 4;
      const outerRadius = sparkle.size;
      const innerRadius = sparkle.size / 2;

      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / spikes - Math.PI / 2;
        const x = sparkle.x + Math.cos(angle) * radius;
        const y = sparkle.y + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = '#FFE4B5';
      ctx.fill();

      // Glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#FFE4B5';

      ctx.restore();
    };

    const updateSparkle = (sparkle: Sparkle) => {
      sparkle.opacity += sparkle.fadeSpeed;

      if (sparkle.opacity >= 1) {
        sparkle.fadeSpeed = -Math.abs(sparkle.fadeSpeed);
      }

      if (sparkle.opacity <= 0 && sparkle.fadeSpeed < 0) {
        Object.assign(sparkle, createSparkle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Maintain sparkle count
      while (sparkles.length < 40) {
        sparkles.push(createSparkle());
      }

      sparkles.forEach((sparkle) => {
        updateSparkle(sparkle);
        drawSparkle(sparkle);
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-5"
    />
  );
}
