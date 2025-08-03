import React, { useState } from 'react';
import { Exercise } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Clock, Flame, Target, CheckCircle, Play, Trophy, Share2, Bookmark } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const { user, updateUserProgress } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const isExerciseCompleted = user?.completedExercises.includes(exercise.id) || isCompleted;
  const caloriesBurned = Math.round(exercise.caloriesPerMinute * exercise.duration);

  const handleComplete = () => {
    if (!isExerciseCompleted) {
      setIsCompleted(true);
      updateUserProgress(exercise.id, caloriesBurned);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'simple': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${exercise.name} - FitEd Exercise`,
          text: `Check out this ${exercise.difficulty} ${exercise.category.toLowerCase()} exercise: ${exercise.name}. Burns ${caloriesBurned} calories in ${exercise.duration} minutes!`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      const text = `Check out this ${exercise.difficulty} ${exercise.category.toLowerCase()} exercise: ${exercise.name}. Burns ${caloriesBurned} calories in ${exercise.duration} minutes! Try it on FitEd: ${window.location.origin}`;
      navigator.clipboard.writeText(text);
      alert('Exercise details copied to clipboard!');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      {/* Exercise Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={exercise.imageUrl} 
          alt={exercise.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(exercise.difficulty)}`}>
            {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
          </span>
        </div>
        {isExerciseCompleted && (
          <div className="absolute top-3 right-3 bg-green-500 rounded-full p-2">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      {/* Exercise Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{exercise.name}</h3>
            <p className="text-sm text-gray-600">{exercise.category}</p>
          </div>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-2">{exercise.description}</p>

        {/* Exercise Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-blue-600 mr-1" />
            </div>
            <p className="text-sm font-semibold text-gray-900">{exercise.duration} min</p>
            <p className="text-xs text-gray-600">Duration</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Flame className="w-4 h-4 text-orange-600 mr-1" />
            </div>
            <p className="text-sm font-semibold text-gray-900">{caloriesBurned}</p>
            <p className="text-xs text-gray-600">Calories</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Target className="w-4 h-4 text-green-600 mr-1" />
            </div>
            <p className="text-sm font-semibold text-gray-900">{exercise.reps}x{exercise.sets}</p>
            <p className="text-xs text-gray-600">Reps/Sets</p>
          </div>
        </div>

        {/* Target Muscles */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Target Muscles:</p>
          <div className="flex flex-wrap gap-2">
            {exercise.targetMuscles.map((muscle, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                {muscle}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            <Play className="w-4 h-4" />
            <span>Details</span>
          </button>
          <button
            onClick={handleShare}
            className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            title="Share Exercise"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`px-3 py-2 rounded-lg transition-colors ${
              isFavorited 
                ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
            title="Bookmark Exercise"
          >
            <Bookmark className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleComplete}
            disabled={isExerciseCompleted}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition-colors text-sm ${
              isExerciseCompleted
                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isExerciseCompleted ? (
              <>
                <Trophy className="w-4 h-4" />
                <span>Done</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Complete</span>
              </>
            )}
          </button>
        </div>

        {/* Exercise Instructions */}
        {showDetails && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Instructions:</h4>
            <ol className="space-y-2 text-sm text-gray-700">
              {exercise.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="font-medium text-blue-600 mr-2">{index + 1}.</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseCard;