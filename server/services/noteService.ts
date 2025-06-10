import Note, { type INote } from "../models/Note.ts";
import { generateSummary, generateTags } from "./aiService.ts";
import { upsertNote } from "./vectorService.ts";
import index from "../config/pinecone.ts";

export const createNote = async (noteData: INote) => {
    try {
        const {userId, title, content} = noteData;

        const summary = await generateSummary(content);
        console.log("summary", summary);
        const tags = await generateTags(content);
        console.log("tags", tags);

        const note = await Note.create({
            userId, title, content, summary, tags});

        await upsertNote(note);

        return note;
    } catch (error) {
        console.error("Error creating note", error);
        throw error;
    }
}

// get all notes
export const getAllNotes = async (userId: string) => {
    try {
        const notes = await Note.find({userId});
        return notes;
    } catch (error) {
        console.error("Error fetching notes", error);
        throw error;
    }
}

// update a note
export const updateNote = async (noteId: string, noteData: INote) => {
    try {
        const {title, content} = noteData;

        const note = await Note.findByIdAndUpdate(noteId, {title, content}, {new: true});
        if (!note) throw new Error("Note not found");
        await upsertNote(note);
        return note;
    } catch (error) {
        console.error("Error updating note", error);
    }
}

// delete a note
export const deleteNote = async (noteId: string) => {
    try {
        const note = await Note.findByIdAndDelete(noteId);
        if (!note) throw new Error("Note not found");
        await index._deleteOne(noteId);
    } catch (error) {
        console.error("Error deleting note", error);
        throw error;
    }
}

// get a note by id
export const getNoteById = async (noteId: string) => {
    try {
        const note = await Note.findById(noteId);
        if (!note) throw new Error("Note not found");
        return note;
    } catch (error) {
        console.error("Error fetching note", error);
        throw error;
    }
}