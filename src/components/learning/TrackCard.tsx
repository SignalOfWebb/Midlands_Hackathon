'use client'

import { Badge, Box, Button, Flex, Heading, Icon, Progress, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ReactNode } from 'react'
import { FiArrowRight, FiClock, FiUsers } from 'react-icons/fi'

export interface TrackCardProps {
  id: string
  title: string
  description: string
  moduleCount: number
  completedModules: number
  estimatedHours: number
  enrolledUsers?: number
  progress: number
  icon?: ReactNode
  href: string
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
}

export function TrackCard({
  id,
  title,
  description,
  moduleCount,
  completedModules,
  estimatedHours,
  enrolledUsers,
  progress,
  icon,
  href,
  difficulty = 'Beginner'
}: TrackCardProps) {
  const isCompleted = completedModules === moduleCount
  
  const difficultyColor = {
    'Beginner': 'green',
    'Intermediate': 'blue',
    'Advanced': 'purple'
  }[difficulty]
  
  return (
    <Box
      bg="gray.800"
      borderRadius="xl"
      overflow="hidden"
      borderWidth="1px"
      borderColor="gray.700"
      transition="all 0.3s"
      _hover={{ 
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        borderColor: 'primary.500',
      }}
      position="relative"
    >
      {/* Top color accent bar */}
      <Box h="5px" bg="primary.500" />
      
      <Box p={6}>
        <Flex justify="space-between" align="flex-start" mb={4}>
          <Heading size="md" color="white" mb={2}>
            {title}
          </Heading>
          <Badge colorScheme={difficultyColor} variant="solid" px={2} py={1} borderRadius="md">
            {difficulty}
          </Badge>
        </Flex>
        
        <Text color="gray.300" fontSize="md" mb={4} noOfLines={3}>
          {description}
        </Text>
        
        <Flex color="gray.400" fontSize="sm" mb={5} flexWrap="wrap">
          <Flex align="center" mr={6} mb={2}>
            <Icon as={FiClock} mr={2} />
            <Text>{estimatedHours} hrs</Text>
          </Flex>
          <Flex align="center" mr={6} mb={2}>
            <Box mr={2} fontWeight="bold">
              📚
            </Box>
            <Text>{moduleCount} modules</Text>
          </Flex>
          {enrolledUsers && (
            <Flex align="center" mb={2}>
              <Icon as={FiUsers} mr={2} />
              <Text>{enrolledUsers.toLocaleString()} enrolled</Text>
            </Flex>
          )}
        </Flex>
        
        <Box mb={4}>
          <Flex justify="space-between" mb={2}>
            <Text color="gray.400" fontSize="sm">Progress</Text>
            <Text color="primary.300" fontSize="sm" fontWeight="bold">
              {progress}%
            </Text>
          </Flex>
          
          <Progress 
            value={progress} 
            colorScheme="primary" 
            size="sm" 
            borderRadius="full" 
          />
        </Box>
        
        <Button
          as={NextLink}
          href={href}
          colorScheme={isCompleted ? "green" : "primary"}
          width="full"
          rightIcon={<FiArrowRight />}
        >
          {completedModules === 0 
            ? 'Start Track' 
            : isCompleted 
              ? 'Track Completed' 
              : 'Continue Track'}
        </Button>
      </Box>
    </Box>
  )
} 