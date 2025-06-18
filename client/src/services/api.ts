import axios from 'axios';
import type { Note, CreateNoteData, UpdateNoteData } from '../types/note';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set auth token for requests
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Note API functions
export const noteAPI = {
  // Get all notes for the authenticated user
  getNotes: async (): Promise<Note[]> => {
    const response = await api.get('/notes');
    return response.data;
  },

  // Get a specific note by ID
  getNote: async (id: string): Promise<Note> => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  // Create a new note
  createNote: async (noteData: CreateNoteData): Promise<Note> => {
    const response = await api.post('/notes', noteData);
    return response.data;
  },

  // Update an existing note
  updateNote: async (id: string, noteData: UpdateNoteData): Promise<Note> => {
    const response = await api.put(`/notes/${id}`, noteData);
    return response.data;
  },

  // Delete a note
  deleteNote: async (id: string): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },
};

// Search API functions
export const searchAPI = {
  // Search notes by query
  searchNotes: async (query: string): Promise<Note[]> => {
    const response = await api.post('/search', { query });
    return response.data;
  },
};

export default api;
