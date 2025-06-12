import noteRoutes from "./noteRoutes.ts";
import searchRoutes from "./searchRoutes.ts";
import express from "express";
import { requireAuth } from "@clerk/express";


export default (app: express.Application) => {
    app.use("/notes", requireAuth(), noteRoutes);
    app.use("/search", requireAuth(), searchRoutes);
}