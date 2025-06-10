import { createNote, getAllNotes, updateNote, deleteNote, getNoteById } from "../services/noteService.ts";
import { type Request, type Response } from "express";
import { searchNotes } from "../services/vectorService.ts";

export const createNoteController = async (req: Request, res: Response) => {
    try {
        const note = await createNote(req.body);
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({error: "Failed to create note"});
    }
}

export const getAllNotesController = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        if (!userId) {
            return res.status(400).json({error: "User ID is required"});
        }
        const notes = await getAllNotes(userId);
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch notes"});
    }
}

export const updateNoteController = async (req: Request, res: Response) => {
    try {
        const {noteId} = req.params;
        if (!noteId){
            return res.status(400).json({error: "Note ID is required"});
        }
        const note = await updateNote(noteId, req.body);
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({error: "Failed to update note"});
    }
}

export const deleteNoteController = async (req: Request, res: Response) => {
    try {
        const {noteId} = req.params;
        if (!noteId){
            return res.status(400).json({error: "Note ID is required"});
        }

        await deleteNote(noteId);
        res.status(200).json({message: "Note deleted successfully"});
    } catch (error) {
        res.status(500).json({error: "Failed to delete note"});
    }
}

export const getNoteByIdController = async (req: Request, res: Response) => {
    try {
        const {noteId} = req.params;
        if (!noteId){
            return res.status(400).json({error: "Note ID is required"});
        }
        const note = await getNoteById(noteId);
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch note"});
    }
}

export const searchNotesController = async (req: Request, res: Response) => {
    try {
        const results = await searchNotes(req.query.query as string);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({error: "Failed to search notes"});
    }
}