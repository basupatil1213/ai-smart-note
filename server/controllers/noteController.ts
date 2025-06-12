import { createNote, deleteNote, getNote, updateNote } from "../services/noteService.ts";
import { type Request, type Response } from "express";

const createNoteController = async (req: Request, res: Response) => {
    try {
        const note = await createNote(req.body);
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({error: "Failed to create note"});
    }
}

const getNoteController = async (req: Request, res: Response) => {
    try {
        const note = await getNote(req.params.id as string);
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({error: "Failed to get note"});
    }
}

const updateNoteController = async (req: Request, res: Response) => {
    try {
        const note = await updateNote(req.params.id as string, req.body);
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({error: "Failed to update note"});
    }
}

const deleteNoteController = async (req: Request, res: Response) => {
    try {
        await deleteNote(req.params.id as string);
        res.status(200).json({message: "Note deleted successfully"});
    } catch (error) {
        res.status(500).json({error: "Failed to delete note"});
    }
}

export {
    createNoteController,
    getNoteController,
    updateNoteController,
    deleteNoteController
}