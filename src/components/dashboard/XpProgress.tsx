'use client';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface XpProgressProps {
  currentXp: number;
  levelXp: number;
  level: number;
  title: string;
  className?: string;
}

export function XpProgress({
  currentXp,
  levelXp,
  level,
  title,
  className
}: XpProgressProps) {
  const progress = Math.min((currentXp / levelXp) * 100, 100);
  
  return (
    <div className={cn("bg-zinc-900 p-4 rounded-lg", className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-blue-900/20 text-blue-400 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="font-bold">{level}</span>
          </div>
          <span className="font-medium text-white">{title}</span>
        </div>
        <div className="text-sm">
          <span className="text-blue-400 font-bold">{currentXp}</span>
          <span className="text-zinc-400">/{levelXp} XP</span>
        </div>
      </div>
      <Progress value={progress} className="h-2 bg-zinc-800" />
    </div>
  );
} 