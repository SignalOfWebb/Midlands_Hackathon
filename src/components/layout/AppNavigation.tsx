'use client';

import { cn } from '@/lib/utils';
import { BookOpen, Home, Trophy, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppNavigation() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/tracks', icon: BookOpen, label: 'Learn' },
    { href: '/achievements', icon: Trophy, label: 'Achievements' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-2 z-10">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center p-2 rounded-lg",
                isActive 
                  ? "text-blue-400" 
                  : "text-zinc-500 hover:text-white"
              )}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 