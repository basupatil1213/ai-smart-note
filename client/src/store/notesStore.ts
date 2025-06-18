import { create } from "zustand";
import type { Note, CreateNoteData, UpdateNoteData } from "../types/note";
import { noteAPI, searchAPI } from "../services/api";
import toast from "react-hot-toast";

interface NotesStore {
  notes: Note[];
  currentNote: Note | null;
  loading: boolean;
  error: string | null;
  searchResults: Note[];
  isSearching: boolean;
  
  // Actions
  setNotes: (notes: Note[]) => void;
  setCurrentNote: (note: Note | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // API Actions
  fetchNotes: () => Promise<void>;
  fetchNote: (id: string) => Promise<Note | null>;
  createNote: (noteData: CreateNoteData) => Promise<Note | null>;
  updateNote: (id: string, noteData: UpdateNoteData) => Promise<Note | null>;
  deleteNote: (id: string) => Promise<boolean>;
  searchNotes: (query: string) => Promise<void>;
  clearSearch: () => void;
}

const useNotesStore = create<NotesStore>((set) => ({
  notes: [],
  currentNote: null,
  loading: false,
  error: null,
  searchResults: [],
  isSearching: false,
  
  setNotes: (notes: Note[]) => set({ notes }),
  setCurrentNote: (note: Note | null) => set({ currentNote: note }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  
  fetchNotes: async () => {
    set({ loading: true, error: null });
    try {
      const notes = await noteAPI.getNotes();
      set({ notes, loading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch notes';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
    }
  },
  
  fetchNote: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const note = await noteAPI.getNote(id);
      set({ currentNote: note, loading: false });
      return note;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch note';
      set({ error: errorMessage, loading: false, currentNote: null });
      toast.error(errorMessage);
      return null;
    }
  },
  
  createNote: async (noteData: CreateNoteData) => {
    set({ loading: true, error: null });
    try {
      const newNote = await noteAPI.createNote(noteData);
      set((state) => ({ 
        notes: [newNote, ...state.notes], 
        loading: false 
      }));
      toast.success('Note created successfully!');
      return newNote;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create note';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      return null;
    }
  },
  
  updateNote: async (id: string, noteData: UpdateNoteData) => {
    set({ loading: true, error: null });
    try {
      const updatedNote = await noteAPI.updateNote(id, noteData);
      set((state) => ({ 
        notes: state.notes.map((note) => note._id === id ? updatedNote : note),
        currentNote: state.currentNote?._id === id ? updatedNote : state.currentNote,
        loading: false 
      }));
      toast.success('Note updated successfully!');
      return updatedNote;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update note';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      return null;
    }
  },
  
  deleteNote: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await noteAPI.deleteNote(id);
      set((state) => ({ 
        notes: state.notes.filter((note) => note._id !== id),
        currentNote: state.currentNote?._id === id ? null : state.currentNote,
        loading: false 
      }));
      toast.success('Note deleted successfully!');
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete note';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      return false;
    }
  },
  
  searchNotes: async (query: string) => {
    if (!query.trim()) {
      set({ searchResults: [], isSearching: false });
      return;
    }
    
    set({ isSearching: true, error: null });
    try {
      const results = await searchAPI.searchNotes(query);
      set({ searchResults: results, isSearching: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Search failed';
      set({ error: errorMessage, isSearching: false, searchResults: [] });
      toast.error(errorMessage);
    }
  },
  
  clearSearch: () => set({ searchResults: [], isSearching: false }),
}));

export default useNotesStore;