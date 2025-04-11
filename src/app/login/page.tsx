'use client'

import {
    Box,
    Button,
    Center,
    Checkbox,
    Container,
    Divider,
    Flex,
    FormControl,
    FormLabel,
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

export default function Login() {
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
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <Box minH="100vh" bg="#0f0f12">
      <Container maxW="md" py={{ base: 12, md: 20 }}>
        <Stack spacing={8}>
          <Stack spacing={2} textAlign="center">
            <Link as={NextLink} href="/" fontWeight="medium" color="primary.300">
              ← Back to Home
            </Link>
            <Heading color="white" fontSize="3xl">
              Welcome back
            </Heading>
            <Text color="gray.400">
              Continue your AI learning journey
            </Text>
          </Stack>

          <Box
            bg="gray.900" 
            p={{ base: 6, md: 8 }}
            borderRadius="xl"
            boxShadow="xl"
            backdropFilter="blur(10px)"
            borderWidth="1px"
            borderColor="rgba(255, 255, 255, 0.1)"
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel color="gray.300">Email</FormLabel>
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

                <Flex justify="space-between" align="center">
                  <Checkbox colorScheme="primary" defaultChecked>
                    <Text color="gray.300" fontSize="sm">
                      Remember me
                    </Text>
                  </Checkbox>
                  <Link href="#" color="primary.300" fontSize="sm">
                    Forgot password?
                  </Link>
                </Flex>

                <Button 
                  colorScheme="primary" 
                  size="lg" 
                  type="submit"
                  isLoading={loading}
                  loadingText="Signing In"
                  mt={2}
                >
                  Sign In
                </Button>
              </Stack>
            </form>

            <Center mt={6}>
              <Text color="gray.400">
                Don't have an account?{' '}
                <Link as={NextLink} href="/signup" color="primary.300" fontWeight="medium">
                  Sign up
                </Link>
              </Text>
            </Center>

            <Flex align="center" my={6}>
              <Divider borderColor="gray.700" />
              <Text px={4} color="gray.500" fontSize="sm">
                OR SIGN IN WITH
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
          </Box>
        </Stack>
      </Container>
    </Box>
  )
} 