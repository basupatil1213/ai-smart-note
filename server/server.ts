import express from "express";
import initalizeServer from "./app.ts";
import dotenv from "dotenv";

dotenv.config();

const app = express();

initalizeServer(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000"); 
});
