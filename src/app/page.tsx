'use client'

import { Box, Button, Container, Flex, Heading, Icon, Image, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { MoveRight } from 'lucide-react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { FiAward, FiBriefcase, FiCpu, FiLayers, FiTrendingUp, FiUsers } from 'react-icons/fi'

export default function LandingPage() {
  const router = useRouter();
  
  const handleContinueLearning = () => {
    // Always redirect to the AI Foundations track page
    router.push('/tracks/ai-foundations');
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        bgGradient="linear(to-r, #111124, #1a1a2e)" 
        color="white" 
        pt={{ base: 16, md: 28 }} 
        pb={{ base: 20, md: 32 }}
        position="relative"
        overflow="hidden"
      >
        {/* Abstract background shapes */}
        <Box 
          position="absolute" 
          top="5%" 
          right="5%" 
          w="300px" 
          h="300px" 
          bg="accent.600" 
          opacity="0.1" 
          borderRadius="full" 
          filter="blur(40px)"
        />
        <Box 
          position="absolute" 
          bottom="10%" 
          left="5%" 
          w="250px" 
          h="250px" 
          bg="primary.600" 
          opacity="0.1" 
          borderRadius="full" 
          filter="blur(40px)"
        />
        
        <Container maxW="container.xl">
          <Stack 
            spacing={{ base: 10, md: 16 }} 
            direction={{ base: 'column', lg: 'row' }}
            align="center"
          >
            <Stack spacing={8} maxW={{ lg: "lg" }}>
              <Heading
                as="h1"
                size="3xl"
                lineHeight="shorter"
                fontWeight="bold"
              >
                Empower Your AI Journey with{' '}
                <Text as="span" color="primary.400">
                  Birmingham AI Navigator
                </Text>
              </Heading>
              <Text 
                fontSize="xl" 
                opacity={0.9}
                maxW={{ base: 'full', md: 'md' }}
              >
                Equip Birmingham City Council staff with practical AI skills through our interactive learning platform.
              </Text>
              <Stack 
                direction={{ base: 'column', sm: 'row' }}
                spacing={4}
                mt={2}
              >
                <Button
                  size="lg"
                  onClick={handleContinueLearning}
                  colorScheme="primary"
                  px={8}
                  fontSize="md"
                  fontWeight="bold"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  transition="all 0.2s"
                >
                  Start Learning
                  <MoveRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  as={NextLink}
                  href="/dashboard"
                  size="lg"
                  variant="outline"
                  px={8}
                  fontSize="md"
                  fontWeight="bold"
                  _hover={{ bg: 'whiteAlpha.100' }}
                >
                  View Dashboard
                </Button>
              </Stack>
            </Stack>

            {/* Hero Image */}
            <Box 
              position="relative" 
              minW={{ lg: '500px' }}
              bg="whiteAlpha.100"
              borderRadius="2xl"
              overflow="hidden" 
              boxShadow="xl"
            >
              <Box 
                p={1} 
                borderRadius="2xl" 
                bg="rgba(255,255,255,0.1)"
                backdropFilter="blur(8px)"
              >
                <Image 
                  alt="AI Education in the Classroom"
                  src="/ai-classroom-robot.png"
                  fallbackSrc="https://via.placeholder.com/600x400/1a1a2e/FFFFFF?text=AI+Navigator+Dashboard"
                  borderRadius="xl"
                  width="100%"
                  height="auto"
                />
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box bg="gray.900" py={20}>
        <Container maxW="container.xl">
          <Stack spacing={4} as={Box} textAlign="center" mb={10}>
            <Heading color="white" fontSize={{ base: '3xl', md: '4xl' }}>
              Comprehensive AI Literacy Curriculum
            </Heading>
            <Text color="gray.400" maxW="2xl" mx="auto">
              Designed specifically for Birmingham City Council staff to build practical AI skills through interactive learning.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={10}>
            <FeatureCard
              icon={FiCpu}
              title="AI Foundations"
              text="Learn AI fundamentals, terminology, and core concepts to build a solid knowledge base."
            />
            <FeatureCard
              icon={FiBriefcase}
              title="Practical Skills"
              text="Develop hands-on skills with AI tools and techniques for immediate workplace application."
            />
            <FeatureCard
              icon={FiTrendingUp}
              title="Advanced Applications"
              text="Explore advanced AI applications and specialized use cases relevant to public service."
            />
            <FeatureCard
              icon={FiUsers}
              title="Community Learning"
              text="Connect with colleagues, share insights, and collaborate on AI-powered solutions."
            />
            <FeatureCard
              icon={FiLayers}
              title="Structured Progression"
              text="Follow a clear learning path from beginner to expert with milestone achievements."
            />
            <FeatureCard
              icon={FiAward}
              title="Certification"
              text="Earn recognition for your AI proficiency with official Birmingham Council certifications."
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20} bgGradient="linear(to-r, #111124, #1a1a2e)">
        <Container maxW="container.md" textAlign="center">
          <Stack spacing={8}>
            <Heading color="white" fontSize={{ base: '3xl', md: '4xl' }}>
              Ready to Begin Your AI Journey?
            </Heading>
            <Text color="gray.300" fontSize="lg">
              Join your colleagues who are already building the skills needed for the future of public service.
            </Text>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              spacing={4}
              justify="center"
              mt={4}
            >
              <Button
                as={NextLink}
                href="/signup"
                size="lg"
                colorScheme="primary"
                px={8}
                fontSize="md"
                fontWeight="bold"
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                transition="all 0.2s"
              >
                Create Account
              </Button>
              <Button
                as={NextLink}
                href="/login"
                size="lg"
                variant="outline"
                px={8}
                fontSize="md"
                fontWeight="bold"
                _hover={{ bg: 'whiteAlpha.100' }}
              >
                Sign In
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg="gray.900" color="gray.400" py={8}>
        <Container maxW="container.xl">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
          >
            <Text>© 2023 Birmingham City Council. All rights reserved.</Text>
            <Stack direction="row" spacing={6}>
              <Link href="#" _hover={{ color: 'white' }}>
                Privacy Policy
              </Link>
              <Link href="#" _hover={{ color: 'white' }}>
                Terms of Service
              </Link>
              <Link href="#" _hover={{ color: 'white' }}>
                Contact
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

interface FeatureCardProps {
  title: string
  text: string
  icon: React.ElementType
}

function FeatureCard({ title, text, icon }: FeatureCardProps) {
  return (
    <Box
      bg="gray.800"
      p={6}
      borderRadius="xl"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
      transition="all 0.3s"
    >
      <Flex
        w={12}
        h={12}
        align="center"
        justify="center"
        borderRadius="full"
        bg="primary.900"
        color="primary.100"
        mb={4}
      >
        <Icon as={icon} boxSize={6} />
      </Flex>
      <Heading as="h3" size="md" mb={3} color="white">
        {title}
      </Heading>
      <Text color="gray.400">{text}</Text>
    </Box>
  )
}
