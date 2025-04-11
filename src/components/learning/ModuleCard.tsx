'use client'

import { Box, Button, Flex, Heading, Icon, Progress, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ReactNode } from 'react'
import { FiArrowRight, FiBookOpen, FiClock, FiLayers } from 'react-icons/fi'

export interface ModuleCardProps {
  id: string
  title: string
  description: string
  lessonCount: number
  completedLessons: number
  estimatedHours: number
  progress: number
  icon?: ReactNode
  href: string
}

export function ModuleCard({
  id,
  title,
  description,
  lessonCount,
  completedLessons,
  estimatedHours,
  progress,
  icon = <FiLayers />,
  href
}: ModuleCardProps) {
  const isCompleted = completedLessons === lessonCount
  
  return (
    <Box
      bg="gray.800"
      borderRadius="xl"
      overflow="hidden"
      borderWidth="1px"
      borderColor="gray.700"
      transition="all 0.3s"
      _hover={{ 
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
        borderColor: 'primary.500',
      }}
      height="100%"
    >
      <Flex 
        p={5} 
        alignItems="center" 
        borderBottomWidth="1px" 
        borderColor="gray.700"
        bg="gray.850"
      >
        <Flex
          align="center"
          justify="center"
          bg="primary.900"
          color="primary.100"
          borderRadius="lg"
          p={3}
          mr={4}
        >
          <Icon as={typeof icon === 'function' ? icon : () => icon} boxSize={5} />
        </Flex>
        <Box flex="1">
          <Heading size="md" color="white" mb={1} noOfLines={1}>
            {title}
          </Heading>
          <Flex color="gray.400" fontSize="sm">
            <Flex align="center" mr={4}>
              <Icon as={FiBookOpen} mr={1} />
              <Text>{lessonCount} lessons</Text>
            </Flex>
            <Flex align="center">
              <Icon as={FiClock} mr={1} />
              <Text>{estimatedHours} hrs</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      
      <Stack p={5} spacing={4} height="calc(100% - 90px)" justifyContent="space-between">
        <Text color="gray.300" fontSize="sm" noOfLines={3}>
          {description}
        </Text>
        
        <Box>
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
            mb={4}
          />
          
          <Button
            as={NextLink}
            href={href}
            colorScheme={isCompleted ? "green" : "primary"}
            size="sm"
            width="full"
            rightIcon={<FiArrowRight />}
          >
            {completedLessons === 0 
              ? 'Start Module' 
              : isCompleted 
                ? 'Review Module' 
                : 'Continue Module'}
          </Button>
        </Box>
      </Stack>
    </Box>
  )
} 