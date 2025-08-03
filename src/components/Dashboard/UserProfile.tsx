import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Calendar, Scale, Ruler, Trophy, Target, Flame } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const bmi = (user.weight / ((user.height / 100) ** 2)).toFixed(1);
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const bmiInfo = getBMICategory(parseFloat(bmi));

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="bg-white bg-opacity-20 p-4 rounded-full">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="opacity-90">Member since {new Date(user.createdAt).getFullYear()}</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-xl font-bold mb-6">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-medium">{user.age} years old</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Trophy className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Fitness Level</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  user.fitnessLevel === 'beginner' ? 'bg-green-100 text-green-800' :
                  user.fitnessLevel === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {user.fitnessLevel.charAt(0).toUpperCase() + user.fitnessLevel.slice(1)}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Scale className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Weight</p>
                <p className="font-medium">{user.weight} kg</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Ruler className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Height</p>
                <p className="font-medium">{user.height} cm</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">BMI</p>
                <p className={`font-medium ${bmiInfo.color}`}>
                  {bmi} ({bmiInfo.category})
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fitness Statistics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-xl font-bold mb-6">Fitness Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-3">
              <Flame className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{user.streakDays}</p>
            <p className="text-sm text-gray-600">Day Streak</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-3">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{user.totalCaloriesBurned}</p>
            <p className="text-sm text-gray-600">Calories Burned</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-3">
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{user.completedExercises.length}</p>
            <p className="text-sm text-gray-600">Exercises Completed</p>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-xl font-bold mb-6">Weekly Progress</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Exercise Completion Rate</span>
            <span className="text-sm font-bold text-blue-600">
              {Math.round((user.completedExercises.length / 15) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.round((user.completedExercises.length / 15) * 100)}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-7 gap-2 mt-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="text-center">
                <div className={`w-8 h-8 rounded-full mx-auto mb-1 ${
                  index < user.streakDays % 7 ? 'bg-green-500' : 'bg-gray-200'
                }`}></div>
                <p className="text-xs text-gray-600">{day}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Health Recommendations */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-xl font-bold mb-4">Health Recommendations</h2>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-1">Daily Calorie Goal</h3>
            <p className="text-sm text-blue-700">
              Based on your profile, aim to burn 200-300 calories daily through exercise.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-1">Workout Frequency</h3>
            <p className="text-sm text-green-700">
              Try to complete 4-5 exercises per week to maintain your current fitness level.
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-1">Recovery</h3>
            <p className="text-sm text-purple-700">
              Don't forget to rest! Take 1-2 days off per week for proper muscle recovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;