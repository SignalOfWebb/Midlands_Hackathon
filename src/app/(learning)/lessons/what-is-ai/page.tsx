'use client'

import { ChatWidget } from '@/components/chat/ChatWidget'
import { Lesson } from '@/components/learning/Lesson'
import { updateLessonProgress } from '@/lib/user-progress'
import { Box, Button, Container, Flex } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { FiArrowLeft } from 'react-icons/fi'

// Structured lesson data for "What is AI and how does it work?"
const lessonData = {
  id: 'what-is-ai',
  title: 'What is AI and how does it work?',
  description: 'Understanding the fundamentals of Artificial Intelligence, its workings, and real-world applications.',
  estimatedTime: 35,
  moduleId: 'ai-basics',
  moduleTitle: 'Understanding AI Fundamentals',
  trackId: 'ai-foundations',
  sections: [
    {
      id: 'introduction-to-ai',
      title: 'Introduction to AI',
      content: `What is AI?  AI, or Artificial Intelligence, is like giving a computer the ability to think and learn like a human. It helps machines perform tasks that usually require human intelligence, such as understanding language or recognizing images.

Why is AI Important?  AI is important because it can handle repetitive tasks quickly and accurately, allowing humans to focus on more complex problems. It enhances productivity and can lead to innovations in various fields.

Everyday Examples:  Think of AI as the technology behind voice assistants like Siri or Alexa, which can understand and respond to your questions. AI is also used in recommendation systems, like those suggesting movies on Netflix or products on Amazon.`,
      quizQuestions: [
        {
          id: 'primary-goal',
          question: 'What is the primary goal of AI?',
          options: [
            { id: 'a', text: 'To replace human workers', isCorrect: false },
            { id: 'b', text: 'To perform tasks that require human intelligence', isCorrect: true },
            { id: 'c', text: 'To create new languages', isCorrect: false },
            { id: 'd', text: 'To build physical robots', isCorrect: false }
          ]
        },
        {
          id: 'ai-device',
          question: 'Can you name a device that uses AI to assist you?',
          options: [
            { id: 'a', text: 'Microwave', isCorrect: false },
            { id: 'b', text: 'Voice assistant like Siri or Alexa', isCorrect: true },
            { id: 'c', text: 'Traditional wristwatch', isCorrect: false },
            { id: 'd', text: 'Mechanical pencil', isCorrect: false }
          ]
        }
      ]
    },
    {
      id: 'how-ai-works',
      title: 'How AI Works',
      content: `Learning from Data:  AI systems learn by analyzing large amounts of data. For example, an AI that recognizes cats in photos has been shown thousands of cat images to learn what a cat looks like. This process is similar to how humans learn by seeing many examples.

Making Decisions:  Once trained, AI can make decisions or predictions based on new data. For instance, it can suggest songs you might like based on your listening history. This ability to predict and recommend is a key feature of AI.

Types of Learning:  AI can learn in different ways, like being taught with examples (supervised learning) or finding patterns on its own (unsupervised learning). Reinforcement learning is another type, where AI learns by trial and error, similar to how we learn from our mistakes.`,
      quizQuestions: [
        {
          id: 'ai-phases',
          question: 'What are the two main phases in AI model development?',
          options: [
            { id: 'a', text: 'Designing and testing', isCorrect: false },
            { id: 'b', text: 'Training and inference', isCorrect: true },
            { id: 'c', text: 'Coding and debugging', isCorrect: false },
            { id: 'd', text: 'Deployment and maintenance', isCorrect: false }
          ]
        },
        {
          id: 'ai-recognition',
          question: 'How does AI learn to recognize objects in images?',
          options: [
            { id: 'a', text: 'By memorizing every image', isCorrect: false },
            { id: 'b', text: 'By analyzing patterns in large datasets', isCorrect: true },
            { id: 'c', text: 'By using random guesses', isCorrect: false },
            { id: 'd', text: 'By copying human vision', isCorrect: false }
          ]
        }
      ]
    },
    {
      id: 'ai-vs-human',
      title: 'AI vs. Human Intelligence',
      content: `Speed and Accuracy:  AI can process information much faster than humans, making it great for tasks like analyzing data or playing chess. It can handle large volumes of data without getting tired or making errors due to fatigue.

Lack of Emotions:  Unlike humans, AI doesn't have feelings or emotions, which means it can't understand things like humor or empathy. This limits its ability to interact in a deeply personal or emotional way.

Creativity and Common Sense:  While AI can create art or music, it doesn't have the same creativity or common sense as humans. AI-generated content is based on patterns and data, not genuine inspiration or intuition.`,
      quizQuestions: [
        {
          id: 'ai-outperforms',
          question: 'Name one task where AI outperforms human intelligence.',
          options: [
            { id: 'a', text: 'Writing poetry', isCorrect: false },
            { id: 'b', text: 'Playing chess', isCorrect: true },
            { id: 'c', text: 'Understanding emotions', isCorrect: false },
            { id: 'd', text: 'Painting landscapes', isCorrect: false }
          ]
        },
        {
          id: 'ai-limitation',
          question: 'What is a limitation of AI compared to human intelligence?',
          options: [
            { id: 'a', text: 'Speed of processing', isCorrect: false },
            { id: 'b', text: 'Lack of emotions', isCorrect: true },
            { id: 'c', text: 'Ability to multitask', isCorrect: false },
            { id: 'd', text: 'Creativity', isCorrect: false }
          ]
        }
      ]
    },
    {
      id: 'real-world-applications',
      title: 'Real-World Applications of AI',
      content: `Healthcare:  AI helps doctors by analyzing medical images or predicting patient outcomes, making healthcare more efficient. It can assist in diagnosing diseases and personalizing treatment plans.

Finance:  In banking, AI detects fraudulent transactions and helps manage investments. It can analyze market trends and provide insights for better financial decisions.

Transportation:  AI is used in self-driving cars to navigate roads and avoid obstacles. It also optimizes traffic management systems to reduce congestion.`,
      quizQuestions: [
        {
          id: 'ai-application',
          question: 'Give an example of AI in a real-world application.',
          options: [
            { id: 'a', text: 'AI in agriculture', isCorrect: false },
            { id: 'b', text: 'AI in space exploration', isCorrect: false },
            { id: 'c', text: 'AI in healthcare', isCorrect: true },
            { id: 'd', text: 'AI in cooking', isCorrect: false }
          ]
        },
        {
          id: 'ai-healthcare',
          question: 'How does AI contribute to the healthcare industry?',
          options: [
            { id: 'a', text: 'By replacing doctors', isCorrect: false },
            { id: 'b', text: 'By analyzing medical images', isCorrect: true },
            { id: 'c', text: 'By cooking meals for patients', isCorrect: false },
            { id: 'd', text: 'By cleaning hospital rooms', isCorrect: false }
          ]
        }
      ]
    },
    {
      id: 'final-quiz',
      title: 'Module Quiz: What is AI and how does it work?',
      content: `Congratulations on completing all the lesson sections! Now, let's test your understanding of what AI is and how it works with this final quiz.

This quiz will cover the key concepts from all the sections you've studied, including what AI is, how it works, its comparison with human intelligence, and its real-world applications.

Please answer all questions to complete this lesson.`,
      quizQuestions: [
        {
          id: 'final-differences',
          question: 'Summarize the key differences between AI and human intelligence.',
          options: [
            { id: 'a', text: 'AI is slower and less accurate', isCorrect: false },
            { id: 'b', text: 'AI lacks emotions and common sense', isCorrect: true },
            { id: 'c', text: 'AI is more creative', isCorrect: false },
            { id: 'd', text: 'AI can feel empathy', isCorrect: false }
          ]
        },
        {
          id: 'final-outperform',
          question: 'Name one task where AI outperforms human intelligence.',
          options: [
            { id: 'a', text: 'Playing chess', isCorrect: true },
            { id: 'b', text: 'Writing novels', isCorrect: false },
            { id: 'c', text: 'Understanding humor', isCorrect: false },
            { id: 'd', text: 'Painting portraits', isCorrect: false }
          ]
        },
        {
          id: 'final-application',
          question: 'Give an example of AI in a real-world application.',
          options: [
            { id: 'a', text: 'AI in fashion design', isCorrect: false },
            { id: 'b', text: 'AI in healthcare', isCorrect: true },
            { id: 'c', text: 'AI in gardening', isCorrect: false },
            { id: 'd', text: 'AI in carpentry', isCorrect: false }
          ]
        },
        {
          id: 'final-learn',
          question: 'How do AI systems learn from data?',
          options: [
            { id: 'a', text: 'By guessing', isCorrect: false },
            { id: 'b', text: 'By analyzing patterns', isCorrect: true },
            { id: 'c', text: 'By copying humans', isCorrect: false },
            { id: 'd', text: 'By trial and error', isCorrect: false }
          ]
        },
        {
          id: 'final-limitation',
          question: 'What is a limitation of AI compared to human intelligence?',
          options: [
            { id: 'a', text: 'Speed of processing', isCorrect: false },
            { id: 'b', text: 'Lack of emotions', isCorrect: true },
            { id: 'c', text: 'Ability to multitask', isCorrect: false },
            { id: 'd', text: 'Creativity', isCorrect: false }
          ]
        }
      ]
    }
  ]
};

