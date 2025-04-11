'use client'

import {
    Box,
    Button,
    Center,
    Container,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaEye, FaEyeSlash, FaGoogle, FaMicrosoft } from 'react-icons/fa'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        title: 'Account created.',
        description: "We've created your account. Please check your email to verify.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <Box minH="100vh" bg="#0f0f12">
      <Container maxW="container.xl" py={{ base: 8, md: 16 }}>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
          {/* Left Side - Signup Form */}
          <Box 
            bg="gray.900" 
            p={{ base: 6, md: 8 }}
            borderRadius="xl"
            boxShadow="xl"
            backdropFilter="blur(10px)"
            borderWidth="1px"
            borderColor="rgba(255, 255, 255, 0.1)"
          >
            <Stack spacing={6}>
              <Link as={NextLink} href="/" fontWeight="medium" color="primary.300">
                ← Back to Home
              </Link>
              
              <Heading as="h1" size="xl" color="white">
                Create your account
              </Heading>
              <Text color="gray.400">
                Start your AI learning journey with Birmingham AI Navigator
              </Text>

              <form onSubmit={handleSubmit}>
                <Stack spacing={5}>
                  <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                    <FormControl isRequired>
                      <FormLabel color="gray.300">First Name</FormLabel>
                      <Input 
                        placeholder="John" 
                        bg="gray.800"
                        borderColor="gray.700"
                        color="white"
                        _hover={{ borderColor: 'gray.600' }}
                        _focus={{ borderColor: 'primary.400', boxShadow: '0 0 0 1px var(--chakra-colors-primary-400)' }}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel color="gray.300">Last Name</FormLabel>
                      <Input 
                        placeholder="Doe" 
                        bg="gray.800"
                        borderColor="gray.700"
                        color="white"
                        _hover={{ borderColor: 'gray.600' }}
                        _focus={{ borderColor: 'primary.400', boxShadow: '0 0 0 1px var(--chakra-colors-primary-400)' }}
                      />
                    </FormControl>
                  </Grid>

                  <FormControl isRequired>
                    <FormLabel color="gray.300">Work Email</FormLabel>
                    <Input 
                      type="email"
                      placeholder="john.doe@birmingham.gov.uk" 
                      bg="gray.800"
                      borderColor="gray.700"
                      color="white"
                      _hover={{ borderColor: 'gray.600' }}
                      _focus={{ borderColor: 'primary.400', boxShadow: '0 0 0 1px var(--chakra-colors-primary-400)' }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="gray.300">Password</FormLabel>
                    <InputGroup>
                      <Input 
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••" 
                        bg="gray.800"
                        borderColor="gray.700"
                        color="white"
                        _hover={{ borderColor: 'gray.600' }}
                        _focus={{ borderColor: 'primary.400', boxShadow: '0 0 0 1px var(--chakra-colors-primary-400)' }}
                      />
                      <InputRightElement width="3rem">
                        <Button 
                          h="1.5rem" 
                          size="sm" 
                          variant="ghost"
                          color="gray.400"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel color="gray.300">Department</FormLabel>
                    <Input 
                      placeholder="e.g. Digital Services" 
                      bg="gray.800"
                      borderColor="gray.700"
                      color="white"
                      _hover={{ borderColor: 'gray.600' }}
                      _focus={{ borderColor: 'primary.400', boxShadow: '0 0 0 1px var(--chakra-colors-primary-400)' }}
                    />
                  </FormControl>

                  <Button 
                    colorScheme="primary" 
                    size="lg" 
                    type="submit"
                    isLoading={loading}
                    loadingText="Creating Account"
                    mt={2}
                  >
                    Create Account
                  </Button>
                </Stack>
              </form>

              <Center>
                <Text color="gray.400">
                  Already have an account?{' '}
                  <Link as={NextLink} href="/login" color="primary.300" fontWeight="medium">
                    Sign in
                  </Link>
                </Text>
              </Center>

              <Flex align="center" my={2}>
                <Divider borderColor="gray.700" />
                <Text px={4} color="gray.500" fontSize="sm">
                  OR SIGN UP WITH
                </Text>
                <Divider borderColor="gray.700" />
              </Flex>

              <Stack direction="row" spacing={3}>
                <Button 
                  w="full" 
                  variant="outline" 
                  borderColor="gray.700" 
                  color="gray.300"
                  leftIcon={<FaMicrosoft />}
                  _hover={{ bg: 'whiteAlpha.100' }}
                >
                  Microsoft
                </Button>
                <Button 
                  w="full" 
                  variant="outline" 
                  borderColor="gray.700" 
                  color="gray.300"
                  leftIcon={<FaGoogle />}
                  _hover={{ bg: 'whiteAlpha.100' }}
                >
                  Google
                </Button>
              </Stack>
            </Stack>
          </Box>
          
          {/* Right Side - Benefits */}
          <Box display={{ base: 'none', md: 'block' }}>
            <Box
              h="100%"
              p={8}
              borderRadius="xl"
              bgGradient="linear(to-br, primary.900, accent.900)"
              position="relative"
              overflow="hidden"
            >
              <Box 
                position="absolute" 
                top="20%" 
                right="10%" 
                w="250px" 
                h="250px" 
                bg="primary.600" 
                opacity="0.1" 
                borderRadius="full" 
                filter="blur(40px)"
              />
              <Box 
                position="absolute" 
                bottom="10%" 
                left="10%" 
                w="200px" 
                h="200px" 
                bg="accent.600" 
                opacity="0.15" 
                borderRadius="full" 
                filter="blur(40px)"
              />
              
              <Stack spacing={8} position="relative" zIndex={1}>
                <Heading as="h2" size="xl" color="white">
                  Benefits of joining Birmingham AI Navigator
                </Heading>
                
                <Stack spacing={6}>
                  <BenefitItem 
                    title="Personalized Learning Path" 
                    description="Follow a customized learning journey based on your role and existing knowledge"
                  />
                  <BenefitItem 
                    title="Track Your Progress" 
                    description="Monitor your achievements, earn XP, and unlock badges as you advance"
                  />
                  <BenefitItem 
                    title="Connect with Colleagues" 
                    description="Learn alongside your peers and share experiences through our community features"
                  />
                  <BenefitItem 
                    title="Practical Workplace Applications" 
                    description="Learn skills you can apply immediately in your role at Birmingham City Council"
                  />
                </Stack>
                
                <Box bg="whiteAlpha.200" p={4} borderRadius="lg">
                  <Text color="white" fontSize="md" fontStyle="italic">
                    "The AI Navigator platform has transformed how I approach my daily tasks. I've discovered practical ways to use AI that save time and improve our services."
                  </Text>
                  <Text color="primary.100" fontWeight="bold" mt={2}>
                    - Sarah Johnson, Digital Services
                  </Text>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}

function BenefitItem({ title, description }: { title: string, description: string }) {
  return (
    <Box>
      <Text color="white" fontWeight="bold" fontSize="lg">
        {title}
      </Text>
      <Text color="whiteAlpha.800" fontSize="md">
        {description}
      </Text>
    </Box>
  )
} 