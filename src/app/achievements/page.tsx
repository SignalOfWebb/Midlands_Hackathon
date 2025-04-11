'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { Box, Button, Container, Flex, Heading, Icon, Progress, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FiAward, FiBookOpen, FiCheck, FiCpu, FiLock, FiUsers } from 'react-icons/fi'

export default function AchievementsPage() {
  const router = useRouter();
  
  return (
    <MainLayout>
      <Container maxW="container.xl">
        <Heading size="xl" mb={8} color="white">Achievements</Heading>
        
        {/* User Level */}
        <Box 
          mb={8} 
          p={6} 
          borderRadius="xl" 
          bgGradient="linear(to-r, primary.900, accent.900)"
          position="relative"
          overflow="hidden"
          boxShadow="xl"
        >
          <Flex justify="space-between" align="center">
            <Box>
              <Heading size="md" mb={1} color="white">
                Level 4: Skilled Explorer
              </Heading>
              <Text color="whiteAlpha.800" mb={4}>
                1,240 XP earned - Keep going to advance to Level 5!
              </Text>
              <Progress value={45} colorScheme="whiteAlpha" size="sm" borderRadius="full" mb={2} />
              <Text color="whiteAlpha.700" fontSize="xs">
                260 XP needed for next level
              </Text>
            </Box>
            <Box
              bg="whiteAlpha.200"
              borderRadius="full"
              p={4}
              boxShadow="inner"
            >
              <Icon as={FiAward} boxSize={14} color="white" />
            </Box>
          </Flex>
        </Box>
        
        <Tabs variant="soft-rounded" colorScheme="primary" mb={8}>
          <TabList mb={6}>
            <Tab color="gray.400" _selected={{ color: 'white', bg: 'primary.900' }}>Badges</Tab>
            <Tab color="gray.400" _selected={{ color: 'white', bg: 'primary.900' }}>Certificates</Tab>
            <Tab color="gray.400" _selected={{ color: 'white', bg: 'primary.900' }}>Rewards</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <Text color="gray.400" mb={6}>
                Earn badges by completing lessons, quizzes, and special challenges.
              </Text>
              
              <Heading size="md" mb={4} color="white">AI Foundations</Heading>
              <SimpleGrid columns={{ base: 2, md: 4, lg: 5 }} spacing={6} mb={8}>
                <AchievementBadge 
                  title="First Steps" 
                  description="Complete your first AI lesson" 
                  icon={FiBookOpen}
                  achieved
                  date="Sep 15, 2023"
                />
                <AchievementBadge 
                  title="Quick Learner" 
                  description="Complete 5 lessons in the AI Foundations track" 
                  icon={FiCpu}
                  achieved
                  date="Sep 18, 2023"
                />
                <AchievementBadge 
                  title="AI Basics Master" 
                  description="Score 100% on the AI Basics module quiz" 
                  icon={FiAward}
                  achieved
                  date="Sep 20, 2023"
                />
                <AchievementBadge 
                  title="Terminology Pro" 
                  description="Learn 50 AI-related terms" 
                  icon={FiBookOpen}
                  achieved
                  date="Sep 22, 2023"
                />
                <AchievementBadge 
                  title="Foundations Complete" 
                  description="Complete the entire AI Foundations track" 
                  icon={FiAward}
                  progress={75}
                />
              </SimpleGrid>
              
              <Heading size="md" mb={4} color="white">Specialized Skills</Heading>
              <SimpleGrid columns={{ base: 2, md: 4, lg: 5 }} spacing={6} mb={8}>
                <AchievementBadge 
                  title="Prompt Engineer" 
                  description="Master the art of crafting effective AI prompts" 
                  icon={FiBookOpen}
                  locked
                />
                <AchievementBadge 
                  title="Public Sector Innovation" 
                  description="Apply AI learning to public service scenarios" 
                  icon={FiUsers}
                  locked
                />
                <AchievementBadge 
                  title="Data Detective" 
                  description="Learn to identify quality data for AI training" 
                  icon={FiCpu}
                  locked
                />
                <AchievementBadge 
                  title="AI Ethics Champion" 
                  description="Complete the AI Ethics module with distinction" 
                  icon={FiAward}
                  locked
                />
                <AchievementBadge 
                  title="Implementation Expert" 
                  description="Successfully implement AI solutions in case studies" 
                  icon={FiCpu}
                  locked
                />
              </SimpleGrid>
            </TabPanel>
            
            <TabPanel px={0}>
              <Box 
                bg="gray.900" 
                p={6} 
                borderRadius="xl" 
                borderWidth="1px" 
                borderColor="gray.800"
              >
                <Heading size="md" mb={4} color="white">
                  Your Certificates
                </Heading>
                <Text color="gray.400" mb={6}>
                  Earn official Birmingham City Council certificates by completing full learning tracks.
                </Text>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Box 
                    borderWidth="1px" 
                    borderColor="gray.700" 
                    borderRadius="md" 
                    p={4}
                    bg="gray.800"
                  >
                    <Flex justify="space-between" mb={3}>
                      <Heading size="sm" color="white">AI Foundations Certificate</Heading>
                      <Icon as={FiAward} color="yellow.400" boxSize={5} />
                    </Flex>
                    <Text color="gray.400" fontSize="sm" mb={2}>
                      Progress: 75% complete
                    </Text>
                    <Progress value={75} colorScheme="primary" size="sm" borderRadius="full" mb={3} />
                    <Flex justify="space-between" align="center">
                      <Text color="gray.500" fontSize="xs">
                        Estimated completion: Oct 15, 2023
                      </Text>
                      <Button size="xs" colorScheme="primary" variant="outline">Continue</Button>
                    </Flex>
                  </Box>
                  
                  <Box 
                    borderWidth="1px" 
                    borderColor="gray.700" 
                    borderRadius="md" 
                    p={4}
                    opacity="0.6"
                  >
                    <Flex justify="space-between" mb={3}>
                      <Heading size="sm" color="white">Prompt Engineering Certificate</Heading>
                      <Icon as={FiLock} color="gray.400" boxSize={5} />
                    </Flex>
                    <Text color="gray.400" fontSize="sm" mb={2}>
                      Locked - Complete AI Foundations first
                    </Text>
                    <Progress value={0} colorScheme="primary" size="sm" borderRadius="full" mb={3} />
                  </Box>
                </SimpleGrid>
              </Box>
            </TabPanel>
            
            <TabPanel px={0}>
              <Box 
                bg="gray.900" 
                p={6} 
                borderRadius="xl" 
                borderWidth="1px" 
                borderColor="gray.800"
              >
                <Heading size="md" mb={4} color="white">
                  Rewards Earned
                </Heading>
                <Text color="gray.400" mb={6}>
                  Unlock special rewards as you progress through your learning journey.
                </Text>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <RewardItem 
                    title="Digital Badge for LinkedIn"
                    description="Add your AI Foundations progress badge to your LinkedIn profile"
                    achieved
                    date="Sep 20, 2023"
                    buttonText="Download Badge"
                  />
                  <RewardItem 
                    title="Early Access: AI Tools Workshop"
                    description="Get priority registration for the upcoming workshop"
                    achieved
                    date="Sep 25, 2023"
                    buttonText="Register Now"
                  />
                  <RewardItem 
                    title="Certificate of Excellence"
                    description="Printable certificate signed by the Director of Digital Services"
                    progress={75}
                    requirement="Complete the AI Foundations track"
                  />
                  <RewardItem 
                    title="AI Innovation Opportunity"
                    description="Chance to participate in the council's AI innovation program"
                    locked
                    requirement="Reach Level 8 and complete two tracks"
                  />
                </SimpleGrid>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </MainLayout>
  )
}

