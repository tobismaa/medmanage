import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Your Node.js backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login API
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// Super Admin APIs
export const getSystemOverview = async () => {
  const response = await api.get('/super-admin/overview');
  return response.data;
};

export const getHospitals = async () => {
  const response = await api.get('/super-admin/hospitals');
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/super-admin/users');
  return response.data;
};

export const getActivities = async () => {
  const response = await api.get('/super-admin/activities');
  return response.data;
};