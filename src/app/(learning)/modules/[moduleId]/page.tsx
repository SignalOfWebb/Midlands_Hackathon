'use client'

import { getUserProgress } from '@/lib/user-progress'
import { Box, Button, Container, Divider, Flex, Heading, Icon, Text, VStack } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { FiArrowLeft, FiBookOpen, FiCheck, FiClock } from 'react-icons/fi'

// Mock data for modules and lessons
const MODULE_DATA = {
  'ai-basics': {
    id: 'ai-basics',
    title: 'AI Basics',
    description: 'Learn the core concepts and terminology of artificial intelligence, including different types of AI and their capabilities.',
    trackId: 'ai-foundations',
    trackTitle: 'AI Foundations',
    lessons: [
      {
        id: 'ai-foundations',
        title: 'What is AI and how does it work?',
        description: 'Understanding the fundamentals of Artificial Intelligence, its workings, and real-world applications.',
        estimatedMinutes: 35,
      },
      {
        id: 'what-is-ai',
        title: 'What is Artificial Intelligence?',
        description: 'Understanding the definition and history of AI, and how it differs from traditional computing.',
        estimatedMinutes: 25,
      },
      {
        id: 'types-of-ai',
        title: 'Types of AI Systems',
        description: 'Explore different types of AI, from narrow to general AI, and their characteristics.',
        estimatedMinutes: 30,
      },
      {
        id: 'ai-capabilities',
        title: 'AI Capabilities and Limitations',
        description: 'Learn what current AI systems can and cannot do, and where the technology is heading.',
        estimatedMinutes: 35,
      }
    ]
  },
  'ai-in-public-sector': {
    id: 'ai-in-public-sector',
    title: 'AI in Public Sector',
    description: 'Discover real-world applications of AI in government services, case studies, and implementation considerations.',
    trackId: 'ai-foundations',
    trackTitle: 'AI Foundations',
    lessons: [
      {
        id: 'public-sector-use-cases',
        title: 'AI Use Cases in Public Services',
        description: 'Explore various applications of AI in public services and government operations.',
        estimatedMinutes: 40,
      },
      {
        id: 'case-studies',
        title: 'Case Studies: AI in Local Government',
        description: 'Real-world examples of AI implementation in local government settings.',
        estimatedMinutes: 45,
      },
      {
        id: 'implementation-challenges',
        title: 'Implementation Challenges and Solutions',
        description: 'Understanding the common barriers to AI adoption and strategies to overcome them.',
        estimatedMinutes: 35,
      }
    ]
  },
  'responsible-ai': {
    id: 'responsible-ai',
    title: 'Responsible AI',
    description: 'Understand the ethical considerations, bias concerns, and governance frameworks for responsible AI adoption.',
    trackId: 'ai-foundations',
    trackTitle: 'AI Foundations',
    lessons: [
      {
        id: 'ethics-principles',
        title: 'AI Ethics Principles',
        description: 'Core ethical principles that should guide AI development and deployment.',
        estimatedMinutes: 30,
      },
      {
        id: 'bias-fairness',
        title: 'Bias and Fairness in AI',
        description: 'Understanding how bias can affect AI systems and strategies for promoting fairness.',
        estimatedMinutes: 40,
      },
      {
        id: 'governance-frameworks',
        title: 'AI Governance Frameworks',
        description: 'Exploring frameworks for responsible oversight and governance of AI systems.',
        estimatedMinutes: 35,
      }
    ]
  }
};

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;
  
  // Get module data
  const moduleData = MODULE_DATA[moduleId as keyof typeof MODULE_DATA];
  
  if (!moduleData) {
    return (
      <Container maxW="container.lg" py={10}>
        <Heading>Module not found</Heading>
        <Text mt={4}>The module you're looking for doesn't exist.</Text>
      </Container>
    );
  }
  
  // Get user progress data
  const userProgress = getUserProgress();
  const trackProgress = userProgress.tracks[moduleData.trackId];
  const moduleProgress = trackProgress?.modules[moduleId] || { lessons: {}, progress: 0 };
  
  // Handle starting a lesson
  const handleStartLesson = (lessonId: string) => {
    router.push(`/lessons/${lessonId}`);
  };
  
  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8} align="stretch">
        <Flex align="center" gap={4}>
          <Button
            as={NextLink}
            href={`/tracks/${moduleData.trackId}`}
            variant="outline"
            leftIcon={<FiArrowLeft />}
            color="primary.400"
            borderColor="primary.400"
          >
            Back to {moduleData.trackTitle}
          </Button>
        </Flex>
        
        <Box>
          <Heading color="white" mb={3}>{moduleData.title}</Heading>
          <Text color="gray.300" fontSize="lg" mb={4}>{moduleData.description}</Text>
          
          <Flex color="gray.400" align="center" gap={6}>
            <Flex align="center">
              <Icon as={FiBookOpen} mr={2} />
              <Text>{moduleData.lessons.length} lessons</Text>
            </Flex>
            <Flex align="center">
              <Icon as={FiClock} mr={2} />
              <Text>
                {Math.round(moduleData.lessons.reduce((total, lesson) => total + lesson.estimatedMinutes, 0) / 60)} hours
              </Text>
            </Flex>
          </Flex>
        </Box>
        
        <Divider borderColor="gray.800" />
        
        <VStack spacing={4} align="stretch">
          {moduleData.lessons.map((lesson, index) => {
            const lessonProgress = moduleProgress.lessons?.[lesson.id] || { completed: false, progress: 0 };
            const isCompleted = lessonProgress.completed;
            
            return (
              <Box 
                key={lesson.id} 
                p={5} 
                borderRadius="xl" 
                bg="black" 
                borderWidth="1px"
                borderColor={isCompleted ? "green.500" : "gray.800"}
                position="relative"
                overflow="hidden"
              >
                {isCompleted && (
                  <Box position="absolute" top={0} right={0} bg="green.500" px={2} py={1}>
                    <Icon as={FiCheck} color="white" />
                  </Box>
                )}
                
                <Flex justify="space-between" align="center">
                  <Box flex="1">
                    <Flex align="center" mb={2}>
                      <Text color="gray.400" mr={3}>Lesson {index + 1}</Text>
                      {isCompleted && (
                        <Flex align="center" color="green.400">
                          <Icon as={FiCheck} mr={1} />
                          <Text fontWeight="medium">Completed</Text>
                        </Flex>
                      )}
                    </Flex>
                    
                    <Heading size="md" color="white" mb={2}>{lesson.title}</Heading>
                    <Text color="gray.300" mb={3}>{lesson.description}</Text>
                    
                    <Flex align="center" color="gray.400" mb={4}>
                      <Icon as={FiClock} mr={2} />
                      <Text>{lesson.estimatedMinutes} min</Text>
                    </Flex>
                  </Box>
                  
                  <Button 
                    bg={isCompleted ? "green.500" : "primary.400"}
                    color="white"
                    onClick={() => handleStartLesson(lesson.id)}
                    _hover={{
                      bg: isCompleted ? "green.600" : "primary.500",
                    }}
                  >
                    {isCompleted ? 'Review' : lessonProgress.progress > 0 ? 'Continue' : 'Start'}
                  </Button>
                </Flex>
              </Box>
            );
          })}
        </VStack>
      </VStack>
    </Container>
  );
} 