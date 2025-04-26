// ... All existing imports
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lmaqkr3i16.execute-api.us-east-1.amazonaws.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor
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

// Create Context
export const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [currentUser,setCurrentUser] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      console.log('AsyncStorage cleared successfully');
    } catch (error) {
      console.log('Error clearing AsyncStorage:', error);
    }
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        const storedUserData = await AsyncStorage.getItem('userData');

        if (storedToken && storedUserData) {
          try {
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            const response = await api.get('/auth/verify');
            if (response.data.valid) {
              setUserToken(storedToken);
              setUserData(JSON.parse(storedUserData));
            } else {
              clearStorage();
            }
          } catch (error) {
            console.log('Token validation error:', error);
            clearStorage();
          }
        } else {
          setUserToken(null);
        }
      } catch (error) {
        console.log('Error restoring auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await api.post('/login', {
        username,
        password,
      });

      if (!response.data || !response.data.token) {
        throw new Error("Login failed: No token received.");
      }

      const { user, token } = response.data;

      await AsyncStorage.setItem('userToken', token.toString());
      await AsyncStorage.setItem('userData', JSON.stringify(user));

      setUserToken(token);
      setUserData(user);
      setCurrentUser(user.nickname);

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
      const response = await api.post('/register', {
        userData
      });

      setRegistrationSuccess(true);
      //setUserToken(true);
      console.log("registration Success " + registrationSuccess)
      return {
        success: true,
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

  // ✅ New function: Register Patient
  const registerPatient = async (patientData) => {
    setIsLoading(true);
    try {
      const response = await api.post('/savePatientData', patientData);

      console.log('Patient registration response:', response.data);

      return {
        success: true,
        patient: response.data.patient,
        message: response.data.message,
      };
    } catch (error) {
      console.error('Patient registration error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Patient registration failed.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      try {
        await api.post('/auth/logout');
      } catch (logoutError) {
        console.log('Backend logout notification failed:', logoutError);
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
    currentUser,
    userData,
    registrationSuccess,
    login,
    register,
    registerPatient, // ✅ Added patient registration
    logout,
    clearStorage,
    clearRegistrationSuccess,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};
