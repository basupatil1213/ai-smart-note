import { create } from "zustand";
import type { Note } from "../types/note";


type NotesStore = {
    notes: Note[];
    setNotes: (notes: Note[]) => void;
    addNote: (note: Note) => void;
    updateNote: (note: Note) => void;
    deleteNote: (id: string) => void;
}

const useNotesStore = create<NotesStore>((set) => ({
    notes: [],
    setNotes: (notes: Note[]) => set({ notes }),
    addNote: (note: Note) => set((state) => ({ notes: [...state.notes, note] })),
    updateNote: (note: Note) => set((state) => ({ notes: state.notes.map((n) => n.id === note.id ? note : n) })),
    deleteNote: (id: string) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
}));

export default useNotesStore;