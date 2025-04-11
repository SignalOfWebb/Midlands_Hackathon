'use client';

import { cn } from '@/lib/utils';
import { BookOpen, Globe, MessageSquare, Users, Utensils } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Skill {
  id: string;
  title: string;
  icon: 'book' | 'message' | 'globe' | 'utensils' | 'users';
  level: number;
  isLocked: boolean;
  progress: number;
}

interface SkillGridProps {
  skills: Skill[];
  className?: string;
}

export function SkillGrid({ skills, className }: SkillGridProps) {
  const router = useRouter();
  
  const getIcon = (iconType: Skill['icon']) => {
    switch (iconType) {
      case 'book': return <BookOpen className="h-6 w-6" />;
      case 'message': return <MessageSquare className="h-6 w-6" />;
      case 'globe': return <Globe className="h-6 w-6" />;
      case 'utensils': return <Utensils className="h-6 w-6" />;
      case 'users': return <Users className="h-6 w-6" />;
    }
  };
  
  const handleSkillClick = (skill: Skill) => {
    if (!skill.isLocked) {
      router.push(`/skills/${skill.id}`);
    }
  };
  
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-4", className)}>
      {skills.map((skill) => (
        <div 
          key={skill.id}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => handleSkillClick(skill)}
        >
          <div className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center mb-2 relative",
            skill.isLocked 
              ? "bg-zinc-800 text-zinc-500" 
              : skill.progress === 100
                ? "bg-green-900/20 text-green-500 border-2 border-green-500"
                : "bg-blue-900/20 text-blue-400 border-2 border-blue-400"
          )}>
            {getIcon(skill.icon)}
            
            {skill.isLocked && (
              <div className="absolute -bottom-1 -right-1 bg-zinc-700 rounded-full w-6 h-6 flex items-center justify-center">
                <span className="text-xs">🔒</span>
              </div>
            )}
            
            {!skill.isLocked && skill.level > 0 && (
              <div className="absolute -bottom-1 -right-1 bg-blue-400 rounded-full w-6 h-6 flex items-center justify-center">
                <span className="text-xs text-black font-bold">{skill.level}</span>
              </div>
            )}
          </div>
          <span className={cn(
            "text-sm font-medium",
            skill.isLocked ? "text-zinc-500" : "text-white"
          )}>
            {skill.title}
          </span>
        </div>
      ))}
    </div>
  );
} 