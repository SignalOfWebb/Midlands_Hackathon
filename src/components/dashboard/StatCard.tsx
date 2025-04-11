'use client';

import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface StatCardProps {
  title: string
  value: string
  description: string
  colorScheme: 'purple' | 'blue' | 'orange' | 'green'
  icon: IconType
}

export function StatCard({ title, value, description, colorScheme, icon }: StatCardProps) {
  const bgGradient = `linear(to-br, ${colorScheme}.900, ${colorScheme}.800)`
  const textColor = `${colorScheme}.100`
  
  return (
    <Box 
      p={4} 
      borderRadius="xl"
      bgGradient={bgGradient}
      position="relative"
      overflow="hidden"
      boxShadow="md"
    >
      <Box 
        position="absolute" 
        top="-10px" 
        right="-10px" 
        w="70px" 
        h="70px" 
        borderRadius="full" 
        bg="white" 
        opacity="0.05"
      />
      
      <Flex justify="space-between" mb={2}>
        <Text fontSize="sm" fontWeight="medium" color={textColor}>
          {title}
        </Text>
        <Icon as={icon} color={textColor} boxSize={5} />
      </Flex>
      
      <Text fontSize="2xl" fontWeight="bold" color="white">
        {value}
      </Text>
      
      <Text fontSize="xs" color={textColor} mt={1}>
        {description}
      </Text>
    </Box>
  )
} 