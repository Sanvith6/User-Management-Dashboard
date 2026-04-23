import axios from 'axios';

// API base URL - will use proxy in development
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error(
        `[API Error] ${error.response.status} ${error.response.config.url}`,
        error.response.data
      );
    } else if (error.request) {
      // Request made but no response
      console.error('[API Error] No response received', error.request);
    } else {
      // Error in request setup
      console.error('[API Error]', error.message);
    }
    return Promise.reject(error);
  }
);

// API methods
export const userAPI = {
  // Get all users
  getUsers: async () => {
    try {
      const response = await api.get('/users/');
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail || 'Failed to fetch users'
      );
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail || `Failed to fetch user ${id}`
      );
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      const response = await api.post('/users/', userData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail || 'Failed to create user'
      );
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      await api.delete(`/users/${id}`);
      return true;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail || `Failed to delete user ${id}`
      );
    }
  },
};

// Health check
export const healthAPI = {
  checkHealth: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('Health check failed');
    }
  },
};

export default api;
