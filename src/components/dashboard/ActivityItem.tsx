'use client'

import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface ActivityItemProps {
  user: string
  action: string
  subject: string
  time: string
}

export function ActivityItem({ user, action, subject, time }: ActivityItemProps) {
  const isYou = user === 'You'
  
  return (
    <Flex pb={3} borderBottomWidth="1px" borderColor="gray.800">
      <Avatar size="sm" name={user} bg={isYou ? 'primary.500' : 'gray.600'} mr={3} />
      <Box flex="1">
        <Flex align="baseline" flexWrap="wrap">
          <Text color={isYou ? 'primary.300' : 'white'} fontWeight="medium">
            {user}
          </Text>
          <Text color="gray.400" fontSize="sm" ml={1}>
            {action}
          </Text>
          <Text color="gray.300" fontWeight="medium" fontSize="sm" ml={1}>
            {subject}
          </Text>
        </Flex>
        <Text color="gray.500" fontSize="xs">
          {time}
        </Text>
      </Box>
    </Flex>
  )
} 