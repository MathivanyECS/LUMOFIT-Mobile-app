import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Create API instance
const api = axios.create({
  baseURL: 'https://lmaqkr3i16.execute-api.us-east-1.amazonaws.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Create the Authentication Context
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  // Function to clear AsyncStorage (useful for debugging)
  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      console.log('AsyncStorage cleared successfully');
    } catch (error) {
      console.log('Error clearing AsyncStorage:', error);
    }
  };

  // Check if user is logged in on app start
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        const storedUserData = await AsyncStorage.getItem('userData');
        
        if (storedToken && storedUserData) {
          // Validate token with backend
          try {
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            const response = await api.get('/auth/verify');
            if (response.data.valid) {
              setUserToken(storedToken);
              setUserData(JSON.parse(storedUserData));
            } else {
              // Token invalid, clear storage
              clearStorage();
            }
          } catch (error) {
            console.log('Token validation error:', error);
            clearStorage();
          }
        }
        else {
          setUserToken(null); // Ensure token is reset if not found
        }
      } catch (error) {
        console.log('Error restoring auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };
    bootstrapAsync();
  }, []);

  // Auth functions
  const login = async (username, password) => {
    setIsLoading(true);
    try {
      // Call to backend API
      const response = await api.post('/login', {
        username,
        password,  
      });
  
      console.log("Login response:", response.data); // Keep this for debugging
      
      // Check if response contains the required fields
      if (!response.data || !response.data.token) {
        console.error("Login failed: No token received in response");
        throw new Error("Login failed: No token received.");
      }
      
      const { user, token } = response.data;
      
      // Store auth info - ensure token is a string
      await AsyncStorage.setItem('userToken', token.toString());
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      
      // Update state
      setUserToken(token);
      setUserData(user);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to login. Please try again.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      // Call to backend API
      const response = await api.post('/register', {
        userData
      });

      setUserData(response.data.user);
      
      return { 
        success: true,
        user: response.data.user
      };
    } catch (error) {
      console.log('Registration error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Registration failed. Please try again.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Optional: notify backend about logout
      try {
        await api.post('/auth/logout');
      } catch (logoutError) {
        console.log('Backend logout notification failed:', logoutError);
        // Continue with local logout even if backend notification fails
      }
      
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      setUserToken(null);
      setUserData(null);
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearRegistrationSuccess = () => {
    setRegistrationSuccess(false);
  };

  const authContext = {
    isLoading,
    userToken,
    userData,
    registrationSuccess,
    login,
    register,
    logout,
    clearStorage,
    clearRegistrationSuccess,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};