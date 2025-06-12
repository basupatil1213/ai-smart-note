import { PineconeStore } from "@langchain/pinecone";
import { OllamaEmbeddings } from "@langchain/ollama";
import { Document } from "langchain/document";
import { getPineconeIndex } from "../config/pinecone.ts";
import { generateEmbedding } from "./aiService.ts";
import Note, { type INote } from "../models/Note.ts";

const index = await getPineconeIndex();

const embeddings = new OllamaEmbeddings({
    model: "llama3.2:latest",
});

const store = new PineconeStore(embeddings, {
    pineconeIndex: index!,
});

export const upsertNote = async (note: INote) => {
    const vector = await generateEmbedding(note.content);
    if(!index) throw new Error("Pinecone index is not initialized yet. Call initPinecone first.");
    await index.upsert([{
        id: note.id,
        values: vector,
        metadata: {
            title: note.title,
            userId: note.userId,
            noteId: note.id.toString()
          }
    }])
}

export const searchNotes = async (query: string) => {
    if(!index) throw new Error("Pinecone index is not initialized yet. Call initPinecone first.");
    const results = await index.query({
        vector: await generateEmbedding(query),
        topK: 5,
        includeMetadata: true,
    })
    return results.matches;
}

// querySimilarNotes
export const querySimilarNotes = async (noteId: string) => {
    if(!index) throw new Error("Pinecone index is not initialized yet. Call initPinecone first.");
    const note = await Note.findById(noteId);
    if (!note) throw new Error("Note not found");
  
    const queryEmbedding = await generateEmbedding(note.content);
  
    const results = await index.query({
      vector: queryEmbedding,
      topK: 5,
      includeMetadata: true
    });
  
    return results.matches.map(match => ({
      id: match.id,
      score: match.score,
      ...match.metadata
    }));
  };

