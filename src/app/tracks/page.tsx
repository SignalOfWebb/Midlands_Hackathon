'use client'

import { CourseCard } from '@/components/dashboard/CourseCard'
import { MainLayout } from '@/components/layout/MainLayout'
import { getUserProgress } from '@/lib/user-progress'
import { Box, Button, Container, Flex, Grid, Heading, Icon, Progress, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FiBookOpen, FiFilter, FiSearch } from 'react-icons/fi'

export default function TracksPage() {
  const router = useRouter();
  
  // Get user progress data
  const userProgress = getUserProgress();
  
  return (
    <MainLayout>
      <Container maxW="container.xl">
        <Heading size="xl" mb={2} color="white">Learning Tracks</Heading>
        <Text color="gray.400" mb={8}>
          Explore our comprehensive learning tracks designed to build your AI literacy from fundamentals to specialized applications.
        </Text>
        
        {/* Search and filter */}
        <Flex 
          mb={8} 
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          <Box
            flex="1"
            bg="gray.900"
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.800"
            p={2}
            display="flex"
            alignItems="center"
          >
            <Icon as={FiSearch} color="gray.500" ml={2} mr={3} />
            <Box
              as="input"
              flex="1"
              bg="transparent"
              border="none"
              color="white"
              placeholder="Search courses..."
              _placeholder={{ color: "gray.500" }}
              outline="none"
            />
          </Box>
          
          <Button leftIcon={<FiFilter />} variant="outline" colorScheme="whiteAlpha">
            Filter
          </Button>
        </Flex>
        
        {/* Featured Track */}
        <Box 
          mb={10} 
          p={6} 
          borderRadius="xl" 
          bgGradient="linear(to-r, primary.900, accent.900)"
          position="relative"
          overflow="hidden"
          boxShadow="xl"
        >
          <Box 
            position="absolute" 
            top="-10%" 
            right="-5%" 
            w="300px" 
            h="300px" 
            bg="white" 
            opacity="0.05" 
            borderRadius="full" 
          />
          
          <Flex justify="space-between" align="center">
            <Box>
              <Box
                bg="whiteAlpha.200"
                px={3}
                py={1}
                borderRadius="full"
                display="inline-block"
                mb={2}
              >
                <Text fontSize="xs" fontWeight="bold" color="white">
                  FEATURED TRACK
                </Text>
              </Box>
              <Heading size="lg" mb={2} color="white">
                AI Foundations
              </Heading>
              <Text color="whiteAlpha.800" mb={4} maxW="600px">
                Master the fundamentals of artificial intelligence and understand how AI can be applied in the public sector.
              </Text>
              <Progress value={userProgress.tracks['ai-foundations']?.progress || 0} colorScheme="whiteAlpha" size="sm" borderRadius="full" mb={2} />
              <Flex justify="space-between" align="center">
                <Text color="whiteAlpha.700" fontSize="sm">
                  {userProgress.tracks['ai-foundations']?.progress || 0}% Complete
                </Text>
                <Button colorScheme="whiteAlpha" size="md" onClick={() => router.push('/tracks/ai-foundations')}>
                  Continue Learning
                </Button>
              </Flex>
            </Box>
            <Box
              bg="whiteAlpha.200"
              borderRadius="full"
              p={4}
              boxShadow="inner"
              display={{ base: 'none', md: 'block' }}
            >
              <Icon as={FiBookOpen} boxSize={14} color="white" />
            </Box>
          </Flex>
        </Box>
        
        {/* All Tracks */}
        <Heading size="md" mb={6} color="white">All Learning Tracks</Heading>
        
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
          <CourseCard 
            title="AI Foundations"
            description="Learn the core concepts and terminology of artificial intelligence."
            progress={userProgress.tracks['ai-foundations']?.progress || 0}
            lessons={12}
            lessonsCompleted={8}
            imageUrl="https://via.placeholder.com/300x200/1a1a2e/FFFFFF?text=AI+Foundations"
            href="/tracks/ai-foundations"
            trackId="ai-foundations"
          />
          <CourseCard 
            title="Prompt Engineering"
            description="Master the art of crafting effective prompts for generative AI models."
            progress={0}
            lessons={8}
            lessonsCompleted={0}
            imageUrl="https://via.placeholder.com/300x200/1a1a2e/FFFFFF?text=Prompt+Engineering"
            href="/tracks/prompt-engineering"
          />
          <CourseCard 
            title="AI in Public Services"
            description="Discover applications of AI in government and public service contexts."
            progress={0}
            lessons={10}
            lessonsCompleted={0}
            imageUrl="https://via.placeholder.com/300x200/1a1a2e/FFFFFF?text=AI+in+Public+Services"
            href="/tracks/ai-in-public-services"
          />
          <CourseCard 
            title="AI Ethics & Governance"
            description="Learn about ethical considerations, regulations, and responsible AI use."
            progress={0}
            lessons={6}
            lessonsCompleted={0}
            imageUrl="https://via.placeholder.com/300x200/1a1a2e/FFFFFF?text=AI+Ethics"
            href="/tracks/ai-ethics"
          />
          <CourseCard 
            title="Data Literacy"
            description="Understand data principles, analysis, and how AI learns from data."
            progress={0}
            lessons={9}
            lessonsCompleted={0}
            imageUrl="https://via.placeholder.com/300x200/1a1a2e/FFFFFF?text=Data+Literacy"
            href="/tracks/data-literacy"
          />
          <CourseCard 
            title="AI Implementation"
            description="Practical guidance for successfully implementing AI in your department."
            progress={0}
            lessons={7}
            lessonsCompleted={0}
            imageUrl="https://via.placeholder.com/300x200/1a1a2e/FFFFFF?text=AI+Implementation"
            href="/tracks/ai-implementation"
          />
        </Grid>
      </Container>
    </MainLayout>
  )
} 