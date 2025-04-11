'use client'

import { LeaderboardItem } from '@/components/dashboard/LeaderboardItem'
import { MainLayout } from '@/components/layout/MainLayout'
import { Box, Container, Flex, Grid, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function CommunityPage() {
  const router = useRouter();
  
  return (
    <MainLayout>
      <Container maxW="container.xl">
        <Heading size="xl" mb={8} color="white">Community</Heading>
        
        <Tabs variant="soft-rounded" colorScheme="primary" mb={8}>
          <TabList mb={6}>
            <Tab color="gray.400" _selected={{ color: 'white', bg: 'primary.900' }}>Leaderboard</Tab>
            <Tab color="gray.400" _selected={{ color: 'white', bg: 'primary.900' }}>Departments</Tab>
            <Tab color="gray.400" _selected={{ color: 'white', bg: 'primary.900' }}>Discussion</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
                <Box 
                  bg="gray.900" 
                  p={6} 
                  borderRadius="xl" 
                  borderWidth="1px" 
                  borderColor="gray.800"
                >
                  <Heading size="md" mb={4} color="white">
                    Global Leaderboard
                  </Heading>
                  <VStack spacing={4} align="stretch">
                    <LeaderboardItem name="Emily Parker" department="Digital Services" points={2450} position={1} />
                    <LeaderboardItem name="James Wilson" department="HR" points={2120} position={2} />
                    <LeaderboardItem name="John Doe" department="IT" points={1780} position={3} isYou />
                    <LeaderboardItem name="Sarah Johnson" department="Planning" points={1640} position={4} />
                    <LeaderboardItem name="Michael Brown" department="Finance" points={1520} position={5} />
                    <LeaderboardItem name="Jennifer Lee" department="Education" points={1450} position={6} />
                    <LeaderboardItem name="David Clark" department="Health" points={1320} position={7} />
                    <LeaderboardItem name="Lisa Taylor" department="Transport" points={1280} position={8} />
                    <LeaderboardItem name="Robert Williams" department="IT" points={1150} position={9} />
                    <LeaderboardItem name="Amanda Moore" department="Digital Services" points={1020} position={10} />
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
                    Your League - Advanced Learners
                  </Heading>
                  <Text color="gray.400" mb={4}>
                    You're currently in the Advanced Learners league based on your progress and activity.
                  </Text>
                  <VStack spacing={4} align="stretch">
                    <LeaderboardItem name="Emily Parker" department="Digital Services" points={2450} position={1} />
                    <LeaderboardItem name="James Wilson" department="HR" points={2120} position={2} />
                    <LeaderboardItem name="John Doe" department="IT" points={1780} position={3} isYou />
                    <LeaderboardItem name="Sarah Johnson" department="Planning" points={1640} position={4} />
                    <LeaderboardItem name="Michael Brown" department="Finance" points={1520} position={5} />
                  </VStack>
                  <Box mt={4} p={4} bg="gray.800" borderRadius="md">
                    <Text color="gray.300" fontWeight="bold">League Promotion</Text>
                    <Text color="gray.400" fontSize="sm">
                      Earn 300 more points to advance to the Expert League
                    </Text>
                    <Box bg="gray.700" h="4px" w="full" borderRadius="full" mt={2}>
                      <Box bg="primary.500" h="4px" w="70%" borderRadius="full" />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </TabPanel>
            
            <TabPanel px={0}>
              <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
                <Box 
                  bg="gray.900" 
                  p={6} 
                  borderRadius="xl" 
                  borderWidth="1px" 
                  borderColor="gray.800"
                >
                  <Heading size="md" mb={4} color="white">
                    Department Rankings
                  </Heading>
                  <VStack spacing={4} align="stretch">
                    <DepartmentRanking name="Digital Services" members={24} points={32450} position={1} />
                    <DepartmentRanking name="IT" members={18} points={28760} position={2} isYours />
                    <DepartmentRanking name="Finance" members={15} points={22120} position={3} />
                    <DepartmentRanking name="Planning" members={12} points={18640} position={4} />
                    <DepartmentRanking name="HR" members={20} points={17520} position={5} />
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
                    IT Department
                  </Heading>
                  <Text color="gray.400" mb={4}>
                    Your department has completed 65% of all available modules.
                  </Text>
                  <VStack spacing={4} align="stretch">
                    <LeaderboardItem name="James Wilson" department="IT" points={2120} position={1} />
                    <LeaderboardItem name="John Doe" department="IT" points={1780} position={2} isYou />
                    <LeaderboardItem name="Robert Williams" department="IT" points={1150} position={3} />
                    <LeaderboardItem name="Karen Thompson" department="IT" points={980} position={4} />
                    <LeaderboardItem name="Steven Rodriguez" department="IT" points={840} position={5} />
                  </VStack>
                </Box>
              </Grid>
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
                  Community Discussion
                </Heading>
                <Text color="gray.400">
                  Connect with your colleagues and share your learning journey. Discussion forum coming soon!
                </Text>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </MainLayout>
  )
}

interface DepartmentRankingProps {
  name: string
  members: number
  points: number
  position: number
  isYours?: boolean
}

function DepartmentRanking({ name, members, points, position, isYours = false }: DepartmentRankingProps) {
  return (
    <Flex 
      justify="space-between" 
      align="center"
      py={3}
      borderBottom="1px"
      borderColor="gray.800"
      bg={isYours ? "gray.800" : "transparent"}
      px={isYours ? 3 : 0}
      borderRadius={isYours ? "md" : "none"}
    >
      <Flex align="center" gap={3}>
        <Text 
          fontWeight="bold" 
          color="gray.500" 
          w="24px" 
          textAlign="center"
        >
          {position}
        </Text>
        <Box>
          <Text color="white" fontWeight={isYours ? "bold" : "normal"}>
            {name} {isYours && "(Your Department)"}
          </Text>
          <Text color="gray.500" fontSize="xs">
            {members} members
          </Text>
        </Box>
      </Flex>
      <Text color={isYours ? "primary.300" : "gray.400"} fontWeight="bold">
        {points.toLocaleString()} XP
      </Text>
    </Flex>
  )
} 