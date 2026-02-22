import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

export function RosePetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let petals: Petal[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createPetal = (): Petal => {
      const colors = ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FBCFE8', '#FCE7F3'];
      return {
        x: Math.random() * canvas.width,
        y: -50,
        size: Math.random() * 15 + 10,
        speedY: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    const drawPetal = (petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate((petal.rotation * Math.PI) / 180);
      ctx.globalAlpha = petal.opacity;

      // Draw petal shape
      ctx.beginPath();
      ctx.moveTo(0, -petal.size / 2);
      ctx.bezierCurveTo(
        petal.size / 2, -petal.size / 2,
        petal.size / 2, petal.size / 2,
        0, petal.size / 2
      );
      ctx.bezierCurveTo(
        -petal.size / 2, petal.size / 2,
        -petal.size / 2, -petal.size / 2,
        0, -petal.size / 2
      );
      ctx.fillStyle = petal.color;
      ctx.fill();

      ctx.restore();
    };

    const updatePetal = (petal: Petal) => {
      petal.y += petal.speedY;
      petal.x += petal.speedX + Math.sin(petal.y / 100) * 0.5;
      petal.rotation += petal.rotationSpeed;

      // Reset if off screen
      if (petal.y > canvas.height + 50) {
        Object.assign(petal, createPetal());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new petals occasionally
      if (petals.length < 30 && Math.random() < 0.05) {
        petals.push(createPetal());
      }

      petals.forEach((petal) => {
        updatePetal(petal);
        drawPetal(petal);
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    // Initialize with some petals
    for (let i = 0; i < 20; i++) {
      const petal = createPetal();
      petal.y = Math.random() * canvas.height;
      petals.push(petal);
    }
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
      className="absolute inset-0 pointer-events-none z-10"
    />
  );
}
