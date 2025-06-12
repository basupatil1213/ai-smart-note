import Note from "../models/Note.ts";
import { searchNotes } from "./vectorService.ts";

const getNotesBySearchQuery = async (query: string, userId: string) => {
    const results = await searchNotes(query, userId);

    const noteIds = results.map(result => result.noteId);
    const notes = await Note.find({_id: {$in: noteIds}});
    return notes;
}

export {
    getNotesBySearchQuery
}