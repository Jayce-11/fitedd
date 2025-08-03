import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { sampleUsers } from '../data/sampleUsers';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(sampleUsers);

  useEffect(() => {
    // Load users from localStorage or use sample data
    const storedUsers = localStorage.getItem('fited-users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      localStorage.setItem('fited-users', JSON.stringify(sampleUsers));
    }

    // Check for logged-in user
    const storedUser = localStorage.getItem('fited-current-user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const currentUser = users.find(u => u.id === userData.id);
      if (currentUser) {
        setUser(currentUser);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('fited-current-user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const signup = async (userData: Omit<User, 'id' | 'completedExercises' | 'streakDays' | 'totalCaloriesBurned' | 'createdAt'>): Promise<boolean> => {
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return false;
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      completedExercises: [],
      streakDays: 0,
      totalCaloriesBurned: 0,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('fited-users', JSON.stringify(updatedUsers));
    
    setUser(newUser);
    localStorage.setItem('fited-current-user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fited-current-user');
  };

  const updateUserProgress = (exerciseId: string, caloriesBurned: number) => {
    if (!user) return;

    const updatedUser: User = {
      ...user,
      completedExercises: user.completedExercises.includes(exerciseId) 
        ? user.completedExercises 
        : [...user.completedExercises, exerciseId],
      totalCaloriesBurned: user.totalCaloriesBurned + caloriesBurned,
      streakDays: user.streakDays + (user.completedExercises.includes(exerciseId) ? 0 : 1)
    };

    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    setUsers(updatedUsers);
    setUser(updatedUser);
    
    localStorage.setItem('fited-users', JSON.stringify(updatedUsers));
    localStorage.setItem('fited-current-user', JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    updateUserProgress
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};