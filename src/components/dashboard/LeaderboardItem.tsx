'use client'

import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface LeaderboardItemProps {
  name: string
  department: string
  points: number
  position: number
  isYou?: boolean
}

export function LeaderboardItem({ name, department, points, position, isYou = false }: LeaderboardItemProps) {
  return (
    <Flex 
      align="center" 
      py={2} 
      px={3} 
      borderRadius="md"
      bg={isYou ? 'primary.900' : 'transparent'}
      _hover={{ bg: isYou ? 'primary.800' : 'whiteAlpha.50' }}
      transition="background 0.2s"
    >
      <Text fontWeight="bold" w="24px" color={isYou ? 'white' : 'gray.400'}>
        {position}
      </Text>
      <Avatar size="sm" name={name} bg={isYou ? 'primary.500' : 'gray.600'} mx={2} />
      <Box flex="1">
        <Text fontWeight="medium" color={isYou ? 'white' : 'gray.300'}>
          {name} {isYou && <Text as="span" fontSize="xs">(You)</Text>}
        </Text>
        <Text fontSize="xs" color={isYou ? 'primary.200' : 'gray.500'}>
          {department}
        </Text>
      </Box>
      <Text fontWeight="bold" color={isYou ? 'white' : 'gray.300'}>
        {points.toLocaleString()} XP
      </Text>
    </Flex>
  )
} 