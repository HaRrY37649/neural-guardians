
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Define the structure of a user
export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  joinedDate: Date;
  lastActive: Date;
  usageHistory: {
    date: Date;
    action: string;
    contractAddress?: string;
  }[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('neuralguard_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // Convert string dates back to Date objects
        userData.joinedDate = new Date(userData.joinedDate);
        userData.lastActive = new Date(userData.lastActive);
        userData.usageHistory = userData.usageHistory.map((history: any) => ({
          ...history,
          date: new Date(history.date)
        }));
        
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('neuralguard_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // This is a mock authentication. In a real app, you would call your API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'demo@example.com' && password === 'password') {
        // Mock user data
        const mockUser: User = {
          id: 'usr_' + Math.random().toString(36).substr(2, 9),
          email: email,
          name: 'Demo User',
          plan: 'pro',
          joinedDate: new Date(2023, 5, 15),
          lastActive: new Date(),
          usageHistory: [
            {
              date: new Date(2023, 6, 20),
              action: 'Contract Analysis',
              contractAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
            },
            {
              date: new Date(2023, 7, 5),
              action: 'Contract Analysis',
              contractAddress: '0x8b3f5381a73cD8c70EC7776D8B2d922ecD64831B'
            },
            {
              date: new Date(2023, 8, 18),
              action: 'Plan Upgrade',
            }
          ]
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('neuralguard_user', JSON.stringify(mockUser));
        
        toast({
          title: "Login successful",
          description: "Welcome back, " + mockUser.name + "!",
        });
        
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('neuralguard_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
