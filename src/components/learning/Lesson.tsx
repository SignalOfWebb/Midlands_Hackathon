'use client'

import { Alert, AlertIcon, Box, Button, Flex, Heading, Icon, Progress, Radio, RadioGroup, Text, useToast, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { FiCheck, FiChevronRight, FiClock } from 'react-icons/fi'

export interface QuizQuestion {
  id: string
  question: string
  options: {
    id: string
    text: string
    isCorrect: boolean
  }[]
}

export interface LessonSection {
  id: string
  title: string
  content: string
  quizQuestions?: QuizQuestion[]
}

export interface LessonProps {
  id: string
  title: string
  description: string
  estimatedTime: number
  sections: LessonSection[]
  onComplete?: () => void
}

export function Lesson({ id, title, description, estimatedTime, sections, onComplete }: LessonProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [sectionProgress, setSectionProgress] = useState<number[]>(Array(sections.length).fill(0))
  const toast = useToast()

  const currentSection = sections[currentSectionIndex]
  
  const handleNextSection = () => {
    // Update section progress
    const newSectionProgress = [...sectionProgress];
    newSectionProgress[currentSectionIndex] = 100;
    setSectionProgress(newSectionProgress);
    
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1)
      setSelectedAnswers({})
      setShowResults(false)
      setQuizCompleted(false)
      window.scrollTo(0, 0)
    } else {
      // Last section completed
      if (onComplete) {
        onComplete()
      }
      
      toast({
        title: "Lesson completed!",
        description: "You've successfully completed this lesson.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handlePreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1)
      setSelectedAnswers({})
      setShowResults(false)
      setQuizCompleted(false)
      window.scrollTo(0, 0)
    }
  }

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId
    })
  }

  const checkAnswers = () => {
    setShowResults(true)
    
    // Check if all answers are correct
    const allCorrect = currentSection.quizQuestions?.every(question => {
      const selectedAnswerId = selectedAnswers[question.id]
      const correctOption = question.options.find(option => option.isCorrect)
      return selectedAnswerId === correctOption?.id
    })
    
    if (allCorrect) {
      setQuizCompleted(true)
      
      // Update section progress
      const newSectionProgress = [...sectionProgress];
      newSectionProgress[currentSectionIndex] = 50; // Set to 50% after quiz completion
      setSectionProgress(newSectionProgress);
    }
  }

  const calculateProgress = () => {
    if (sectionProgress.length === 0) return 0;
    
    // Calculate overall lesson progress
    const totalProgress = sectionProgress.reduce((sum, progress) => sum + progress, 0);
    return (totalProgress / (sections.length * 100)) * 100;
  }

  const quizCompletePercentage = () => {
    if (!currentSection.quizQuestions) return 100
    
    return (Object.keys(selectedAnswers).length / currentSection.quizQuestions.length) * 100
  }

  const renderSectionContent = () => {
    // Split content by paragraphs for better formatting
    const paragraphs = currentSection.content.split('\n\n').filter(p => p.trim().length > 0);
    
    return (
      <Box 
        p={6} 
        bg="gray.800" 
        borderRadius="xl"
        boxShadow="md"
        mb={6}
      >
        {paragraphs.map((paragraph, index) => (
          <Text 
            key={index}
            color="gray.100" 
            fontSize="md" 
            whiteSpace="pre-line"
            lineHeight="1.7"
            mb={paragraph.trim().startsWith('•') ? 1 : 4}
          >
            {paragraph}
          </Text>
        ))}
      </Box>
    );
  }

  const renderQuizQuestions = () => {
    if (!currentSection.quizQuestions || currentSection.quizQuestions.length === 0) {
      return null
    }

    return (
      <Box mt={8} p={6} borderRadius="xl" bg="gray.800">
        <Heading size="md" mb={4} color="white">
          Knowledge Check
        </Heading>
        
        <VStack spacing={6} align="stretch">
          {currentSection.quizQuestions.map((question) => (
            <Box key={question.id} mb={6}>
              <Text fontSize="lg" fontWeight="medium" mb={3} color="white">
                {question.question}
              </Text>
              
              <RadioGroup 
                onChange={(value) => handleAnswerSelect(question.id, value)} 
                value={selectedAnswers[question.id] || ''}
                isDisabled={showResults}
              >
                <VStack spacing={3} align="stretch">
                  {question.options.map((option) => {
                    const isSelected = selectedAnswers[question.id] === option.id
                    const isCorrectAnswer = option.isCorrect
                    
                    let bgColor = 'gray.700'
                    if (showResults) {
                      if (isCorrectAnswer) {
                        bgColor = 'green.700'
                      } else if (isSelected && !isCorrectAnswer) {
                        bgColor = 'red.700'
                      }
                    }
                    
                    return (
                      <Box 
                        key={option.id} 
                        p={3} 
                        borderRadius="md" 
                        bg={isSelected && !showResults ? 'primary.900' : bgColor}
                        borderWidth={isSelected && !showResults ? '1px' : '0px'}
                        borderColor="primary.500"
                      >
                        <Radio 
                          value={option.id} 
                          colorScheme="primary"
                          size="lg"
                          w="100%"
                        >
                          <Flex align="center" justify="space-between" w="100%">
                            <Text color="white">
                              {option.text}
                            </Text>
                            {showResults && isCorrectAnswer && (
                              <Icon as={FiCheck} color="green.300" boxSize={5} />
                            )}
                          </Flex>
                        </Radio>
                      </Box>
                    )
                  })}
                </VStack>
              </RadioGroup>
            </Box>
          ))}
        </VStack>
        
        {!showResults && (
          <Button 
            colorScheme="primary" 
            mt={4} 
            rightIcon={<FiCheck />}
            onClick={checkAnswers}
            isDisabled={Object.keys(selectedAnswers).length !== currentSection.quizQuestions.length}
          >
            Check Answers
          </Button>
        )}
        
        {showResults && (
          <Box mt={4}>
            {quizCompleted ? (
              <Alert status="success" borderRadius="md" bg="green.700" color="white">
                <AlertIcon color="white" />
                Great job! You've answered all questions correctly.
              </Alert>
            ) : (
              <Alert status="error" borderRadius="md" bg="red.700" color="white">
                <AlertIcon color="white" />
                Some answers are incorrect. Please review and try again.
              </Alert>
            )}
            
            {quizCompleted && (
              <Button 
                colorScheme="primary" 
                mt={4} 
                rightIcon={<FiChevronRight />}
                onClick={handleNextSection}
              >
                {currentSectionIndex < sections.length - 1 ? 'Next Section' : 'Complete Lesson'}
              </Button>
            )}
          </Box>
        )}
      </Box>
    )
  }

  // Display section progress indicators
  const renderSectionProgressIndicators = () => {
    return (
      <Flex mb={6} gap={2} flexWrap="wrap">
        {sections.map((section, index) => (
          <Box 
            key={section.id}
            w={`${100 / Math.min(sections.length, 6)}%`}
            maxW="100px"
            minW="60px"
          >
            <Box 
              h="6px"
              bg={index === currentSectionIndex ? "primary.500" : sectionProgress[index] === 100 ? "green.500" : "gray.700"}
              borderRadius="full"
              cursor="pointer"
              onClick={() => {
                if (sectionProgress[index] > 0 || index <= Math.max(...sectionProgress.map((p, i) => p > 0 ? i : -1)) + 1) {
                  setCurrentSectionIndex(index);
                  setSelectedAnswers({});
                  setShowResults(false);
                  setQuizCompleted(false);
                  window.scrollTo(0, 0);
                }
              }}
              transition="all 0.2s"
              _hover={{
                transform: "scaleY(1.5)",
              }}
            />
            <Text 
              fontSize="xs" 
              color={index === currentSectionIndex ? "primary.300" : "gray.500"}
              textAlign="center"
              mt={1}
            >
              {index + 1}
            </Text>
          </Box>
        ))}
      </Flex>
    );
  };

  return (
    <Box>
      {/* Overall Progress bar */}
      <Progress 
        value={calculateProgress()} 
        colorScheme="primary" 
        size="sm" 
        borderRadius="full" 
        mb={2}
      />
      
      {/* Section indicators */}
      {renderSectionProgressIndicators()}
      
      {/* Lesson header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="lg" color="white">{title}</Heading>
          <Text color="gray.400" mt={1}>{description}</Text>
        </Box>
        <Flex align="center" color="gray.400">
          <Icon as={FiClock} mr={2} />
          <Text>{estimatedTime} min</Text>
        </Flex>
      </Flex>
      
      {/* Section title */}
      <Heading as="h2" size="md" color="primary.300" mb={4}>
        Section {currentSectionIndex + 1}: {currentSection.title}
      </Heading>
      
      {/* Section content */}
      {renderSectionContent()}
      
      {/* Quiz questions */}
      {renderQuizQuestions()}
      
      {/* Navigation */}
      <Flex justify="space-between" mt={8}>
        <Button 
          variant="outline" 
          color="primary.400"
          borderColor="primary.400"
          isDisabled={currentSectionIndex === 0}
          onClick={handlePreviousSection}
        >
          Previous
        </Button>
        
        {(!currentSection.quizQuestions || quizCompleted) && (
          <Button 
            colorScheme="primary" 
            rightIcon={<FiChevronRight />}
            onClick={handleNextSection}
          >
            {currentSectionIndex < sections.length - 1 ? 'Next Section' : 'Complete Lesson'}
          </Button>
        )}
      </Flex>
    </Box>
  )
} 