'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';

interface StreakCardProps {
  streak: number;
  daysThisWeek: number[];
  className?: string;
}

export function StreakCard({ 
  streak, 
  daysThisWeek, 
  className 
}: StreakCardProps) {
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  return (
    <Card className={cn("overflow-hidden bg-zinc-900", className)}>
      <CardContent className="p-6 flex flex-col items-center">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-blue-900/20 rounded-full animate-pulse-glow"></div>
          <div className="relative z-10 text-center">
            <div className="text-7xl font-bold text-blue-400">{streak}</div>
            <div className="text-lg text-blue-400/90 font-medium">day streak!</div>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 w-full mt-4">
          {weekdays.map((day, index) => (
            <div key={day} className="flex flex-col items-center">
              <span className="text-xs text-zinc-400 mb-1">{day}</span>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                daysThisWeek.includes(index) 
                  ? "bg-blue-400 text-black" 
                  : "bg-zinc-800 text-zinc-500"
              )}>
                {daysThisWeek.includes(index) && <CheckIcon className="h-4 w-4" />}
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-sm text-zinc-400 mt-6 text-center">
          You're only 1 month from hitting your longest ever streak. Keep going!
        </p>
      </CardContent>
    </Card>
  );
} 