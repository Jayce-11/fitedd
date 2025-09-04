import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Target, 
  Flame, 
  Trophy, 
  Clock, 
  Activity,
  PieChart,
  LineChart,
  Download,
  Filter,
  RefreshCw,
  Zap,
  Heart,
  Award
} from 'lucide-react';
import { exerciseDatabase } from '../../data/sampleUsers';

const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [selectedMetric, setSelectedMetric] = useState<'calories' | 'exercises' | 'duration'>('calories');

  if (!user) return null;

  // Calculate analytics data
  const totalExercises = user.completedExercises.length;
  const averageCaloriesPerDay = Math.round(user.totalCaloriesBurned / Math.max(user.streakDays, 1));
  const completionRate = Math.round((totalExercises / exerciseDatabase.length) * 100);
  
  // Mock weekly data for charts
  const weeklyData = [
    { day: 'Mon', calories: 120, exercises: 2, duration: 15 },
    { day: 'Tue', calories: 180, exercises: 3, duration: 22 },
    { day: 'Wed', calories: 90, exercises: 1, duration: 12 },
    { day: 'Thu', calories: 200, exercises: 4, duration: 28 },
    { day: 'Fri', calories: 150, exercises: 2, duration: 18 },
    { day: 'Sat', calories: 220, exercises: 3, duration: 25 },
    { day: 'Sun', calories: 100, exercises: 1, duration: 10 }
  ];

  // Calculate category breakdown
  const categoryBreakdown = user.completedExercises.reduce((acc, exerciseId) => {
    const exercise = exerciseDatabase.find(e => e.id === exerciseId);
    if (exercise) {
      acc[exercise.category] = (acc[exercise.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const maxValue = Math.max(...weeklyData.map(d => d[selectedMetric]));

  const getMetricColor = () => {
    switch (selectedMetric) {
      case 'calories': return 'bg-orange-500';
      case 'exercises': return 'bg-blue-500';
      case 'duration': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'calories': return 'Calories Burned';
      case 'exercises': return 'Exercises Completed';
      case 'duration': return 'Minutes Exercised';
      default: return '';
    }
  };

  const exportData = () => {
    const data = {
      user: {
        name: user.name,
        totalCaloriesBurned: user.totalCaloriesBurned,
        completedExercises: user.completedExercises.length,
        streakDays: user.streakDays
      },
      weeklyData,
      categoryBreakdown,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fited-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 p-4 rounded-full">
              <BarChart3 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
              <p className="opacity-90">Track your fitness progress and insights</p>
            </div>
          </div>
          <button
            onClick={exportData}
            className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline">Export Data</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Calories</p>
              <p className="text-2xl font-bold text-orange-600">{user.totalCaloriesBurned}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">+{averageCaloriesPerDay}/day avg</p>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
              <Flame className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Exercises Done</p>
              <p className="text-2xl font-bold text-blue-600">{totalExercises}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">{completionRate}% complete</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Streak</p>
              <p className="text-2xl font-bold text-green-600">{user.streakDays}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">days in a row</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Session</p>
              <p className="text-2xl font-bold text-purple-600">18</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">minutes</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <LineChart className="w-6 h-6 text-indigo-600 mr-2" />
            Weekly Progress
          </h2>
          
          <div className="flex space-x-4">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="calories">Calories</option>
              <option value="exercises">Exercises</option>
              <option value="duration">Duration (min)</option>
            </select>
            
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{getMetricLabel()}</span>
            <span className="text-sm text-gray-500 dark:text-gray-500">
              Peak: {Math.max(...weeklyData.map(d => d[selectedMetric]))}
            </span>
          </div>
          
          <div className="flex items-end justify-between h-64 space-x-2">
            {weeklyData.map((data, index) => (
              <div key={data.day} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col justify-end h-48 mb-2">
                  <div
                    className={`w-full ${getMetricColor()} rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer relative group`}
                    style={{ height: `${(data[selectedMetric] / maxValue) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {data[selectedMetric]}
                    </div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{data.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Breakdown & Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
            <PieChart className="w-6 h-6 text-green-600 mr-2" />
            Exercise Categories
          </h2>
          
          <div className="space-y-4">
            {Object.entries(categoryBreakdown).map(([category, count], index) => {
              const percentage = Math.round((count / totalExercises) * 100);
              const colors = [
                'bg-blue-500',
                'bg-green-500', 
                'bg-purple-500',
                'bg-orange-500',
                'bg-pink-500',
                'bg-indigo-500'
              ];
              
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{count} exercises ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`${colors[index % colors.length]} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
            <Activity className="w-6 h-6 text-purple-600 mr-2" />
            Performance Insights
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 p-2 rounded-full">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-300">Consistency Streak</h3>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    You're on a {user.streakDays}-day streak! Keep it up!
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 p-2 rounded-full">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300">Goal Progress</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {completionRate}% of exercises completed
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500 p-2 rounded-full">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900 dark:text-purple-300">Fitness Level</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    {user.fitnessLevel.charAt(0).toUpperCase() + user.fitnessLevel.slice(1)} level maintained
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
          <Trophy className="w-6 h-6 text-yellow-600 mr-2" />
          Detailed Statistics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
            <div className="bg-orange-100 dark:bg-orange-900/50 p-3 rounded-full w-fit mx-auto mb-3">
              <Flame className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{averageCaloriesPerDay}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Calories/Day</p>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full w-fit mx-auto mb-3">
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{Math.round(totalExercises / Math.max(user.streakDays, 1) * 7)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Exercises/Week</p>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
            <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full w-fit mx-auto mb-3">
              <Heart className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{Math.round(user.totalCaloriesBurned / totalExercises) || 0}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Calories/Exercise</p>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-full w-fit mx-auto mb-3">
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{Math.round((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Days Active</p>
          </div>
        </div>
      </div>

      {/* Progress Trends */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
          <TrendingUp className="w-6 h-6 text-indigo-600 mr-2" />
          Progress Trends
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Difficulty Distribution */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Exercise Difficulty Distribution</h3>
            <div className="space-y-3">
              {['simple', 'moderate', 'hard'].map((difficulty) => {
                const count = user.completedExercises.filter(id => {
                  const exercise = exerciseDatabase.find(e => e.id === id);
                  return exercise?.difficulty === difficulty;
                }).length;
                const percentage = totalExercises > 0 ? Math.round((count / totalExercises) * 100) : 0;
                
                return (
                  <div key={difficulty} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {difficulty}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          difficulty === 'simple' ? 'bg-green-500' :
                          difficulty === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Goals */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Weekly Goals</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-300">Exercise Goal</span>
                  <span className="text-sm text-blue-700 dark:text-blue-400">7/7 days</span>
                </div>
                <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-orange-900 dark:text-orange-300">Calorie Goal</span>
                  <span className="text-sm text-orange-700 dark:text-orange-400">1260/1400 cal</span>
                </div>
                <div className="w-full bg-orange-200 dark:bg-orange-800 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
          <Award className="w-6 h-6 text-yellow-600 mr-2" />
          Recent Achievements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-500 p-2 rounded-full">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-yellow-900 dark:text-yellow-300">Fire Starter</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">5-day streak achieved!</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-full">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-300">Goal Crusher</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">Completed 10+ exercises</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 p-2 rounded-full">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-300">Calorie Burner</h3>
                <p className="text-sm text-green-700 dark:text-green-400">500+ calories burned</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Export & Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Data Management</h2>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={exportData}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Export Analytics Data</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <RefreshCw className="w-5 h-5" />
            <span>Refresh Data</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filter Options</span>
          </button>
        </div>
        
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Data Privacy:</strong> All your fitness data is stored locally on your device. 
            Export your data anytime to keep a backup or transfer to another device.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;