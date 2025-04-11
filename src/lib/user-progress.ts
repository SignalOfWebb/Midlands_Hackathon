// User progress tracking service
// In a real application, this would connect to a backend API
// For demo purposes, we're using localStorage to persist progress

// Types for user progress tracking
export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  lastAccessed: string; // ISO date string
  progress: number; // 0-100
}

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  lastAccessed: string; // ISO date string
  progress: number; // 0-100
  lessons: Record<string, LessonProgress>;
}

export interface TrackProgress {
  trackId: string;
  completed: boolean;
  lastAccessed: string; // ISO date string
  progress: number; // 0-100
  modules: Record<string, ModuleProgress>;
}

export interface UserProgress {
  tracks: Record<string, TrackProgress>;
}

// Mock initial progress data for the AI Foundations track
const INITIAL_PROGRESS: UserProgress = {
  tracks: {
    'ai-foundations': {
      trackId: 'ai-foundations',
      completed: false,
      lastAccessed: new Date().toISOString(),
      progress: 45,
      modules: {
        'ai-basics': {
          moduleId: 'ai-basics',
          completed: true,
          lastAccessed: new Date().toISOString(),
          progress: 100,
          lessons: {
            'what-is-ai': {
              lessonId: 'what-is-ai',
              completed: true,
              lastAccessed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              progress: 100
            },
            'types-of-ai': {
              lessonId: 'types-of-ai',
              completed: true,
              lastAccessed: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
              progress: 100
            },
            'ai-capabilities': {
              lessonId: 'ai-capabilities',
              completed: true,
              lastAccessed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              progress: 100
            }
          }
        },
        'ai-in-public-sector': {
          moduleId: 'ai-in-public-sector',
          completed: false,
          lastAccessed: new Date().toISOString(),
          progress: 66,
          lessons: {
            'public-sector-use-cases': {
              lessonId: 'public-sector-use-cases',
              completed: true,
              lastAccessed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              progress: 100
            },
            'case-studies': {
              lessonId: 'case-studies',
              completed: true,
              lastAccessed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              progress: 100
            },
            'implementation-challenges': {
              lessonId: 'implementation-challenges',
              completed: false,
              lastAccessed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
              progress: 50
            }
          }
        },
        'responsible-ai': {
          moduleId: 'responsible-ai',
          completed: false,
          lastAccessed: new Date().toISOString(),
          progress: 0,
          lessons: {
            'ethics-principles': {
              lessonId: 'ethics-principles',
              completed: false,
              lastAccessed: '',
              progress: 0
            },
            'bias-fairness': {
              lessonId: 'bias-fairness',
              completed: false,
              lastAccessed: '',
              progress: 0
            },
            'governance-frameworks': {
              lessonId: 'governance-frameworks',
              completed: false,
              lastAccessed: '',
              progress: 0
            }
          }
        }
      }
    }
  }
};

// Helper functions to get and update user progress
export function getUserProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return INITIAL_PROGRESS;
  }
  
  const savedProgress = localStorage.getItem('userProgress');
  if (!savedProgress) {
    // Initialize with default progress on first use
    localStorage.setItem('userProgress', JSON.stringify(INITIAL_PROGRESS));
    return INITIAL_PROGRESS;
  }
  
  return JSON.parse(savedProgress);
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }
}

// Get the most recent lesson for a given track
export function getMostRecentLesson(trackId: string): { moduleId: string; lessonId: string } | null {
  const userProgress = getUserProgress();
  const track = userProgress.tracks[trackId];
  
  if (!track) {
    return null;
  }
  
  let mostRecentModule: ModuleProgress | null = null;
  let mostRecentLesson: LessonProgress | null = null;
  let mostRecentDate = new Date(0);
  
  // Find the most recently accessed lesson across all modules
  Object.values(track.modules).forEach(module => {
    Object.values(module.lessons).forEach(lesson => {
      if (lesson.lastAccessed) {
        const lessonDate = new Date(lesson.lastAccessed);
        if (lessonDate > mostRecentDate) {
          mostRecentDate = lessonDate;
          mostRecentModule = module;
          mostRecentLesson = lesson;
        }
      }
    });
  });
  
  if (mostRecentModule && mostRecentLesson) {
    return {
      moduleId: mostRecentModule.moduleId,
      lessonId: mostRecentLesson.lessonId
    };
  }
  
  // If no lesson has been accessed yet, return the first lesson of the first module
  const firstModule = Object.values(track.modules)[0];
  if (firstModule) {
    const firstLesson = Object.values(firstModule.lessons)[0];
    if (firstLesson) {
      return {
        moduleId: firstModule.moduleId,
        lessonId: firstLesson.lessonId
      };
    }
  }
  
  return null;
}

// Find the next incomplete lesson in a track
export function getNextIncompleteLesson(trackId: string): { moduleId: string; lessonId: string } | null {
  const userProgress = getUserProgress();
  const track = userProgress.tracks[trackId];
  
  if (!track) {
    return null;
  }
  
  // Iterate through modules and lessons to find the first incomplete lesson
  for (const moduleId of Object.keys(track.modules)) {
    const module = track.modules[moduleId];
    for (const lessonId of Object.keys(module.lessons)) {
      const lesson = module.lessons[lessonId];
      if (!lesson.completed) {
        return {
          moduleId,
          lessonId
        };
      }
    }
  }
  
  return null;
}

// Update lesson progress
export function updateLessonProgress(
  trackId: string,
  moduleId: string,
  lessonId: string,
  progress: number,
  completed: boolean = progress === 100
): void {
  const userProgress = getUserProgress();
  
  if (!userProgress.tracks[trackId]) {
    return;
  }
  
  if (!userProgress.tracks[trackId].modules[moduleId]) {
    return;
  }
  
  if (!userProgress.tracks[trackId].modules[moduleId].lessons[lessonId]) {
    return;
  }
  
  // Update the lesson progress
  userProgress.tracks[trackId].modules[moduleId].lessons[lessonId] = {
    ...userProgress.tracks[trackId].modules[moduleId].lessons[lessonId],
    progress,
    completed,
    lastAccessed: new Date().toISOString()
  };
  
  // Update module progress
  const module = userProgress.tracks[trackId].modules[moduleId];
  const lessons = Object.values(module.lessons);
  const totalLessons = lessons.length;
  const completedLessons = lessons.filter(l => l.completed).length;
  const moduleProgress = Math.round((completedLessons / totalLessons) * 100);
  
  userProgress.tracks[trackId].modules[moduleId] = {
    ...module,
    progress: moduleProgress,
    completed: moduleProgress === 100,
    lastAccessed: new Date().toISOString()
  };
  
  // Update track progress
  const modules = Object.values(userProgress.tracks[trackId].modules);
  const totalModules = modules.length;
  const completedModules = modules.filter(m => m.completed).length;
  const trackProgress = Math.round((completedModules / totalModules) * 100);
  
  userProgress.tracks[trackId] = {
    ...userProgress.tracks[trackId],
    progress: trackProgress,
    completed: trackProgress === 100,
    lastAccessed: new Date().toISOString()
  };
  
  saveUserProgress(userProgress);
} 