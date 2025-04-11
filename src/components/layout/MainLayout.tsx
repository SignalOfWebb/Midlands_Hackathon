'use client'

import { NavItem } from '@/components/dashboard/NavItem'
import { Avatar, AvatarBadge, Box, Button, Flex, Heading, Icon, VStack } from '@chakra-ui/react'
import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { FiAward, FiBell, FiBookOpen, FiHome, FiUsers } from 'react-icons/fi'

interface MainLayoutProps {
  children: ReactNode
  title?: string
}

export function MainLayout({ children, title }: MainLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  const isActiveRoute = (route: string) => {
    if (route === '/') {
      return pathname === '/'
    }
    if (route === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname === route || pathname.startsWith(`${route}/`)
  }
  
  return (
    <Box minH="100vh" bg="#0f0f12">
      {/* Header */}
      <Box 
        bg="gray.900" 
        py={3} 
        px={6} 
        borderBottom="1px" 
        borderColor="gray.800"
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Flex justify="space-between" align="center" maxW="container.xl" mx="auto">
          <Heading as="h1" size="md" color="white" cursor="pointer" onClick={() => router.push('/')}>
            Birmingham AI Navigator
          </Heading>
          
          <Flex gap={4} align="center">
            <Box position="relative">
              <Button variant="ghost" p={2} borderRadius="full">
                <Icon as={FiBell} boxSize={5} color="gray.400" />
              </Button>
              <Box position="absolute" top={1} right={1} w={2} h={2} bg="primary.500" borderRadius="full" />
            </Box>
            
            <Button 
              as={NextLink} 
              href="/dashboard" 
              variant="ghost" 
              size="sm" 
              colorScheme="whiteAlpha"
            >
              Dashboard
            </Button>
            
            <Avatar 
              size="sm" 
              name="John Doe" 
              src="https://bit.ly/broken-link" 
              bg="primary.500"
            >
              <AvatarBadge boxSize='1.25em' bg='green.500' />
            </Avatar>
          </Flex>
        </Flex>
      </Box>
      
      <Flex>
        {/* Sidebar */}
        <Box 
          w="200px" 
          bg="gray.900" 
          py={8} 
          px={3}
          borderRight="1px" 
          borderColor="gray.800"
          position="fixed"
          left={0}
          top="60px"
          bottom={0}
          display={{ base: 'none', md: 'block' }}
        >
          <VStack spacing={2} align="stretch">
            <NavItem 
              icon={FiHome} 
              label="Home" 
              href="/" 
              active={isActiveRoute('/')} 
            />
            <NavItem 
              icon={FiBookOpen} 
              label="Courses" 
              href="/tracks" 
              active={isActiveRoute('/tracks')} 
            />
            <NavItem 
              icon={FiUsers} 
              label="Community" 
              href="/community" 
              active={isActiveRoute('/community')} 
            />
            <NavItem 
              icon={FiAward} 
              label="Achievements" 
              href="/achievements" 
              active={isActiveRoute('/achievements')} 
            />
          </VStack>
        </Box>
        
        {/* Main Content */}
        <Box ml={{ base: 0, md: "200px" }} w="full" p={6}>
          {children}
        </Box>
      </Flex>
    </Box>
  )
} 