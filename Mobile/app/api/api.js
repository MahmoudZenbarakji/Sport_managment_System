// this " 192.168.0.119 " needs to be replaced with the ipv4 of the device
// note the ip will change so check it every time
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE = "http://localhost:3000";

export const ENDPOINTS = {
  Category: `${API_BASE}/api/v1/category`,
  Stadium: `${API_BASE}/api/v1/stadium`,
  Booking: `${API_BASE}/api/v1/bookings`,
  Coaches: `${API_BASE}/api/v1/users/coaches`,
  Register: `${API_BASE}/api/v1/auth/register`,
  Login: `${API_BASE}/api/v1/auth/login`,
  Logout: `${API_BASE}/api/v1/auth/logout`,
  Me: `${API_BASE}/api/v1/auth/me`,
};

// Helper function to get stadiums by category
export const getStadiumsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${ENDPOINTS.Stadium}/category/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Booking functions
export const createBooking = async (stadiumId, date, time) => {
  try {
    // Get token from AsyncStorage to ensure it's included in the request
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }
    
    const response = await axios.post(
      ENDPOINTS.Booking,
      {
        stadium: stadiumId,
        date,
        time
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserBookings = async () => {
  try {
    // Get token from AsyncStorage to ensure it's included in the request
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }
    
    const response = await axios.get(
      `${ENDPOINTS.Booking}/my-bookings`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(ENDPOINTS.Login, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(ENDPOINTS.Register, { name, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    // The token is automatically included via axios.defaults.headers.common["Authorization"]
    // which is set in AuthContext when user logs in
    const response = await axios.post(ENDPOINTS.Logout);
    return response.data;
  } catch (error) {
    // Even if the request fails, we should still logout locally
    // This handles cases where token might be expired or invalid
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId, formData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }
    
    const response = await axios.put(
      `${API_BASE}/api/v1/users/${userId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get current user info
export const getCurrentUser = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }
    
    const response = await axios.get(ENDPOINTS.Me, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
