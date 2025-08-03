export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  age: number;
  weight: number; // in kg
  height: number; // in cm
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  completedExercises: string[];
  streakDays: number;
  totalCaloriesBurned: number;
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  difficulty: 'simple' | 'moderate' | 'hard';
  description: string;
  instructions: string[];
  targetMuscles: string[];
  duration: number; // in minutes
  caloriesPerMinute: number;
  imageUrl: string;
  reps?: number;
  sets?: number;
}

export interface WorkoutPlan {
  id: string;
  userId: string;
  name: string;
  exercises: string[]; // exercise IDs
  createdAt: string;
  completedAt?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'completedExercises' | 'streakDays' | 'totalCaloriesBurned' | 'createdAt'>) => Promise<boolean>;
  logout: () => void;
  updateUserProgress: (exerciseId: string, caloriesBurned: number) => void;
}