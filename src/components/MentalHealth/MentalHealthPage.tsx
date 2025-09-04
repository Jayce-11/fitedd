import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Brain, 
  Heart, 
  Smile, 
  Frown, 
  Meh, 
  Sun, 
  Moon, 
  Coffee, 
  Book, 
  Music, 
  Users, 
  Phone,
  MessageCircle,
  Calendar,
  TrendingUp,
  Award,
  Target,
  Clock,
  Lightbulb,
  Shield
} from 'lucide-react';

type MoodType = 'excellent' | 'good' | 'okay' | 'poor' | 'terrible';

interface MoodEntry {
  date: string;
  mood: MoodType;
  note?: string;
}

const MentalHealthPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [showResources, setShowResources] = useState(false);

  // Mock mood data - in a real app, this would come from user data
  const recentMoods: MoodEntry[] = [
    { date: '2024-01-20', mood: 'good', note: 'Had a great workout session' },
    { date: '2024-01-19', mood: 'okay', note: 'Stressed about exams' },
    { date: '2024-01-18', mood: 'excellent', note: 'Aced my presentation!' },
    { date: '2024-01-17', mood: 'poor', note: 'Feeling overwhelmed' },
    { date: '2024-01-16', mood: 'good', note: 'Good sleep last night' }
  ];

  const getMoodIcon = (mood: MoodType, size: string = 'w-6 h-6') => {
    switch (mood) {
      case 'excellent': return <Smile className={`${size} text-green-500`} />;
      case 'good': return <Smile className={`${size} text-blue-500`} />;
      case 'okay': return <Meh className={`${size} text-yellow-500`} />;
      case 'poor': return <Frown className={`${size} text-orange-500`} />;
      case 'terrible': return <Frown className={`${size} text-red-500`} />;
    }
  };

  const getMoodColor = (mood: MoodType) => {
    switch (mood) {
      case 'excellent': return 'bg-green-100 border-green-300 text-green-800';
      case 'good': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'okay': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'poor': return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'terrible': return 'bg-red-100 border-red-300 text-red-800';
    }
  };

  const handleMoodSubmit = () => {
    if (selectedMood) {
      // In a real app, this would save to the backend
      console.log('Mood logged:', { mood: selectedMood, note: moodNote });
      setSelectedMood(null);
      setMoodNote('');
      alert('Mood logged successfully!');
    }
  };

  const wellnessTips = [
    {
      icon: <Sun className="w-6 h-6 text-yellow-500" />,
      title: "Morning Routine",
      description: "Start your day with 5 minutes of deep breathing or meditation"
    },
    {
      icon: <Moon className="w-6 h-6 text-purple-500" />,
      title: "Sleep Hygiene",
      description: "Aim for 7-9 hours of sleep and avoid screens 1 hour before bed"
    },
    {
      icon: <Coffee className="w-6 h-6 text-brown-500" />,
      title: "Mindful Breaks",
      description: "Take 5-minute breaks every hour during study sessions"
    },
    {
      icon: <Users className="w-6 h-6 text-green-500" />,
      title: "Social Connection",
      description: "Spend quality time with friends or family daily"
    }
  ];

  const emergencyResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 text-based crisis support"
    },
    {
      name: "Campus Counseling Center",
      number: "Contact your school",
      description: "Free counseling services for students"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="bg-white bg-opacity-20 p-4 rounded-full">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Mental Health & Wellness</h1>
            <p className="opacity-90">Take care of your mind as much as your body</p>
          </div>
        </div>
      </div>

      {/* Mood Tracker */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Heart className="w-6 h-6 text-red-500 mr-2" />
          <span className="text-gray-900 dark:text-white">How are you feeling today?</span>
        </h2>
        
        <div className="grid grid-cols-5 gap-3 mb-4">
          {(['excellent', 'good', 'okay', 'poor', 'terrible'] as MoodType[]).map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedMood === mood 
                  ? getMoodColor(mood) 
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                {getMoodIcon(mood, 'w-8 h-8')}
                <span className="text-sm font-medium capitalize text-gray-900 dark:text-white">{mood}</span>
              </div>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="space-y-4">
            <textarea
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
              placeholder="What's on your mind? (optional)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={3}
            />
            <button
              onClick={handleMoodSubmit}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Log Mood
            </button>
          </div>
        )}
      </div>

      {/* Mood History */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <TrendingUp className="w-6 h-6 text-blue-500 mr-2" />
          Your Mood Journey
        </h2>
        
        <div className="space-y-3">
          {recentMoods.map((entry, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getMoodIcon(entry.mood)}
                <div>
                  <p className="font-medium capitalize">{entry.mood}</p>
                  <p className="text-sm text-gray-600">{entry.date}</p>
                </div>
              </div>
              {entry.note && (
                <p className="text-sm text-gray-700 max-w-xs truncate">{entry.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Wellness Tips */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
          Daily Wellness Tips
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wellnessTips.map((tip, index) => (
            <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="bg-white p-2 rounded-full">
                  {tip.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray-700">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Target className="w-6 h-6 text-green-500 mr-2" />
          Quick Wellness Actions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Clock className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <p className="font-medium text-blue-900">5-Minute Meditation</p>
              <p className="text-sm text-blue-700">Quick mindfulness session</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <Music className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-green-900">Calming Sounds</p>
              <p className="text-sm text-green-700">Nature sounds & music</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <Book className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <p className="font-medium text-purple-900">Gratitude Journal</p>
              <p className="text-sm text-purple-700">Write 3 things you're grateful for</p>
            </div>
          </button>
        </div>
      </div>

      {/* Mental Health Resources */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <Shield className="w-6 h-6 text-red-500 mr-2" />
            Support Resources
          </h2>
          <button
            onClick={() => setShowResources(!showResources)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {showResources ? 'Hide' : 'Show'} Resources
          </button>
        </div>
        
        {showResources && (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-3">Crisis Support</h3>
              <div className="space-y-3">
                {emergencyResources.map((resource, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">{resource.name}</p>
                      <p className="text-red-700 font-mono">{resource.number}</p>
                      <p className="text-sm text-red-600">{resource.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3">Student Resources</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800">Campus counseling services (usually free)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800">Student support groups</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800">Academic stress management workshops</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Wellness Stats */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Award className="w-6 h-6 text-yellow-500 mr-2" />
          Your Wellness Journey
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-3">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">7</p>
            <p className="text-sm text-gray-600">Days of mood tracking</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-3">
              <Smile className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">4.2/5</p>
            <p className="text-sm text-gray-600">Average mood score</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-3">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">12</p>
            <p className="text-sm text-gray-600">Wellness activities completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthPage;