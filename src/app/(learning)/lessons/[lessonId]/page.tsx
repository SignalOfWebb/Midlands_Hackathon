'use client'

import { Lesson, LessonSection } from '@/components/learning/Lesson'
import { updateLessonProgress } from '@/lib/user-progress'
import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'

// Mock lesson data - in a real app, this would come from a database
const LESSON_DATA: Record<string, {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;
  moduleId: string;
  moduleTitle: string;
  trackId: string;
  sections: LessonSection[];
}> = {
  'ai-foundations': {
    id: 'ai-foundations',
    title: 'What is AI and how does it work?',
    description: 'Understanding the fundamentals of Artificial Intelligence, its workings, and real-world applications.',
    estimatedTime: 35,
    moduleId: 'ai-basics',
    moduleTitle: 'AI Basics',
    trackId: 'ai-foundations',
    sections: [
      {
        id: 'introduction-to-ai',
        title: 'Introduction to AI',
        content: `What is AI?

AI, or Artificial Intelligence, is like giving a computer the ability to think and learn like a human. It helps machines perform tasks that usually require human intelligence, such as understanding language or recognizing images.

Why is AI Important?

AI is important because it can handle repetitive tasks quickly and accurately, allowing humans to focus on more complex problems. It enhances productivity and can lead to innovations in various fields.

• Automation: AI can automate routine tasks, freeing up human time
• Enhanced Decision Making: AI provides data-driven insights for better decisions
• Innovation: AI enables new solutions to complex problems

Everyday Examples

Think of AI as the technology behind voice assistants like Siri or Alexa, which can understand and respond to your questions. AI is also used in recommendation systems, like those suggesting movies on Netflix or products on Amazon.

• 🎵 Music recommendations on Spotify
• 📱 Face recognition to unlock your phone
• 📧 Email spam filters that protect your inbox`,
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
        content: `Learning from Data

AI systems learn by analyzing large amounts of data. For example, an AI that recognizes cats in photos has been shown thousands of cat images to learn what a cat looks like. This process is similar to how humans learn by seeing many examples.

Making Decisions

Once trained, AI can make decisions or predictions based on new data. For instance, it can suggest songs you might like based on your listening history. This ability to predict and recommend is a key feature of AI.

Decision Process:
1. Collect input data (like your past song choices)
2. Process through trained model (analyze patterns in your preferences)
3. Generate prediction (suggest songs you might enjoy)
4. Provide output (display recommendations)

Types of Learning

AI can learn in different ways, like being taught with examples (supervised learning) or finding patterns on its own (unsupervised learning). Reinforcement learning is another type, where AI learns by trial and error, similar to how we learn from our mistakes.

Supervised Learning: Learning from labeled examples (Email spam detection)
Unsupervised Learning: Finding patterns without labels (Customer segmentation)
Reinforcement Learning: Learning through reward/penalty (Game-playing AI)`,
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
        content: `Speed and Accuracy

AI can process information much faster than humans, making it great for tasks like analyzing data or playing chess. It can handle large volumes of data without getting tired or making errors due to fatigue.

Lack of Emotions

Unlike humans, AI doesn't have feelings or emotions, which means it can't understand things like humor or empathy. This limits its ability to interact in a deeply personal or emotional way.

Key Differences:
• 🧠 Humans have intuition and emotional intelligence
• 🤖 AI has computational power and consistency
• 🧩 Humans excel at creative problem-solving
• 📊 AI excels at pattern recognition in large datasets

Creativity and Common Sense

While AI can create art or music, it doesn't have the same creativity or common sense as humans. AI-generated content is based on patterns and data, not genuine inspiration or intuition.

"AI can write a song, but doesn't understand the emotions behind it."`,
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
        content: `Healthcare

AI helps doctors by analyzing medical images or predicting patient outcomes, making healthcare more efficient. It can assist in diagnosing diseases and personalizing treatment plans.

Healthcare Applications:
• 🔬 Analyzing X-rays and MRIs to detect anomalies
• 📋 Predicting patient outcomes based on health data
• 💊 Recommending personalized treatment plans
• 🧬 Accelerating drug discovery through simulation

Finance

In banking, AI detects fraudulent transactions and helps manage investments. It can analyze market trends and provide insights for better financial decisions.

Finance Applications:
• 🚨 Detecting unusual transaction patterns that may indicate fraud
• 📈 Analyzing market trends to guide investment decisions
• 💰 Automating customer service through chatbots
• 📊 Personalizing financial advice based on spending habits

Transportation

AI is used in self-driving cars to navigate roads and avoid obstacles. It also optimizes traffic management systems to reduce congestion.

Transportation Applications:
• 🚗 Enabling autonomous vehicles to navigate safely
• 🚦 Optimizing traffic signal timing to reduce congestion
• 🗺️ Planning efficient delivery routes to save time and fuel
• 🚄 Predicting maintenance needs for public transportation`,
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
        content: `Congratulations!

You've completed all the lesson sections! Now, let's test your understanding of what AI is and how it works with this final quiz.

This quiz will cover the key concepts from all the sections you've studied, including:
• What AI is and why it's important
• How AI works and learns from data
• Differences between AI and human intelligence
• Real-world applications of AI

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
  },
  'implementation-challenges': {
    id: 'implementation-challenges',
    title: 'Implementation Challenges and Solutions',
    description: 'Understanding the common barriers to AI adoption and strategies to overcome them.',
    estimatedTime: 35,
    moduleId: 'ai-in-public-sector',
    moduleTitle: 'AI in Public Sector',
    trackId: 'ai-foundations',
    sections: [
      {
        id: 'common-barriers',
        title: 'Common Barriers to AI Adoption',
        content: `Organizations, especially in the public sector, face several challenges when implementing AI:

Data Challenges
• Insufficient high-quality data
• Data silos and fragmentation
• Privacy and security concerns
• Legacy systems with incompatible data formats

Technical Challenges
• Lack of technical expertise and skilled personnel
• Integration with existing systems
• Scalability issues
• Maintaining and updating AI systems

Organizational Challenges
• Resistance to change
• Unclear governance structures
• Difficulty measuring ROI
• Procurement and vendor management complexities

These barriers often prevent organizations from realizing the full potential of AI technologies.`,
        quizQuestions: [
          {
            id: 'barriers-1',
            question: 'Which of the following is a common data challenge in AI implementation?',
            options: [
              { id: 'a', text: 'Too much high-quality data available', isCorrect: false },
              { id: 'b', text: 'Data silos and fragmentation', isCorrect: true },
              { id: 'c', text: 'Excessive data documentation', isCorrect: false },
              { id: 'd', text: 'Overly standardized data formats', isCorrect: false }
            ]
          }
        ]
      },
      {
        id: 'strategic-approaches',
        title: 'Strategic Approaches to Implementation',
        content: `Successful AI implementation requires thoughtful strategic approaches:

Start Small and Scale
• Begin with pilot projects that demonstrate value
• Focus on specific, well-defined problems
• Build on successes and expand gradually
• Develop reusable components and frameworks

Build Internal Capabilities
• Invest in training and upskilling staff
• Create multidisciplinary implementation teams
• Develop AI literacy across the organization
• Consider partnerships with academic institutions

User-Centered Design
• Involve end-users in the design process
• Focus on solving real user problems
• Ensure accessibility and inclusivity
• Regularly collect and incorporate user feedback

By adopting these approaches, organizations can increase their chances of successful AI implementation.`,
        quizQuestions: [
          {
            id: 'strategic-1',
            question: 'What is a recommended approach when beginning AI implementation?',
            options: [
              { id: 'a', text: 'Immediately implement AI across the entire organization', isCorrect: false },
              { id: 'b', text: 'Begin with pilot projects that demonstrate value', isCorrect: true },
              { id: 'c', text: 'Focus on solving as many problems as possible simultaneously', isCorrect: false },
              { id: 'd', text: 'Wait until AI technology is perfectly mature', isCorrect: false }
            ]
          }
        ]
      },
      {
        id: 'case-solutions',
        title: 'Case Study: Overcoming Implementation Challenges',
        content: `Birmingham City Council: Chatbot Implementation

Challenge:
The council wanted to implement an AI chatbot to improve citizen access to services but faced challenges with data integration, staff skills, and measuring success.

Solution Approach:
1. Phased Implementation
   • Started with a limited scope (waste collection inquiries)
   • Expanded services gradually based on success
   • Built modular architecture for future expansion

2. Staff Engagement
   • Created a cross-departmental "AI Champions" network
   • Provided training on chatbot maintenance and improvement
   • Developed clear escalation paths for complex inquiries

3. Measurement Framework
   • Established baseline metrics before implementation
   • Tracked resolution rates, user satisfaction, and staff time saved
   • Used qualitative feedback to identify improvement areas

Results:
• 40% reduction in phone inquiries for covered services
• 65% user satisfaction rate (improving over time)
• Staff redeployed to handle more complex citizen needs
• Knowledge base expanded to benefit other council services

Key Lessons:
• Start with well-defined, high-volume services
• Invest in staff capabilities alongside technology
• Create clear metrics for success
• Build for continuous improvement`,
        quizQuestions: [
          {
            id: 'case-1',
            question: 'In the Birmingham City Council case study, what was a key element of their successful implementation?',
            options: [
              { id: 'a', text: 'Implementing the entire system at once', isCorrect: false },
              { id: 'b', text: 'Outsourcing all AI-related work', isCorrect: false },
              { id: 'c', text: 'Phased implementation starting with a limited scope', isCorrect: true },
              { id: 'd', text: 'Focusing only on technical aspects and ignoring staff training', isCorrect: false }
            ]
          }
        ]
      }
    ]
  },
  'what-is-ai': {
    id: 'what-is-ai',
    title: 'What is Artificial Intelligence?',
    description: 'Understanding the definition and history of AI, and how it differs from traditional computing.',
    estimatedTime: 25,
    moduleId: 'ai-basics',
    moduleTitle: 'AI Basics',
    trackId: 'ai-foundations',
    sections: [
      {
        id: 'definition',
        title: 'Defining Artificial Intelligence',
        content: `Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence. These tasks include learning from experience, understanding natural language, recognizing patterns, solving problems, and making decisions.

Unlike traditional computing where every action is explicitly programmed, AI systems can learn from data, adapt to new inputs, and improve their performance over time.

The term "Artificial Intelligence" was first coined by John McCarthy in 1956 at the Dartmouth Conference, which is considered the birthplace of AI as a formal field of study.`,
        quizQuestions: [
          {
            id: 'ai-def-1',
            question: 'Which of the following best describes artificial intelligence?',
            options: [
              { id: 'a', text: 'Computer systems that can only follow explicit programming instructions', isCorrect: false },
              { id: 'b', text: 'Systems designed to perform tasks that typically require human intelligence', isCorrect: true },
              { id: 'c', text: 'Any digital technology created after the year 2000', isCorrect: false },
              { id: 'd', text: 'Computers that can exactly replicate human consciousness', isCorrect: false }
            ]
          }
        ]
      },
      {
        id: 'history',
        title: 'Brief History of AI',
        content: `The development of AI has seen several phases:

1. Early Beginnings (1950s-1960s): Following the Dartmouth Conference, there was optimism about quickly creating truly intelligent machines. Early successes in simple problem-solving programs and language translation led to high expectations.

2. First AI Winter (1970s-1980s): Initial enthusiasm gave way to disappointment when progress slowed due to limited computing power and data availability. Funding and interest decreased.

3. Expert Systems (1980s): A brief resurgence occurred with rule-based expert systems that could make decisions within narrow domains.

4. Second AI Winter (late 1980s-1990s): The limitations of expert systems became apparent, leading to another period of reduced funding and interest.

5. Modern AI Renaissance (2000s-present): Driven by increases in computing power, big data availability, and breakthroughs in machine learning algorithms, particularly deep learning. This has led to the current boom in AI applications.`,
        quizQuestions: [
          {
            id: 'ai-history-1',
            question: 'What contributed most to the modern AI renaissance?',
            options: [
              { id: 'a', text: 'Decreases in computing costs', isCorrect: false },
              { id: 'b', text: 'The invention of personal computers', isCorrect: false },
              { id: 'c', text: 'Increases in computing power, big data availability, and machine learning breakthroughs', isCorrect: true },
              { id: 'd', text: 'Government funding initiatives', isCorrect: false }
            ]
          }
        ]
      },
      {
        id: 'ai-vs-traditional',
        title: 'AI vs Traditional Computing',
        content: `AI differs from traditional computing in several fundamental ways:

Traditional Computing:
• Works based on explicit instructions (algorithms)
• Unable to handle unexpected inputs well
• Cannot improve without reprogramming
• Performs specific, well-defined tasks
• Rules are hard-coded by programmers

Artificial Intelligence:
• Can learn from data and experience
• Can handle novel situations and adapt
• Improves performance over time with more data
• Can perform complex, ambiguous tasks
• Can discover patterns and rules from data

For example, in traditional computing, recognizing a cat in an image would require programmers to define exactly what pixels constitute a cat. In AI, the system learns what a cat looks like by analyzing thousands of labeled images.`,
        quizQuestions: [
          {
            id: 'ai-vs-trad-1',
            question: 'What is a key difference between AI and traditional computing?',
            options: [
              { id: 'a', text: 'AI requires less computing power than traditional systems', isCorrect: false },
              { id: 'b', text: 'Traditional computing can learn from experience while AI cannot', isCorrect: false },
              { id: 'c', text: 'AI can learn from data and adapt while traditional systems follow explicit instructions', isCorrect: true },
              { id: 'd', text: 'AI systems never make mistakes while traditional systems do', isCorrect: false }
            ]
          }
        ]
      }
    ]
  },
  'types-of-ai': {
    id: 'types-of-ai',
    title: 'Types of AI Systems',
    description: 'Explore different types of AI, from narrow to general AI, and their characteristics.',
    estimatedTime: 30,
    moduleId: 'ai-basics',
    moduleTitle: 'AI Basics',
    trackId: 'ai-foundations',
    sections: [
      {
        id: 'narrow-ai',
        title: 'Narrow AI (Weak AI)',
        content: `Narrow AI, also known as Weak AI, refers to AI systems designed to perform specific tasks within a limited domain. These systems excel at their designated functions but cannot transfer their abilities to other tasks or domains.

Characteristics of Narrow AI:
• Specialized for a single task or narrow domain
• Cannot function outside its programmed parameters
• No self-awareness or consciousness
• Most AI systems today are narrow AI

Examples include:
• Virtual assistants (Siri, Alexa)
• Image recognition systems
• Recommendation algorithms (Netflix, Amazon)
• Spam filters
• Autonomous vehicles (for specific driving tasks)

Narrow AI can often outperform humans in its specific domain but lacks the versatility of human intelligence.`,
        quizQuestions: [
          {
            id: 'narrow-ai-1',
            question: 'Which of the following is a characteristic of Narrow AI?',
            options: [
              { id: 'a', text: 'Can perform any intellectual task that a human can', isCorrect: false },
              { id: 'b', text: 'Specialized for a single task or narrow domain', isCorrect: true },
              { id: 'c', text: 'Possesses self-awareness', isCorrect: false },
              { id: 'd', text: 'Can transfer knowledge between unrelated domains', isCorrect: false }
            ]
          }
        ]
      },
      {
        id: 'general-ai',
        title: 'General AI (Strong AI)',
        content: `General AI, also known as Strong AI or Artificial General Intelligence (AGI), refers to hypothetical AI systems that possess the ability to understand, learn, and apply intelligence across a wide range of tasks at a level equal to or exceeding human capabilities.

Characteristics of General AI:
• Broad human-like intelligence across domains
• Ability to transfer knowledge between different tasks
• Problem-solving capabilities in unfamiliar situations
• May include consciousness, self-awareness, and sentience (though this is debated)

Current Status:
• General AI does not yet exist
• Many experts believe we are decades away from creating it
• Significant philosophical and technical challenges remain

The development of General AI raises important ethical considerations about control, purpose, and the relationship between humans and machines.`,
        quizQuestions: [
          {
            id: 'general-ai-1',
            question: 'What is the current status of General AI (AGI)?',
            options: [
              { id: 'a', text: 'It has been successfully created but is not widely available', isCorrect: false },
              { id: 'b', text: 'It exists only in limited research settings', isCorrect: false },
              { id: 'c', text: 'It does not yet exist and is likely decades away', isCorrect: true },
              { id: 'd', text: 'It was achieved in 2020 but has been kept secret', isCorrect: false }
            ]
          }
        ]
      },
      {
        id: 'super-ai',
        title: 'Superintelligent AI',
        content: `Superintelligent AI refers to hypothetical AI systems that would surpass human intelligence and capabilities across virtually all domains of interest.

Characteristics of Superintelligent AI:
• Intelligence far exceeding the best human minds
• Ability to improve itself recursively (potentially leading to an "intelligence explosion")
• May develop novel ways of thinking beyond human comprehension
• Could solve problems currently unsolvable by humans

Current Status:
• Purely theoretical at this stage
• Some experts consider it a possible future development if AGI is achieved
• Others question whether it's possible or if there are fundamental limits to artificial intelligence

Ethical and Safety Concerns:
• Control problem: ensuring superintelligent systems remain aligned with human values
• Existential risk: potential threat to humanity if goals are misaligned
• Distribution of benefits: who would control such powerful technology

The concept of superintelligence is prominent in both academic AI safety research and science fiction, though actual development remains speculative.`,
        quizQuestions: [
          {
            id: 'super-ai-1',
            question: 'What key concern is associated with superintelligent AI?',
            options: [
              { id: 'a', text: 'It would be too expensive to develop', isCorrect: false },
              { id: 'b', text: 'The "control problem" of ensuring alignment with human values', isCorrect: true },
              { id: 'c', text: 'It would require too much electricity to operate', isCorrect: false },
              { id: 'd', text: 'It would be too difficult for average users to operate', isCorrect: false }
            ]
          }
        ]
      }
    ]
  },
  'ai-capabilities': {
    id: 'ai-capabilities',
    title: 'AI Capabilities and Limitations',
    description: 'Learn what current AI systems can and cannot do, and where the technology is heading.',
    estimatedTime: 35,
    moduleId: 'ai-basics',
    moduleTitle: 'AI Basics',
    trackId: 'ai-foundations',
    sections: [
      {
        id: 'current-capabilities',
        title: 'Current AI Capabilities',
        content: `Modern AI systems have demonstrated impressive capabilities across various domains:

1. Natural Language Processing
• Understanding and generating human language
• Translation between languages
• Answering questions and holding conversations
• Summarizing and generating text content

2. Computer Vision
• Image recognition and classification
• Object detection and tracking
• Facial recognition
• Scene interpretation

3. Pattern Recognition
• Identifying trends in large datasets
• Anomaly detection
• Predictive analytics
• Recommendation systems

4. Decision Making
• Game playing (Chess, Go, video games)
• Resource allocation
• Risk assessment
• Medical diagnosis support`,
        quizQuestions: [
          {
            id: 'capabilities-1',
            question: 'Which of the following is a demonstrated capability of modern AI systems?',
            options: [
              { id: 'a', text: 'True consciousness and self-awareness', isCorrect: false },
              { id: 'b', text: 'Understanding and generating human language', isCorrect: true },
              { id: 'c', text: 'Feeling emotions', isCorrect: false },
              { id: 'd', text: 'Having moral judgment equivalent to humans', isCorrect: false }
            ]
          }
        ]
      },
      {
        id: 'limitations',
        title: 'Current Limitations',
        content: `Despite their impressive capabilities, current AI systems face significant limitations:

1. Lack of Common Sense
• Difficulty with basic reasoning that humans find intuitive
• Missing understanding of cause and effect
• Limited world knowledge outside of training data

2. Brittleness
• Performance degrades in unfamiliar situations
• Vulnerability to adversarial attacks
• Often fails in unexpected ways

3. Data Dependency
• Requires large amounts of clean, labeled data
• Performance tied to training data quality
• Can perpetuate or amplify biases in training data

4. Explainability Issues
• "Black box" nature makes decisions difficult to understand
• Challenging to audit and verify
• Difficult to trust in critical applications

5. Narrow Application
• Systems excel in specific domains but lack general intelligence
• Cannot transfer knowledge between unrelated tasks
• No understanding of their own limitations`,
        quizQuestions: [
          {
            id: 'limitations-1',
            question: 'What is a significant limitation of current AI systems?',
            options: [
              { id: 'a', text: 'They consume too much electricity', isCorrect: false },
              { id: 'b', text: 'They are too slow at processing information', isCorrect: false },
              { id: 'c', text: 'They lack common sense and intuitive reasoning', isCorrect: true },
              { id: 'd', text: 'They are too expensive to develop', isCorrect: false }
            ]
          }
        ]
      },
      {
        id: 'future-directions',
        title: 'Future Directions',
        content: `AI research is advancing rapidly, with several key areas of development:

1. Multimodal Learning
• Systems that can process and integrate multiple types of data (text, images, audio)
• Better representation of the world through diverse inputs
• More natural human-computer interaction

2. Few-shot and Zero-shot Learning
• Learning from fewer examples
• Generalizing to new tasks with minimal or no specific training
• More efficient learning processes

3. Explainable AI
• Methods to understand AI decision-making
• Transparent systems that can justify their outputs
• Building trust through interpretability

4. AI Safety and Alignment
• Ensuring AI systems act according to human values
• Preventing unintended consequences
• Robust performance even in edge cases

5. Energy Efficiency
• Reducing computational requirements
• More environmentally sustainable AI
• Making advanced AI more accessible`,
        quizQuestions: [
          {
            id: 'future-1',
            question: 'Which of the following is an important future direction for AI development?',
            options: [
              { id: 'a', text: 'Creating completely autonomous AI with no human oversight', isCorrect: false },
              { id: 'b', text: 'Developing explainable AI that can justify its outputs', isCorrect: true },
              { id: 'c', text: 'Focusing exclusively on specialized applications', isCorrect: false },
              { id: 'd', text: 'Abandoning neural network approaches entirely', isCorrect: false }
            ]
          }
        ]
      }
    ]
  }
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Safely get the lesson data with error handling
  const lessonData = LESSON_DATA[lessonId as keyof typeof LESSON_DATA];
  
  useEffect(() => {
    if (!lessonId) {
      setError("No lesson ID provided");
      setLoading(false);
      return;
    }
    
    if (!lessonData) {
      setError(`Lesson with ID "${lessonId}" not found`);
      setLoading(false);
      return;
    }
    
    // Verify that the lesson data has all required fields
    if (!lessonData.sections || !Array.isArray(lessonData.sections) || lessonData.sections.length === 0) {
      setError("Lesson data is missing required sections");
      setLoading(false);
      return;
    }
    
    setLoading(false);
  }, [lessonId, lessonData]);
  
  // Handle lesson completion
  const handleLessonComplete = () => {
    try {
      // Update progress in local storage
      updateLessonProgress(
        lessonData.trackId,
        lessonData.moduleId,
        lessonId,
        100,
        true
      );
      
      // Navigate back to the module page
      router.push(`/modules/${lessonData.moduleId}`);
    } catch (err) {
      console.error("Error completing lesson:", err);
      setError("Failed to complete lesson. Please try again.");
    }
  };
  
  // Show loading state
  if (loading) {
    return (
      <Container maxW="container.lg" py={10}>
        <Text color="white">Loading lesson...</Text>
      </Container>
    );
  }
  
  // Show error state
  if (error || !lessonData) {
    return (
      <Container maxW="container.lg" py={10}>
        <Heading color="white" mb={4}>Error Loading Lesson</Heading>
        <Text color="red.400">{error || "Unknown error occurred"}</Text>
        <Button 
          as={NextLink}
          href="/dashboard"
          colorScheme="primary"
          mt={6}
        >
          Return to Dashboard
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxW="container.lg" py={10}>
      <Flex mb={8}>
        <Button
          as={NextLink}
          href={`/modules/${lessonData.moduleId}`}
          variant="ghost"
          leftIcon={<FiArrowLeft />}
          color="primary.300"
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
    </Container>
  );
} 