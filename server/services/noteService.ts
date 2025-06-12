import Note, { type INote } from "../models/Note.ts";
import { generateSummary, generateTags } from "./aiService.ts";
import { upsertNote } from "./vectorService.ts";
import { getPineconeIndex } from "../config/pinecone.ts";

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

export const getNote = async (noteId: string, userId: string) => {
    try {
        const note = await Note.findOne({_id: noteId, userId});
        if (!note) throw new Error("Note not found");
        return note;
    } catch (error) {
        console.error("Error getting note", error);
        throw error;
    }
}

export const getNotesByUserId = async (userId: string) => {
    const notes = await Note.find({userId});
    return notes;   
}

export const updateNote = async (noteId: string, noteData: INote) => {
    try {
        const note = await Note.findByIdAndUpdate(noteId, noteData, {new: true});
        if (!note) throw new Error("Note not found");
        const {title, content} = noteData;
        const summary = await generateSummary(content);
        const tags = await generateTags(content);
        note.title = title;
        note.content = content;
        note.summary = summary;
        note.tags = tags;
        await upsertNote(note);
        return note;
    } catch (error) {
        console.error("Error updating note", error);
        throw error;
    }
}

export const deleteNote = async (noteId: string) => {
    try {
        const index = await getPineconeIndex();
        const note = await Note.findByIdAndDelete(noteId);
        if (!note) throw new Error("Note not found");
        if(!index) throw new Error("Pinecone index is not initialized yet. Call initPinecone first.");
        await index.deleteMany({
            metadata: {
                noteId: noteId
            }
        });
    } catch (error) {
        console.error("Error deleting note", error);
        throw error;
    }
}
