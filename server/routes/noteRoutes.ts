import { createNoteController, getAllNotesController, updateNoteController, deleteNoteController, getNoteByIdController, searchNotesController } from "../controllers/noteController.ts";
import { Router } from "express";

const router = Router();

router.post("/", createNoteController);

export default router;