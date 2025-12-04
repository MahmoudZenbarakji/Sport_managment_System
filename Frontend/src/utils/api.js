import axios from 'axios';
import { API_BASE } from '../environment/config';

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API functions
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    
    // Store token and user in localStorage
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Login failed',
    };
  }
};

export const registerUser = async (name, email, password, phoneNumber) => {
  try {
    const response = await api.post('/auth/register', { 
      name, 
      email, 
      password,
      phoneNumber: phoneNumber || undefined
    });
    const { token, user } = response.data;
    
    // Store token and user in localStorage
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Registration failed',
    };
  }
};

export const logoutUser = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Always clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const getMe = async () => {
  try {
    const response = await api.get('/auth/me');
    const user = response.data;
    
    // Update user in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    
    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch user data',
    };
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Blog API functions
export const getBlogs = async () => {
  try {
    const response = await api.get('/blogs');
    return { success: true, blogs: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch blogs',
    };
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await api.get(`/blogs/${id}`);
    return { success: true, blog: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch blog',
    };
  }
};

export const likeBlog = async (blogId, userId) => {
  try {
    const response = await api.post(`/blogs/${blogId}/like`, { userId });
    return { success: true, ...response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to like blog',
    };
  }
};

export const createBlog = async (title, content, authorId, image) => {
  try {
    const response = await api.post('/blogs', { 
      title, 
      content, 
      author: authorId,
      image: image || undefined
    });
    return { success: true, blog: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to create blog',
    };
  }
};

// Comment API functions
export const getCommentsByBlog = async (blogId) => {
  try {
    const response = await api.get(`/comments/blog/${blogId}`);
    return { success: true, comments: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch comments',
    };
  }
};

export const addComment = async (content, userId, blogId) => {
  try {
    const response = await api.post('/comments', { content, user: userId, blog: blogId });
    return { success: true, comment: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to add comment',
    };
  }
};

export const deleteComment = async (commentId) => {
  try {
    await api.delete(`/comments/${commentId}`);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to delete comment',
    };
  }
};

export const likeComment = async (commentId, userId) => {
  try {
    const response = await api.post(`/comments/${commentId}/like`, { userId });
    return { success: true, ...response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to like comment',
    };
  }
};

// Category API functions
export const getCategories = async () => {
  try {
    const response = await api.get('/category');
    return { success: true, categories: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch categories',
    };
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/category/${id}`);
    return { success: true, category: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch category',
    };
  }
};

