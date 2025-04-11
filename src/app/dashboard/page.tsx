'use client'

import { ActivityItem } from '@/components/dashboard/ActivityItem'
import { CourseCard } from '@/components/dashboard/CourseCard'
import { LeaderboardItem } from '@/components/dashboard/LeaderboardItem'
import { StatCard } from '@/components/dashboard/StatCard'
import { MainLayout } from '@/components/layout/MainLayout'
import { getUserProgress } from '@/lib/user-progress'
import { Box, Button, Container, Grid, Heading, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FiAward, FiBookOpen, FiCalendar, FiTrendingUp } from 'react-icons/fi'

export default function Dashboard() {
  const router = useRouter();
  
  // Get user progress data
  const userProgress = getUserProgress();
  
  // Handle continue learning button click
  const handleContinueLearning = () => {
    // Always redirect to the AI Foundations track page
    router.push('/tracks/ai-foundations');
  };
  
  return (
    <MainLayout>
      <Container maxW="container.xl">
        {/* Welcome Banner */}
        <Box 
          mb={8} 
          p={6} 
          borderRadius="xl" 
          bgGradient="linear(to-r, primary.900, accent.900)"
          position="relative"
          overflow="hidden"
          boxShadow="xl"
        >
          <Box 
            position="absolute" 
            bottom="-10%" 
            right="-5%" 
            w="300px" 
            h="300px" 
            bg="white" 
            opacity="0.05" 
            borderRadius="full" 
          />
          
          <Heading size="lg" mb={2} color="white">
            Welcome back, John!
          </Heading>
          <Text color="whiteAlpha.800" mb={4}>
            You're making great progress on your AI learning journey. Continue your current track or explore new modules.
          </Text>
          <Button colorScheme="whiteAlpha" size="md" onClick={handleContinueLearning}>
            Continue Learning
          </Button>
        </Box>
        
        {/* Stats */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} mb={8}>
          <StatCard 
            title="Current Streak" 
            value="5 Days" 
            description="Keep it going!" 
            colorScheme="purple" 
            icon={FiCalendar}
          />
          <StatCard 
            title="XP Earned" 
            value="1,240" 
            description="Level 4 - 45% to Level 5" 
            colorScheme="blue" 
            icon={FiTrendingUp}
          />
          <StatCard 
            title="Badges" 
            value="12" 
            description="3 new available" 
            colorScheme="orange" 
            icon={FiAward}
          />
          <StatCard 
            title="Completion" 
            value="45%" 
            description="AI Foundations track" 
            colorScheme="green" 
            icon={FiBookOpen}
          />
        </SimpleGrid>
        
        {/* Tabs Content */}
        <Tabs variant="soft-rounded" colorScheme="primary" mb={8}>
          <TabList mb={6}>
            <Tab color="gray.400" _selected={{ color: 'white', bg: 'primary.900' }}>My Courses</Tab>
            <Tab color="gray.400" _selected={{ color: 'white', bg: 'primary.900' }}>Achievements</Tab>
            <Tab color="gray.400" _selected={{ color: 'white', bg: 'primary.900' }}>Community</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
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
              </Grid>
            </TabPanel>
            <TabPanel px={0}>
              <Text color="gray.400">Your achievements will be displayed here.</Text>
            </TabPanel>
            <TabPanel px={0}>
              <Text color="gray.400">Connect with your colleagues and share your learning journey.</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
        
        {/* Activity Feed and Leaderboard */}
        <Grid templateColumns={{ base: "1fr", lg: "1fr 300px" }} gap={6}>
          <Box 
            bg="gray.900" 
            p={6} 
            borderRadius="xl" 
            borderWidth="1px" 
            borderColor="gray.800"
          >
            <Heading size="md" mb={4} color="white">
              Recent Activity
            </Heading>
            <VStack spacing={4} align="stretch">
              <ActivityItem 
                user="You"
                action="completed the lesson"
                subject="Introduction to Machine Learning"
                time="2 hours ago"
              />
              <ActivityItem 
                user="Sarah Johnson"
                action="earned the badge"
                subject="AI Ethics Champion"
                time="Yesterday"
              />
              <ActivityItem 
                user="David Williams"
                action="reached level"
                subject="5"
                time="2 days ago"
              />
              <ActivityItem 
                user="You"
                action="earned"
                subject="120 XP for quiz completion"
                time="2 days ago"
              />
            </VStack>
          </Box>
          
          <Box 
            bg="gray.900" 
            p={6} 
            borderRadius="xl" 
            borderWidth="1px" 
            borderColor="gray.800"
          >
            <Heading size="md" mb={4} color="white">
              Leaderboard
            </Heading>
            <VStack spacing={4} align="stretch">
              <LeaderboardItem name="Emily Parker" department="Digital Services" points={2450} position={1} />
              <LeaderboardItem name="James Wilson" department="HR" points={2120} position={2} />
              <LeaderboardItem name="John Doe" department="IT" points={1780} position={3} isYou />
              <LeaderboardItem name="Sarah Johnson" department="Planning" points={1640} position={4} />
              <LeaderboardItem name="Michael Brown" department="Finance" points={1520} position={5} />
            </VStack>
          </Box>
        </Grid>
      </Container>
    </MainLayout>
  )
} 