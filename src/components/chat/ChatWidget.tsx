'use client';

import { createSystemPrompt, getChatCompletion } from '@/lib/chat-service';
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    CloseButton,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    IconButton,
    Input,
    Spinner,
    Text,
    useDisclosure,
    VStack
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FiMessageSquare, FiSend } from 'react-icons/fi';

export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

interface ChatWidgetProps {
  context?: {
    title?: string;
    content?: string;
  };
}

export function ChatWidget({ context }: ChatWidgetProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "Hello! I'm your AI learning assistant. How can I help you with your AI learning journey today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkApiConfiguration = async () => {
    try {
      const response = await fetch('/api/test-env');
      const data = await response.json();
      
      if (!data.isConfigured) {
        setError('API not properly configured. Please check the .env.local file and restart the server.');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error checking API configuration:', error);
      setError('Failed to check API configuration. Please ensure the server is running.');
      return false;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Clear any previous errors
    setError(null);

    // Add user message to the chat
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Verify API configuration before sending
      const isConfigured = await checkApiConfiguration();
      if (!isConfigured) {
        setIsLoading(false);
        return;
      }
      
      // Create system message with context if available
      const systemContent = createSystemPrompt(
        context ? `${context.title || ''} ${context.content || ''}` : undefined
      );
      
      // Prepare messages for API call
      const apiMessages: Message[] = [
        { role: 'system', content: systemContent },
        ...messages.filter(m => m.role !== 'system'),
        userMessage
      ];

      // Get response from OpenAI
      const response = await getChatCompletion(apiMessages);
      
      // Add assistant response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error in chat:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I encountered an error. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <IconButton
        aria-label="Open chat"
        icon={<FiMessageSquare />}
        bg="primary.400"
        color="white"
        borderRadius="full"
        position="fixed"
        bottom="4"
        right="4"
        size="lg"
        boxShadow="lg"
        _hover={{ bg: 'primary.500', transform: 'scale(1.05)' }}
        onClick={onOpen}
        zIndex={100}
      />

      {/* Chat drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent bg="black" borderLeftWidth="1px" borderLeftColor="gray.800">
          <DrawerCloseButton color="white" />
          <DrawerHeader borderBottomWidth="1px" borderBottomColor="gray.800" color="white">
            AI Learning Assistant
          </DrawerHeader>

          <DrawerBody p={0}>
            <Flex direction="column" h="100%">
              {/* Error message */}
              {error && (
                <Alert status="error" bg="red.900" color="white" borderBottomWidth="1px" borderBottomColor="gray.800">
                  <AlertIcon color="white" />
                  {error}
                  <CloseButton position="absolute" right="8px" top="8px" onClick={() => setError(null)} />
                </Alert>
              )}
              
              {/* Messages area */}
              <VStack
                flex="1"
                overflowY="auto"
                w="100%"
                spacing={4}
                p={4}
                align="flex-start"
              >
                {messages.filter(msg => msg.role !== 'system').map((msg, index) => (
                  <Box
                    key={index}
                    alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                    bg={msg.role === 'user' ? 'primary.400' : 'gray.800'}
                    color="white"
                    borderRadius="lg"
                    px={4}
                    py={3}
                    maxW="80%"
                  >
                    <Text whiteSpace="pre-wrap">{msg.content}</Text>
                  </Box>
                ))}
                {isLoading && (
                  <Box alignSelf="flex-start" bg="gray.800" color="white" borderRadius="lg" px={4} py={3}>
                    <Spinner size="sm" />
                  </Box>
                )}
                <div ref={messagesEndRef} />
              </VStack>

              {/* Input area */}
              <Flex p={4} borderTopWidth="1px" borderTopColor="gray.800">
                <Input
                  placeholder="Ask a question about AI..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  bg="gray.900"
                  color="white"
                  borderColor="gray.700"
                  _hover={{ borderColor: 'primary.400' }}
                  _focus={{ borderColor: 'primary.400', boxShadow: '0 0 0 1px #4154de' }}
                  mr={2}
                  disabled={isLoading}
                />
                <Button
                  leftIcon={<FiSend />}
                  onClick={handleSendMessage}
                  isLoading={isLoading}
                  bg="primary.400"
                  color="white"
                  _hover={{ bg: 'primary.500' }}
                  isDisabled={!input.trim() || isLoading}
                >
                  Send
                </Button>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
} 