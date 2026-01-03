import axios from 'axios';
import type { AuthResponse, TasksResponse, TaskResponse, Task } from '../types';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (email: string, password: string, name: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', { email, password, name });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },

  getMe: async (): Promise<AuthResponse> => {
    const response = await api.get<AuthResponse>('/auth/me');
    return response.data;
  },
};

// Task API
export const taskAPI = {
  getTasks: async (): Promise<TasksResponse> => {
    const response = await api.get<TasksResponse>('/tasks');
    return response.data;
  },

  getTask: async (id: string): Promise<TaskResponse> => {
    const response = await api.get<TaskResponse>(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (
    title: string,
    description: string,
    status?: Task['status']
  ): Promise<TaskResponse> => {
    const response = await api.post<TaskResponse>('/tasks', { title, description, status });
    return response.data;
  },

  updateTask: async (
    id: string,
    updates: Partial<Pick<Task, 'title' | 'description' | 'status'>>
  ): Promise<TaskResponse> => {
    const response = await api.put<TaskResponse>(`/tasks/${id}`, updates);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};

export default api;
