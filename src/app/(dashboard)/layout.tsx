import { AppNavigation } from '@/components/layout/AppNavigation';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-16"> {/* Add padding to account for the fixed navigation */}
      {children}
      <AppNavigation />
    </div>
  );
} 