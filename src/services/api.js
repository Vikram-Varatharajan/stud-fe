
// File: src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const teacherToken = localStorage.getItem('teacherToken');
  const studentToken = localStorage.getItem('studentToken');
  
  if (teacherToken && config.url.includes('/teacher/')) {
    config.headers.Authorization = `Bearer ${teacherToken}`;
  } else if (studentToken && config.url.includes('/student/')) {
    config.headers.Authorization = `Bearer ${studentToken}`;
  }
  
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('teacherToken');
      localStorage.removeItem('studentToken');
      localStorage.removeItem('teacherData');
      localStorage.removeItem('studentData');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;