export default function LessonPage() {
  const router = useRouter();
  
  // Handle lesson completion
  const handleLessonComplete = () => {
    try {
      // Update progress in local storage
      updateLessonProgress(
        lessonData.trackId,
        lessonData.moduleId,
        lessonData.id,
        100,
        true
      );
      
      // Navigate back to the module page
      router.push(`/modules/${lessonData.moduleId}`);
    } catch (err) {
      console.error("Error completing lesson:", err);
    }
  };
  
  return (
    <Container maxW="container.lg" py={10}>
      <Flex mb={8}>
        <Button
          as={NextLink}
          href={`/modules/${lessonData.moduleId}`}
          variant="outline"
          leftIcon={<FiArrowLeft />}
          color="primary.400"
          borderColor="primary.400"
        >
          Back to {lessonData.moduleTitle}
        </Button>
      </Flex>
      
      <Box>
        <Lesson
          id={lessonData.id}
          title={lessonData.title}
          description={lessonData.description}
          estimatedTime={lessonData.estimatedTime}
          sections={lessonData.sections}
          onComplete={handleLessonComplete}
        />
      </Box>
      
      {/* Context-aware chat widget */}
      <ChatWidget 
        context={{
          title: lessonData.title,
          content: lessonData.sections[0]?.content // Pass first section content as context
        }}
      />
    </Container>
  );
} 