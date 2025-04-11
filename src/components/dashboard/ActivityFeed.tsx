'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type ActivityType = 'completion' | 'achievement' | 'join' | 'level-up';

type ActivityItem = {
  id: string;
  user: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  type: ActivityType;
  content: string;
  timestamp: string;
};

interface ActivityFeedProps {
  activities: ActivityItem[];
  className?: string;
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  return (
    <div className={cn("glass-card p-4", className)}>
      <h3 className="text-lg font-semibold mb-4">AI Activity</h3>
      
      <div className="space-y-5">
        {activities.map(activity => (
          <div key={activity.id} className="relative">
            <Avatar className="h-10 w-10 z-10 relative">
              <AvatarImage src={activity.user.avatarUrl} alt={activity.user.name} />
              <AvatarFallback className="bg-zinc-800 text-zinc-300">
                {activity.user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="ml-14 -mt-8 pt-2">
              <div className="font-medium text-sm">{activity.user.name}</div>
              <p className="text-sm text-zinc-300 mt-1">{activity.content}</p>
              <div className="text-xs text-zinc-500 mt-1">{activity.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 