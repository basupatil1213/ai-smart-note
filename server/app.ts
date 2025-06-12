import express from "express";
import initalizeRoutes from "./routes/index.ts";
import connectDB from "./config/db.ts";
import cors from "cors";
import { initPinecone } from "./config/pinecone.ts";
import { clerkMiddleware } from "@clerk/express";

const initalizeServer = async (app: express.Application) => {
    try {
        // middleware
        app.use(express.json());
        app.use(cors());
        app.use(express.urlencoded({ extended: true }));
        app.use(clerkMiddleware());
        // routes
        initalizeRoutes(app);

        // connect to database
        await connectDB();

        // initialize pinecone
        await initPinecone();

    } catch (error) {
        console.error("Error initializing server", error);
        process.exit(1);
    }
}

export default initalizeServer;