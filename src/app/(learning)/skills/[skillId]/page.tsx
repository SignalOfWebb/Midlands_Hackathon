import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, CheckIcon } from 'lucide-react';
import Link from 'next/link';

interface SkillPageProps {
  params: {
    skillId: string;
  };
}

// Mock data (would come from API/database in real app)
const skills = {
  '1': {
    title: 'AI Basics',
    description: 'Learn the foundations of artificial intelligence',
    progress: 75,
    lessons: [
      { id: 'speak-1', title: 'What is AI?', completed: true },
      { id: 'translate-1', title: 'Types of AI Systems', completed: true },
      { id: 'speak-2', title: 'AI Capabilities', completed: false },
      { id: 'translate-2', title: 'AI Limitations', completed: false },
    ],
  },
  // Add more skills as needed
};

export default function SkillPage({ params }: SkillPageProps) {
  const { skillId } = params;
  const skill = skills[skillId as keyof typeof skills];
  
  if (!skill) {
    return <div>Skill not found</div>;
  }
  
  return (
    <div className="min-h-screen bg-background pt-4">
      <div className="container px-4 mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{skill.title}</h1>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm">{skill.progress}%</span>
          </div>
          <Progress value={skill.progress} className="h-2 bg-muted" />
        </div>
        
        <div className="space-y-4">
          {skill.lessons.map((lesson, index) => (
            <Card key={lesson.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`
                    rounded-full w-10 h-10 flex items-center justify-center
                    ${lesson.completed 
                      ? 'bg-success/20 text-success' 
                      : 'bg-primary/20 text-primary'}
                  `}>
                    {lesson.completed 
                      ? <CheckIcon className="h-5 w-5" /> 
                      : <BookOpen className="h-5 w-5" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-medium">{lesson.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Lesson {index + 1}
                    </div>
                  </div>
                  
                  <Link href={`/lessons/${lesson.id}`}>
                    <Button variant={lesson.completed ? "outline" : "default"} size="sm">
                      {lesson.completed ? 'Review' : 'Start'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 