'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type LeaderboardUser = {
  id: string;
  name: string;
  avatarUrl?: string;
  xp: number;
  rank: number;
};

interface LeaderboardProps {
  users: LeaderboardUser[];
  currentUserId?: string;
  className?: string;
}

export function Leaderboard({ users, currentUserId, className }: LeaderboardProps) {
  return (
    <div className={cn("glass-card p-4", className)}>
      <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
      
      <div className="space-y-3">
        {users.map(user => {
          const isCurrentUser = user.id === currentUserId;
          
          return (
            <div 
              key={user.id} 
              className={cn(
                "flex items-center justify-between p-2 rounded-xl",
                isCurrentUser ? "bg-blue-900/30" : "hover:bg-gray-800/30"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 text-center text-sm text-zinc-400">
                  {user.rank}
                </div>
                
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback className="bg-zinc-800 text-zinc-300">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <span className={isCurrentUser ? "font-medium text-blue-200" : ""}>{user.name}</span>
              </div>
              
              <div className="font-semibold text-sm">
                {user.xp.toLocaleString()} XP
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-4 text-center text-xs text-zinc-400 hover:text-white py-2">
        View All
      </button>
    </div>
  );
} 