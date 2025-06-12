import { createNoteController, deleteNoteController, getNoteController, getNotesByUserIdController, updateNoteController } from "../controllers/noteController.ts";
import { Router } from "express";

const router = Router();

router.post("/", createNoteController);
router.get("/:id", getNoteController);
router.put("/:id", updateNoteController);
router.delete("/:id", deleteNoteController);
router.get("/", getNotesByUserIdController);

export default router;