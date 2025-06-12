import { type Request, type Response } from "express";
import { getNotesBySearchQuery } from "../services/searchService.ts";

const searchNotesController = async (req: Request, res: Response) => {
    const { query } = req.body;
    const notes = await getNotesBySearchQuery(query, "123");
    res.status(200).json(notes);
}

export {
    searchNotesController
}