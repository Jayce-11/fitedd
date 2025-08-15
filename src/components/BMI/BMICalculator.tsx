import React, { useState } from 'react';
import { Calculator, Scale, Ruler, TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      alert('Please enter valid weight and height values');
      return;
    }

    let bmiValue: number;
    
    if (unit === 'metric') {
      // BMI = weight (kg) / height (m)²
      bmiValue = weightNum / Math.pow(heightNum / 100, 2);
    } else {
      // BMI = (weight (lbs) / height (inches)²) × 703
      bmiValue = (weightNum / Math.pow(heightNum, 2)) * 703;
    }

    setBmi(parseFloat(bmiValue.toFixed(1)));
    setCategory(getBMICategory(bmiValue));
  };

  const getBMICategory = (bmiValue: number): string => {
    if (bmiValue < 18.5) return 'Underweight';
    if (bmiValue < 25) return 'Normal weight';
    if (bmiValue < 30) return 'Overweight';
    return 'Obese';
  };

  const getBMIColor = (bmiValue: number) => {
    if (bmiValue < 18.5) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (bmiValue < 25) return 'text-green-600 bg-green-50 border-green-200';
    if (bmiValue < 30) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getBMIIcon = (bmiValue: number) => {
    if (bmiValue < 18.5) return <AlertCircle className="w-6 h-6" />;
    if (bmiValue < 25) return <CheckCircle className="w-6 h-6" />;
    if (bmiValue < 30) return <AlertCircle className="w-6 h-6" />;
    return <AlertCircle className="w-6 h-6" />;
  };

  const getHealthTips = (bmiValue: number) => {
    if (bmiValue < 18.5) {
      return [
        'Consider consulting with a healthcare provider about healthy weight gain',
        'Focus on nutrient-dense foods and strength training',
        'Ensure adequate protein intake for muscle building'
      ];
    }
    if (bmiValue < 25) {
      return [
        'Maintain your current healthy lifestyle',
        'Continue regular exercise and balanced nutrition',
        'Monitor your weight regularly to stay in this range'
      ];
    }
    if (bmiValue < 30) {
      return [
        'Consider gradual weight loss through diet and exercise',
        'Aim for 1-2 pounds of weight loss per week',
        'Focus on portion control and increased physical activity'
      ];
    }
    return [
      'Consult with a healthcare provider for a comprehensive weight management plan',
      'Consider working with a registered dietitian',
      'Start with low-impact exercises and gradually increase intensity'
    ];
  };

  const clearCalculation = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="bg-white bg-opacity-20 p-4 rounded-full">
            <Calculator className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">BMI Calculator</h1>
            <p className="opacity-90">Calculate your Body Mass Index and get health insights</p>
          </div>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Calculate Your BMI</h2>
        
        {/* Unit Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1 flex">
            <button
              onClick={() => setUnit('metric')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                unit === 'metric'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Metric (kg/cm)
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                unit === 'imperial'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Imperial (lbs/in)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Weight Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
            </label>
            <div className="relative">
              <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder={unit === 'metric' ? 'Enter weight in kg' : 'Enter weight in lbs'}
                min="1"
                step="0.1"
              />
            </div>
          </div>

          {/* Height Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height {unit === 'metric' ? '(cm)' : '(inches)'}
            </label>
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder={unit === 'metric' ? 'Enter height in cm' : 'Enter height in inches'}
                min="1"
                step="0.1"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={calculateBMI}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>Calculate BMI</span>
          </button>
          <button
            onClick={clearCalculation}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* BMI Result */}
      {bmi && (
        <div className={`rounded-xl p-6 border-2 ${getBMIColor(bmi)} transition-all duration-300`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getBMIIcon(bmi)}
              <div>
                <h3 className="text-2xl font-bold">BMI: {bmi}</h3>
                <p className="text-lg font-semibold">{category}</p>
              </div>
            </div>
            <TrendingUp className="w-8 h-8" />
          </div>
          
          {/* BMI Scale Visualization */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-2">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
            <div className="relative h-4 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 rounded-full">
              <div
                className="absolute top-0 w-3 h-4 bg-gray-800 rounded-full transform -translate-x-1/2"
                style={{ left: `${Math.min(Math.max((bmi - 15) / 25 * 100, 0), 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>15</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
          </div>
        </div>
      )}

      {/* Health Tips */}
      {bmi && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
          <h3 className="text-lg font-bold mb-4 flex items-center text-gray-900 dark:text-white">
            <Info className="w-5 h-5 mr-2 text-blue-500" />
            Health Recommendations
          </h3>
          <ul className="space-y-2">
            {getHealthTips(bmi).map((tip, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* BMI Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Understanding BMI</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">BMI Categories</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Underweight:</span>
                <span className="font-medium text-blue-600">Below 18.5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Normal weight:</span>
                <span className="font-medium text-green-600">18.5 - 24.9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Overweight:</span>
                <span className="font-medium text-yellow-600">25 - 29.9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Obese:</span>
                <span className="font-medium text-red-600">30 and above</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Important Notes</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• BMI is a screening tool, not a diagnostic tool</li>
              <li>• It doesn't account for muscle mass or body composition</li>
              <li>• Athletes may have higher BMI due to muscle mass</li>
              <li>• Consult healthcare providers for personalized advice</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;