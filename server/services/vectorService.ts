import { PineconeStore } from "@langchain/pinecone";
import { OllamaEmbeddings } from "@langchain/ollama";
import { Document } from "langchain/document";
import { getPineconeIndex } from "../config/pinecone.ts";
import { generateEmbedding } from "./aiService.ts";
import Note, { type INote } from "../models/Note.ts";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { v4 as uuidv4 } from "uuid";

const index = await getPineconeIndex();

const embeddings = new OllamaEmbeddings({
    model: process.env.OLLAMA_EMBEDDING_MODEL as string,
});

const store = new PineconeStore(embeddings, {
    pineconeIndex: index!,
});

export const upsertNote = async (note: INote) => {
    const content = note.content;
    const splitter = new CharacterTextSplitter({
        separator: "\n",
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    const chunks = await splitter.splitText(content);
    chunks.forEach(async (chunk, idx) => {
        const vector = await generateEmbedding(chunk);
        await index?.upsert([{
            id: uuidv4(),
            values: vector,
            metadata: {
                title: note.title,
                userId: note.userId,
                noteId: note.id.toString(),
                chunkIndex: idx,
            }
        }])
    });
}

export const searchNotes = async (query: string, userId?: string, topK: number = 5) => {
    if (!index) throw new Error("Pinecone index is not initialized yet.");
  
    const results = await index.query({
      vector: await generateEmbedding(query),
      topK: 50, // get more to allow for filtering duplicates
      includeMetadata: true,
      filter: userId ? { userId } : undefined,
    });
  
    const seenNotes = new Set();
    const uniqueNotes = [];
  
    for (const match of results.matches) {
      const noteId = match.metadata?.noteId;
      if (noteId && !seenNotes.has(noteId)) {
        uniqueNotes.push({
          noteId,
          title: match!.metadata!.title,
          score: match.score,
          chunkText: match!.metadata!.chunkText, // optional
        });
        seenNotes.add(noteId);
      }
      if (uniqueNotes.length >= topK) break;
    }
  
    return uniqueNotes;
  };
  

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

