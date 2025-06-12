import noteRoutes from "./noteRoutes.ts";
import searchRoutes from "./searchRoutes.ts";
import express from "express";


export default (app: express.Application) => {
    app.use("/notes", noteRoutes);
    app.use("/search", searchRoutes);
}