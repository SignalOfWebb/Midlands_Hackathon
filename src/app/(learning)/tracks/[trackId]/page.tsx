'use client'

import { ModuleCard } from '@/components/learning/ModuleCard'
import { getUserProgress } from '@/lib/user-progress'
import { Box, Container, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useParams } from 'next/navigation'
import { ReactNode } from 'react'
import { FiBookOpen, FiCpu, FiShield } from 'react-icons/fi'

// Mock data for AI Foundations track
const TRACK_DATA = {
  'ai-foundations': {
    id: 'ai-foundations',
    title: 'AI Foundations',
    description: 'Master the fundamentals of artificial intelligence and understand how AI can be applied in the public sector.',
    modules: [
      {
        id: 'ai-basics',
        title: 'AI Basics',
        description: 'Learn the core concepts and terminology of artificial intelligence, including different types of AI and their capabilities.',
        lessonCount: 3,
        estimatedHours: 2,
        icon: FiCpu
      },
      {
        id: 'ai-in-public-sector',
        title: 'AI in Public Sector',
        description: 'Discover real-world applications of AI in government services, case studies, and implementation considerations.',
        lessonCount: 3,
        estimatedHours: 3,
        icon: FiBookOpen
      },
      {
        id: 'responsible-ai',
        title: 'Responsible AI',
        description: 'Understand the ethical considerations, bias concerns, and governance frameworks for responsible AI adoption.',
        lessonCount: 3,
        estimatedHours: 2.5,
        icon: FiShield
      }
    ]
  }
};

export default function TrackPage() {
  const params = useParams();
  const trackId = params.trackId as string;
  
  // Get track data
  const trackData = TRACK_DATA[trackId as keyof typeof TRACK_DATA];
  
  if (!trackData) {
    return (
      <Container maxW="container.lg" py={10}>
        <Heading>Track not found</Heading>
        <Text mt={4}>The track you're looking for doesn't exist.</Text>
      </Container>
    );
  }
  
  // Get user progress data
  const userProgress = getUserProgress();
  const trackProgress = userProgress.tracks[trackId] || { modules: {}, progress: 0 };
  
  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading color="white" mb={3}>{trackData.title}</Heading>
          <Text color="gray.300" fontSize="lg">{trackData.description}</Text>
        </Box>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {trackData.modules.map((module) => {
            const moduleProgress = trackProgress.modules[module.id] || { 
              completed: false, 
              progress: 0, 
              completedLessons: 0,
              lastAccessed: ''
            };
            
            return (
              <ModuleCard
                key={module.id}
                id={module.id}
                title={module.title}
                description={module.description}
                lessonCount={module.lessonCount}
                completedLessons={moduleProgress?.completedLessons || 0}
                estimatedHours={module.estimatedHours}
                progress={moduleProgress?.progress || 0}
                icon={module.icon as ReactNode}
                href={`/modules/${module.id}`}
              />
            );
          })}
        </SimpleGrid>
      </VStack>
    </Container>
  );
} 