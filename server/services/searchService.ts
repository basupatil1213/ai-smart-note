import Note from "../models/Note.ts";
import { searchNotes } from "./vectorService.ts";

const getNotesBySearchQuery = async (query: string) => {
    const results = await searchNotes(query);

    const noteIds = results.map(result => result.metadata?.noteId);
    const notes = await Note.find({_id: {$in: noteIds}});
    return notes;
}

export {
    getNotesBySearchQuery
}