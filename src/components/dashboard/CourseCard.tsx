'use client'

import { Box, Button, Flex, Heading, Progress, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

interface CourseCardProps {
  title: string
  description: string
  progress: number
  lessons: number
  lessonsCompleted: number
  imageUrl: string
  href?: string
  trackId?: string
}

export function CourseCard({ 
  title, 
  description, 
  progress, 
  lessons, 
  lessonsCompleted, 
  imageUrl, 
  href = '#',
  trackId
}: CourseCardProps) {
  const router = useRouter();
  
  const handleContinue = () => {
    // Always navigate to the track page (href)
    router.push(href);
  };
  
  // Determine button text
  const buttonText = lessonsCompleted === 0 
    ? 'Start' 
    : lessonsCompleted === lessons 
      ? 'Review' 
      : 'Continue';
      
  return (
    <Box 
      bg="gray.900" 
      borderRadius="xl" 
      overflow="hidden"
      borderWidth="1px"
      borderColor="gray.800"
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
    >
      <Box 
        h="140px" 
        bg="gray.800" 
        backgroundImage={`url(${imageUrl})`} 
        backgroundSize="cover" 
        backgroundPosition="center"
      />
      
      <Box p={4}>
        <Heading as="h3" size="md" mb={2} color="white">
          {title}
        </Heading>
        
        <Text color="gray.400" fontSize="sm" mb={4} noOfLines={2}>
          {description}
        </Text>
        
        <Progress value={progress} colorScheme="primary" size="sm" borderRadius="full" mb={2} />
        
        <Flex justify="space-between" align="center">
          <Text color="gray.500" fontSize="xs">
            {lessonsCompleted} of {lessons} lessons
          </Text>
          <Text color="primary.300" fontSize="xs" fontWeight="bold">
            {progress}% Complete
          </Text>
        </Flex>
        
        <Button
          onClick={handleContinue}
          colorScheme="primary" 
          size="sm" 
          mt={4} 
          w="full"
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  )
} 