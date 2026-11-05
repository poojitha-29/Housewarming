import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

const COLORS = ["#d4a017", "#c9922a", "#ffd700", "#ff9500", "#e8c76f", "#f5c842"];

function getRandomParticle(canvasWidth: number, canvasHeight: number): Particle {
  const maxLife = 80 + Math.random() * 120;
  return {
    x: Math.random() * canvasWidth,
    y: canvasHeight + 20,
    vx: (Math.random() - 0.5) * 0.6,
    vy: -(0.3 + Math.random() * 0.8),
    size: 1 + Math.random() * 2.5,
    opacity: 0.4 + Math.random() * 0.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    life: 0,
    maxLife,
  };
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Seed initial particles
    for (let i = 0; i < 40; i++) {
      const p = getRandomParticle(canvas.width, canvas.height);
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles occasionally
      if (Math.random() < 0.3 && particles.length < 80) {
        particles.push(getRandomParticle(canvas.width, canvas.height));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const progress = p.life / p.maxLife;
        const alpha = p.opacity * (progress < 0.1 ? progress * 10 : progress > 0.8 ? (1 - progress) * 5 : 1);

        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.life >= p.maxLife || p.y < -20) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
