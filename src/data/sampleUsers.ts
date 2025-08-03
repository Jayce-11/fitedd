import { User, Exercise } from '../types';

export const sampleUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@student.edu',
    password: 'password123',
    name: 'John Doe',
    age: 20,
    weight: 70,
    height: 175,
    fitnessLevel: 'beginner',
    completedExercises: ['1', '3', '5'],
    streakDays: 5,
    totalCaloriesBurned: 450,
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: '2',
    email: 'sarah.wilson@student.edu',
    password: 'password123',
    name: 'Sarah Wilson',
    age: 19,
    weight: 58,
    height: 165,
    fitnessLevel: 'intermediate',
    completedExercises: ['2', '4', '6', '8', '10'],
    streakDays: 12,
    totalCaloriesBurned: 780,
    createdAt: '2024-01-10T09:30:00Z'
  },
  {
    id: '3',
    email: 'mike.chen@student.edu',
    password: 'password123',
    name: 'Mike Chen',
    age: 22,
    weight: 80,
    height: 180,
    fitnessLevel: 'advanced',
    completedExercises: ['7', '9', '11', '12', '13', '14', '15'],
    streakDays: 8,
    totalCaloriesBurned: 1250,
    createdAt: '2024-01-08T07:15:00Z'
  }
];

export const exerciseDatabase: Exercise[] = [
  {
    id: '1',
    name: 'Push-ups',
    category: 'Upper Body',
    difficulty: 'simple',
    description: 'Classic bodyweight exercise targeting chest, shoulders, and triceps',
    instructions: [
      'Start in plank position with hands slightly wider than shoulders',
      'Lower your body until chest nearly touches the ground',
      'Push back up to starting position',
      'Keep your core tight throughout the movement'
    ],
    targetMuscles: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    duration: 5,
    caloriesPerMinute: 8,
    imageUrl: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg',
    reps: 10,
    sets: 3
  },
  {
    id: '2',
    name: 'Bodyweight Squats',
    category: 'Lower Body',
    difficulty: 'simple',
    description: 'Fundamental lower body exercise for building leg strength',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body by bending knees and pushing hips back',
      'Keep your chest up and weight on your heels',
      'Return to starting position by pushing through heels'
    ],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    duration: 5,
    caloriesPerMinute: 6,
    imageUrl: 'https://images.pexels.com/photos/4162478/pexels-photo-4162478.jpeg',
    reps: 15,
    sets: 3
  },
  {
    id: '3',
    name: 'Plank',
    category: 'Core',
    difficulty: 'simple',
    description: 'Isometric core exercise for building stability and strength',
    instructions: [
      'Start in push-up position',
      'Lower onto forearms, keeping elbows under shoulders',
      'Keep body in straight line from head to heels',
      'Hold position while breathing normally'
    ],
    targetMuscles: ['Core', 'Shoulders', 'Back'],
    duration: 3,
    caloriesPerMinute: 5,
    imageUrl: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg',
    reps: 1,
    sets: 3
  },
  {
    id: '4',
    name: 'Mountain Climbers',
    category: 'Cardio',
    difficulty: 'moderate',
    description: 'High-intensity cardio exercise that works the whole body',
    instructions: [
      'Start in plank position',
      'Bring right knee toward chest',
      'Quickly switch legs, bringing left knee to chest',
      'Continue alternating legs at a rapid pace'
    ],
    targetMuscles: ['Core', 'Shoulders', 'Legs', 'Cardiovascular'],
    duration: 4,
    caloriesPerMinute: 12,
    imageUrl: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg',
    reps: 20,
    sets: 3
  },
  {
    id: '5',
    name: 'Jumping Jacks',
    category: 'Cardio',
    difficulty: 'simple',
    description: 'Full-body cardio exercise to get your heart pumping',
    instructions: [
      'Stand with feet together and arms at sides',
      'Jump while spreading legs shoulder-width apart',
      'Simultaneously raise arms overhead',
      'Jump back to starting position'
    ],
    targetMuscles: ['Full Body', 'Cardiovascular'],
    duration: 3,
    caloriesPerMinute: 10,
    imageUrl: 'https://images.pexels.com/photos/4162515/pexels-photo-4162515.jpeg',
    reps: 20,
    sets: 3
  },
  {
    id: '6',
    name: 'Burpees',
    category: 'Full Body',
    difficulty: 'moderate',
    description: 'Intense full-body exercise combining strength and cardio',
    instructions: [
      'Start standing, then squat down and place hands on floor',
      'Jump feet back into plank position',
      'Do a push-up (optional)',
      'Jump feet back to squat position',
      'Jump up with arms overhead'
    ],
    targetMuscles: ['Full Body', 'Cardiovascular'],
    duration: 5,
    caloriesPerMinute: 15,
    imageUrl: 'https://images.pexels.com/photos/4164771/pexels-photo-4164771.jpeg',
    reps: 8,
    sets: 3
  },
  {
    id: '7',
    name: 'Pull-ups',
    category: 'Upper Body',
    difficulty: 'hard',
    description: 'Advanced upper body exercise requiring significant strength',
    instructions: [
      'Hang from pull-up bar with palms facing away',
      'Pull your body up until chin clears the bar',
      'Lower yourself back down with control',
      'Keep core engaged throughout movement'
    ],
    targetMuscles: ['Back', 'Biceps', 'Shoulders', 'Core'],
    duration: 4,
    caloriesPerMinute: 10,
    imageUrl: 'https://images.pexels.com/photos/4164566/pexels-photo-4164566.jpeg',
    reps: 5,
    sets: 3
  },
  {
    id: '8',
    name: 'Lunges',
    category: 'Lower Body',
    difficulty: 'moderate',
    description: 'Unilateral leg exercise for building strength and balance',
    instructions: [
      'Stand with feet hip-width apart',
      'Step forward with one leg, lowering hips',
      'Lower until both knees are at 90-degree angles',
      'Push back to starting position and repeat on other leg'
    ],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    duration: 4,
    caloriesPerMinute: 7,
    imageUrl: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg',
    reps: 12,
    sets: 3
  },
  {
    id: '9',
    name: 'Handstand Push-ups',
    category: 'Upper Body',
    difficulty: 'hard',
    description: 'Advanced bodyweight exercise requiring significant upper body strength',
    instructions: [
      'Start in handstand position against wall',
      'Lower head toward ground with control',
      'Push back up to starting position',
      'Maintain straight body line throughout'
    ],
    targetMuscles: ['Shoulders', 'Triceps', 'Upper Back', 'Core'],
    duration: 3,
    caloriesPerMinute: 12,
    imageUrl: 'https://images.pexels.com/photos/4164772/pexels-photo-4164772.jpeg',
    reps: 3,
    sets: 3
  },
  {
    id: '10',
    name: 'Pike Push-ups',
    category: 'Upper Body',
    difficulty: 'moderate',
    description: 'Shoulder-focused variation of push-ups',
    instructions: [
      'Start in downward dog position',
      'Lower head toward ground between hands',
      'Push back up to starting position',
      'Keep hips high throughout movement'
    ],
    targetMuscles: ['Shoulders', 'Triceps', 'Upper Back'],
    duration: 4,
    caloriesPerMinute: 9,
    imageUrl: 'https://images.pexels.com/photos/4162632/pexels-photo-4162632.jpeg',
    reps: 8,
    sets: 3
  },
  {
    id: '11',
    name: 'Single-Leg Squats (Pistol Squats)',
    category: 'Lower Body',
    difficulty: 'hard',
    description: 'Advanced unilateral leg exercise requiring strength and balance',
    instructions: [
      'Stand on one leg with other leg extended forward',
      'Lower body by bending standing leg',
      'Keep extended leg straight and off ground',
      'Push back up to starting position'
    ],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    duration: 5,
    caloriesPerMinute: 11,
    imageUrl: 'https://images.pexels.com/photos/4162640/pexels-photo-4162640.jpeg',
    reps: 5,
    sets: 3
  },
  {
    id: '12',
    name: 'Diamond Push-ups',
    category: 'Upper Body',
    difficulty: 'hard',
    description: 'Advanced push-up variation targeting triceps',
    instructions: [
      'Start in push-up position with hands in diamond shape',
      'Keep thumbs and index fingers touching',
      'Lower body until chest touches hands',
      'Push back up to starting position'
    ],
    targetMuscles: ['Triceps', 'Chest', 'Shoulders', 'Core'],
    duration: 4,
    caloriesPerMinute: 10,
    imageUrl: 'https://images.pexels.com/photos/4164595/pexels-photo-4164595.jpeg',
    reps: 6,
    sets: 3
  },
  {
    id: '13',
    name: 'L-Sit',
    category: 'Core',
    difficulty: 'hard',
    description: 'Advanced isometric core exercise',
    instructions: [
      'Sit with legs extended and hands on ground beside hips',
      'Press hands down and lift entire body off ground',
      'Keep legs straight and parallel to ground',
      'Hold position while breathing'
    ],
    targetMuscles: ['Core', 'Hip Flexors', 'Shoulders', 'Triceps'],
    duration: 2,
    caloriesPerMinute: 8,
    imageUrl: 'https://images.pexels.com/photos/4164651/pexels-photo-4164651.jpeg',
    reps: 1,
    sets: 5
  },
  {
    id: '14',
    name: 'Hindu Push-ups',
    category: 'Full Body',
    difficulty: 'hard',
    description: 'Dynamic full-body movement combining strength and flexibility',
    instructions: [
      'Start in downward dog position',
      'Dive forward, lowering chest toward ground',
      'Scoop up into upward dog position',
      'Return to downward dog by reversing the movement'
    ],
    targetMuscles: ['Full Body', 'Flexibility'],
    duration: 5,
    caloriesPerMinute: 13,
    imageUrl: 'https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg',
    reps: 8,
    sets: 3
  },
  {
    id: '15',
    name: 'Archer Push-ups',
    category: 'Upper Body',
    difficulty: 'hard',
    description: 'Unilateral push-up variation for advanced practitioners',
    instructions: [
      'Start in wide push-up position',
      'Lower body while shifting weight to one arm',
      'Keep other arm straight and extended',
      'Push back up and repeat on other side'
    ],
    targetMuscles: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    duration: 4,
    caloriesPerMinute: 11,
    imageUrl: 'https://images.pexels.com/photos/4164770/pexels-photo-4164770.jpeg',
    reps: 4,
    sets: 3
  }
];