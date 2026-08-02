import axios from 'axios';
import toast from 'react-hot-toast';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach bearer token
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiry and network errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      // Avoid redirect loops if we are already on the login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    } else if (!error.response) {
      toast.error('Cannot connect to server. Check your connection.');
    }
    return Promise.reject(error);
  }
);

export default instance;
