/**
 * Soft Glass Minimal — Slot machine name revealer
 * Rapidly cycles through names with deceleration over 3 seconds
 */
import { useEffect, useRef, useState } from "react";

interface SlotMachineProps {
  names: string[];
  duration?: number;
  onComplete: (winner: string) => void;
  onRunning: (running: boolean) => void;
}

export function SlotMachine({ names, duration = 3000, onComplete, onRunning }: SlotMachineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const startTimeRef = useRef<number>(Date.now());
  const animFrameRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (names.length === 0) {
      onComplete("");
      return;
    }

    setIsRunning(true);
    onRunning(true);
    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: cubic ease-out for deceleration
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      // Interval decreases as we progress (slows down)
      const currentInterval = 50 + easedProgress * 450; // 50ms -> 500ms

      setCurrentIndex(Math.floor(Math.random() * names.length));

      if (progress < 1) {
        intervalRef.current = setTimeout(() => {
          animFrameRef.current = requestAnimationFrame(animate);
        }, currentInterval);
      } else {
        // Pick final winner
        const winner = names[Math.floor(Math.random() * names.length)];
        setCurrentIndex(names.indexOf(winner));
        setIsRunning(false);
        onRunning(false);
        onComplete(winner);
      }
    };

    intervalRef.current = setTimeout(() => {
      animFrameRef.current = requestAnimationFrame(animate);
    }, 50);

    return () => {
      clearTimeout(intervalRef.current);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [names, duration, onComplete, onRunning]);

  return (
    <div className="relative overflow-hidden rounded-2xl glass-card px-8 py-6">
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground mb-2 tracking-wide uppercase">
          {isRunning ? "Sorteando..." : "Resultado"}
        </p>
        <div className="text-4xl md:text-5xl font-extrabold tracking-tight transition-all duration-200">
          <span
            key={currentIndex}
            className={`inline-block ${isRunning ? "opacity-60" : "opacity-100"} transition-all duration-150`}
            style={{
              transform: isRunning ? "scale(0.95)" : "scale(1)",
              color: isRunning ? undefined : "oklch(0.72 0.16 80)",
            }}
          >
            {names[currentIndex] || "—"}
          </span>
        </div>
      </div>
    </div>
  );
}
