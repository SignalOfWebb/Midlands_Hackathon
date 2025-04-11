'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import React from 'react'

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  )
} 