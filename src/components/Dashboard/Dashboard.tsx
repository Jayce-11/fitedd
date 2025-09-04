import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Calendar, Flame, Target, TrendingUp, LogOut, Dumbbell, List, User, Download, Share2, Brain, Calculator, Moon, Sun, BarChart3 } from 'lucide-react';
import ExerciseLibrary from '../Exercise/ExerciseLibrary';
import UserProfile from './UserProfile';
import MentalHealthPage from '../MentalHealth/MentalHealthPage';
import BMICalculator from '../BMI/BMICalculator';
import AnalyticsPage from '../Analytics/AnalyticsPage';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'exercises' | 'profile' | 'mental-health' | 'bmi-calculator' | 'analytics'>('dashboard');

  if (!user) return null;

  const completionRate = user.completedExercises.length > 0 
    ? Math.round((user.completedExercises.length / 15) * 100) 
    : 0;

  const handleShareProgress = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FitEd - My Fitness Progress',
          text: `I've completed ${user.completedExercises.length} exercises and burned ${user.totalCaloriesBurned} calories on FitEd!`,
          url: window.location.origin
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `I've completed ${user.completedExercises.length} exercises and burned ${user.totalCaloriesBurned} calories on FitEd! Check it out at ${window.location.origin}`;
      navigator.clipboard.writeText(text);
      alert('Progress copied to clipboard!');
    }
  };

  const handleInstallApp = () => {
    // This would be enhanced with actual PWA install prompt
    alert('To install FitEd as a web app, use your browser\'s "Add to Home Screen" or "Install App" option in the menu!');
  };
  const renderContent = () => {
    switch (activeTab) {
      case 'exercises':
        return <ExerciseLibrary />;
      case 'profile':
        return <UserProfile />;
      case 'mental-health':
        return <MentalHealthPage />;
      case 'bmi-calculator':
        return <BMICalculator />;
      case 'analytics':
        return <AnalyticsPage />;
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white dark:from-blue-700 dark:to-purple-700">
              <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <p className="opacity-90">Ready to crush your fitness goals today?</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Streak</p>
                    <p className="text-2xl font-bold text-orange-600">{user.streakDays} days</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Flame className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Calories</p>
                    <p className="text-2xl font-bold text-green-600">{user.totalCaloriesBurned}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Exercises Done</p>
                    <p className="text-2xl font-bold text-blue-600">{user.completedExercises.length}/15</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Your Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Exercise Completion</span>
                    <span className="text-sm font-bold text-blue-600">{completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Fitness Level</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.fitnessLevel === 'beginner' ? 'bg-green-100 text-green-800' :
                        user.fitnessLevel === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.fitnessLevel.charAt(0).toUpperCase() + user.fitnessLevel.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Member Since</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <button
                  onClick={() => setActiveTab('exercises')}
                  className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <Dumbbell className="w-6 h-6 text-blue-600" />
                  <span className="font-medium text-blue-900 dark:text-blue-300">Browse Exercises</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                  <User className="w-6 h-6 text-green-600" />
                  <span className="font-medium text-green-900 dark:text-green-300">View Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('mental-health')}
                  className="flex items-center space-x-3 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors"
                >
                  <Brain className="w-6 h-6 text-pink-600" />
                  <span className="font-medium text-pink-900 dark:text-pink-300">Mental Wellness</span>
                </button>
                <button
                  onClick={() => setActiveTab('bmi-calculator')}
                  className="flex items-center space-x-3 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                >
                  <Calculator className="w-6 h-6 text-indigo-600" />
                  <span className="font-medium text-indigo-900 dark:text-indigo-300">BMI Calculator</span>
                </button>
                <button
                  onClick={handleShareProgress}
                  className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                >
                  <Share2 className="w-6 h-6 text-purple-600" />
                  <span className="font-medium text-purple-900 dark:text-purple-300">Share Progress</span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className="flex items-center space-x-3 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                >
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                  <span className="font-medium text-indigo-900 dark:text-indigo-300">View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">FitEd</span>
              </div>
              
              <div className="hidden md:flex space-x-4">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'dashboard' 
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('exercises')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'exercises' 
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Exercises
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('mental-health')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'mental-health' 
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Mental Health
                </button>
                <button
                  onClick={() => setActiveTab('bmi-calculator')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'bmi-calculator' 
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  BMI Calculator
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'analytics' 
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Analytics
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t dark:border-gray-700">
          <div className="flex space-x-1 p-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'dashboard' 
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'exercises' 
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <List className="w-4 h-4" />
              <span>Exercises</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'profile' 
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('mental-health')}
              className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'mental-health' 
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>Wellness</span>
            </button>
            <button
              onClick={() => setActiveTab('bmi-calculator')}
              className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'bmi-calculator' 
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>BMI</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'analytics' 
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;