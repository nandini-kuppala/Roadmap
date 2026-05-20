'use client';

import { useEffect, useState, useRef } from 'react';

interface DayCompleteModalProps {
  dayNumber: number;
  xpEarned: number;
  streak: number;
  totalCompleted: number;
  onContinue: () => void;
}

const QUOTES = [
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Consistency is the foundation of virtue.", author: "Francis Bacon" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into manageable tasks.", author: "Mark Twain" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "Every day is a chance to be better than you were yesterday.", author: "" },
  { text: "The pain of discipline is far less than the pain of regret.", author: "Jim Rohn" },
  { text: "Champions are made from something deep inside them — a desire, a dream, a vision.", author: "Muhammad Ali" },
  { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson" },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
  { text: "One day or day one. You decide.", author: "" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "Show up every day. The offers will follow. 🚀", author: "" },
];

const COLORS = ['#00d4aa', '#0ea5e9', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981', '#f97316'];

function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; color: string; angle: number; spin: number; shape: 'rect' | 'circle';
    }[] = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 4,
        size: 6 + Math.random() * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.2,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      });
    }

    let frame = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.angle += p.spin;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - (p.y / (canvas.height * 0.9)));

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });

      if (frame < 300) animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ opacity: 0.85 }}
    />
  );
}

export default function DayCompleteModal({ dayNumber, xpEarned, streak, totalCompleted, onContinue }: DayCompleteModalProps) {
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(4);
  const [canContinue, setCanContinue] = useState(false);
  const quote = QUOTES[dayNumber % QUOTES.length];
  const progressPercent = Math.round((totalCompleted / 60) * 100);

  useEffect(() => {
    // Stagger in
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      setCanContinue(true);
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleContinue = () => {
    setVisible(false);
    setTimeout(onContinue, 300);
  };

  return (
    <>
      <Confetti />

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          className={`relative w-full max-w-lg bg-surface border border-border rounded-3xl shadow-2xl transition-all duration-500 ${
            visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8'
          }`}
        >
          {/* Glow ring */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/40 via-blue-500/20 to-purple-500/20 pointer-events-none" />

          <div className="relative p-8 text-center">
            {/* Animated checkmark burst */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" style={{ animationDuration: '1.5s' }} />
              <div className="absolute inset-0 rounded-full bg-accent/10" style={{ transform: 'scale(1.4)' }} />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center shadow-lg shadow-accent/30">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-extrabold text-text-primary mb-1">
              Day {dayNumber} Complete!
            </h2>
            <p className="text-text-secondary mb-6">
              You showed up and did the work. That&apos;s what separates dreamers from achievers.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-background/60 border border-border rounded-xl p-3">
                <div className="text-2xl font-bold text-yellow-400">+{xpEarned}</div>
                <div className="text-xs text-text-muted mt-0.5">XP earned</div>
              </div>
              <div className="bg-background/60 border border-border rounded-xl p-3">
                <div className="text-2xl font-bold text-orange-400">🔥 {streak}</div>
                <div className="text-xs text-text-muted mt-0.5">day streak</div>
              </div>
              <div className="bg-background/60 border border-border rounded-xl p-3">
                <div className="text-2xl font-bold text-accent">{totalCompleted}</div>
                <div className="text-xs text-text-muted mt-0.5">of 60 done</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-text-muted mb-1.5">
                <span>Overall Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Quote */}
            <div className="bg-background/40 border border-border/60 rounded-xl px-5 py-4 mb-7">
              <p className="text-sm text-text-secondary italic leading-relaxed">
                &ldquo;{quote.text}&rdquo;
              </p>
              {quote.author && (
                <p className="text-xs text-text-muted mt-1.5">— {quote.author}</p>
              )}
            </div>

            {/* Continue button */}
            <button
              onClick={handleContinue}
              disabled={!canContinue}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 ${
                canContinue
                  ? 'bg-gradient-to-r from-accent to-blue-500 text-white hover:shadow-xl hover:shadow-accent/25 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-surface-2 text-text-muted cursor-not-allowed border border-border'
              }`}
            >
              {canContinue
                ? `Continue to Day ${dayNumber + 1} →`
                : `Soaking it in… ${countdown}`}
            </button>

            {canContinue && (
              <p className="text-xs text-text-muted mt-3">
                Day {dayNumber + 1} is now unlocked. Stay consistent! 💪
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
