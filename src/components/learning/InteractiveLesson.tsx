'use client';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Mic as MicrophoneIcon, Volume2 as VolumeUpIcon } from 'lucide-react';
import { useState } from 'react';

interface InteractiveLessonProps {
  lessonType: 'translate' | 'speak' | 'match' | 'multipleChoice';
  question: string;
  options?: string[];
  correctAnswer: string;
  audioUrl?: string;
}

export function InteractiveLesson({
  lessonType,
  question,
  options = [],
  correctAnswer,
  audioUrl
}: InteractiveLessonProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [progressValue, setProgressValue] = useState(50);
  const [hearts, setHearts] = useState(5);

  const handleCheckAnswer = () => {
    const correct = selectedAnswer === correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setProgressValue(prev => Math.min(prev + 10, 100));
    } else {
      setHearts(prev => prev - 1);
    }
  };

  const handlePlayAudio = () => {
    // Audio playback logic would go here
    console.log('Playing audio:', audioUrl);
  };

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Header with progress and hearts */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <Progress value={progressValue} className="w-3/5 h-3 bg-zinc-800" />
        <div className="flex items-center">
          <span className="text-blue-400 mr-1">♥</span>
          <span className="text-white">{hearts}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-6 text-white">{lessonType === 'translate' ? 'Translate this sentence' : 'Speak this sentence'}</h2>
        
        {/* Question with audio button if available */}
        <div className="flex items-center mb-8 bg-zinc-900 p-4 rounded-lg">
          {audioUrl && (
            <Button
              variant="ghost"
              size="icon"
              className="mr-3 text-blue-400"
              onClick={handlePlayAudio}
            >
              <VolumeUpIcon />
            </Button>
          )}
          <span className="text-lg text-white">{question}</span>
        </div>
        
        {/* Character illustration (simplified) */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center">
            <span className="text-blue-400 text-2xl">👨‍💼</span>
          </div>
        </div>
        
        {/* Interaction area */}
        {lessonType === 'translate' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {options.map((option) => (
                <Button
                  key={option}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className={`
                    rounded-full px-4 py-2 text-sm
                    ${selectedAnswer === option ? 'bg-blue-400 text-black' : 'bg-zinc-800 text-zinc-400'}
                  `}
                  onClick={() => setSelectedAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {lessonType === 'speak' && (
          <Button
            className="w-full py-6 bg-blue-900/20 hover:bg-blue-900/30 text-blue-400 rounded-lg border border-blue-400/30"
            onClick={() => {/* Speak logic */}}
          >
            <MicrophoneIcon className="mr-2 h-5 w-5" />
            TAP TO SPEAK
          </Button>
        )}
      </div>

      {/* Bottom action button */}
      <div className="p-4 border-t border-zinc-800">
        <Button
          className="w-full py-6 rounded-xl bg-blue-400 text-black font-medium"
          onClick={handleCheckAnswer}
          disabled={!selectedAnswer && lessonType !== 'speak'}
        >
          {isCorrect === null ? 'CHECK' : 'CONTINUE'}
        </Button>
      </div>
    </div>
  );
} 