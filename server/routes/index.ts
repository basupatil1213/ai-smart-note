import noteRoutes from "./noteRoutes.ts";
import express from "express";


export default (app: express.Application) => {
    app.use("/notes", noteRoutes);
}