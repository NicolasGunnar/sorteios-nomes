/**
 * Soft Glass Minimal — Confetti burst on reveal
 * Small colorful particles that fly outward with physics-like motion
 */
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  shape: "circle" | "square" | "triangle";
}

const COLORS = [
  "oklch(0.72 0.16 80)",   // amber gold
  "oklch(0.65 0.15 280)",  // lavender
  "oklch(0.65 0.18 20)",   // coral
  "oklch(0.55 0.15 150)",  // emerald
  "oklch(0.60 0.15 250)",  // soft blue
  "oklch(0.75 0.14 60)",   // warm yellow
];

export function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 10,
      y: 50 + (Math.random() - 0.5) * 10,
      rotation: Math.random() * 360,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 8,
      shape: (["circle", "square", "triangle"] as const)[Math.floor(Math.random() * 3)],
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 300;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 50;
        const duration = 0.8 + Math.random() * 0.7;

        return (
          <div
            key={p.id}
            className="absolute left-1/2 top-1/2"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.shape === "circle" ? "50%" : p.shape === "square" ? "2px" : "0",
              clipPath: p.shape === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : undefined,
              animation: `confetti-burst ${duration}s cubic-bezier(0.23, 1, 0.32, 1) forwards`,
              transform: `translate(${p.x}%, ${p.y}%) rotate(${p.rotation}deg)`,
              ["--tx" as string]: `${tx}px`,
              ["--ty" as string]: `${ty}px`,
              opacity: 1,
            }}
          />
        );
      })}
      <style>{`
        @keyframes confetti-burst {
          0% {
            transform: translate(var(--tx, 0), var(--ty, 0)) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(calc(var(--tx, 0) * 1.5), calc(var(--ty, 0) + 200px)) rotate(${Math.random() > 0.5 ? '' : '-'}720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