interface AchievementBadgeProps {
  title: string
  description: string
  icon: React.ElementType
  achieved?: boolean
  locked?: boolean
  progress?: number
  date?: string
}

function AchievementBadge({ title, description, icon, achieved = false, locked = false, progress, date }: AchievementBadgeProps) {
  return (
    <Box 
      p={4} 
      borderRadius="lg" 
      bg={achieved ? "gray.800" : "gray.900"} 
      borderWidth="1px"
      borderColor={achieved ? "primary.800" : "gray.800"}
      textAlign="center"
      opacity={locked ? 0.6 : 1}
      position="relative"
    >
      <Flex 
        w="50px" 
        h="50px" 
        borderRadius="full" 
        bg={achieved ? "primary.700" : "gray.800"} 
        color={achieved ? "white" : "gray.500"} 
        justify="center" 
        align="center" 
        mx="auto" 
        mb={3}
      >
        {locked ? (
          <Icon as={FiLock} boxSize={5} />
        ) : (
          <Icon as={icon} boxSize={5} />
        )}
      </Flex>
      
      <Heading size="sm" mb={2} color={achieved ? "white" : "gray.300"}>
        {title}
      </Heading>
      
      <Text fontSize="xs" color="gray.400" minH="40px">
        {description}
      </Text>
      
      {achieved && date && (
        <Flex align="center" justify="center" mt={2} color="primary.300" fontSize="xs">
          <Icon as={FiCheck} boxSize={3} mr={1} />
          <Text>Earned {date}</Text>
        </Flex>
      )}
      
      {!achieved && !locked && progress && (
        <Box mt={2}>
          <Progress value={progress} size="xs" colorScheme="primary" borderRadius="full" />
          <Text mt={1} fontSize="xs" color="gray.500">{progress}% completed</Text>
        </Box>
      )}
    </Box>
  )
}

interface RewardItemProps {
  title: string
  description: string
  achieved?: boolean
  locked?: boolean
  progress?: number
  date?: string
  buttonText?: string
  requirement?: string
}

function RewardItem({ 
  title, 
  description, 
  achieved = false, 
  locked = false, 
  progress, 
  date, 
  buttonText, 
  requirement 
}: RewardItemProps) {
  return (
    <Box 
      p={4} 
      borderRadius="md" 
      bg={achieved ? "gray.800" : "gray.900"} 
      borderWidth="1px"
      borderColor={achieved ? "primary.800" : "gray.800"}
      opacity={locked ? 0.6 : 1}
    >
      <Flex justify="space-between" mb={2}>
        <Heading size="sm" color={achieved ? "white" : "gray.300"}>
          {title}
        </Heading>
        <Icon 
          as={locked ? FiLock : achieved ? FiCheck : FiAward} 
          color={achieved ? "primary.400" : "gray.500"} 
          boxSize={5} 
        />
      </Flex>
      
      <Text fontSize="sm" color="gray.400" mb={3}>
        {description}
      </Text>
      
      {achieved && date && (
        <Flex justify="space-between" align="center">
          <Text color="primary.300" fontSize="xs">Earned on {date}</Text>
          {buttonText && (
            <Button size="xs" colorScheme="primary">{buttonText}</Button>
          )}
        </Flex>
      )}
      
      {!achieved && !locked && progress && (
        <Box mb={3}>
          <Progress value={progress} size="xs" colorScheme="primary" borderRadius="full" />
          <Flex justify="space-between" mt={1}>
            <Text fontSize="xs" color="gray.500">{progress}% progress</Text>
            {requirement && <Text fontSize="xs" color="gray.500">{requirement}</Text>}
          </Flex>
        </Box>
      )}
      
      {locked && requirement && (
        <Text fontSize="xs" color="gray.500">
          {requirement}
        </Text>
      )}
    </Box>
  )
} 