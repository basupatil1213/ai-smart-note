import { searchNotesController } from "../controllers/searchController.ts";
import { Router } from "express";

const router = Router();

router.post("/", searchNotesController);

export default router;