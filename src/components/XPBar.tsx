'use client';

interface XPBarProps {
  xp: number;
  streak: number;
  level?: number;
}

export default function XPBar({ xp, streak, level }: XPBarProps) {
  const xpPerLevel = 500;
  const currentLevel = level ?? Math.floor(xp / xpPerLevel) + 1;
  const xpInLevel = xp % xpPerLevel;
  const xpPercent = Math.round((xpInLevel / xpPerLevel) * 100);

  return (
    <div className="bg-surface rounded-xl p-4 border border-border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-sm font-bold text-white">
            {currentLevel}
          </div>
          <div>
            <p className="text-text-primary text-sm font-semibold">Level {currentLevel}</p>
            <p className="text-text-muted text-xs">{xp.toLocaleString()} XP total</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-orange-500/15 border border-orange-500/30 rounded-full px-3 py-1">
          <span className="text-base">🔥</span>
          <span className="text-orange-400 font-bold text-sm">{streak}</span>
          <span className="text-text-muted text-xs">day streak</span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-text-muted">
          <span>{xpInLevel} XP</span>
          <span>{xpPerLevel} XP</span>
        </div>
        <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-700"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
        <p className="text-xs text-text-muted text-right">
          {xpPerLevel - xpInLevel} XP to Level {currentLevel + 1}
        </p>
      </div>
    </div>
  );
}
