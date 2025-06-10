import mongoose from "mongoose";
import { Document } from "mongoose";

/**
 * Note Model - Mongoose Schema
 *
 * Defines the structure for storing user notes in MongoDB, including:
 * - User reference (userId)
 * - Title and content
 * - AI-generated metadata (summary, tags, Q&A pairs)
 * - Embedding reference for vector search (embeddingId)
 * - Automatic timestamps (createdAt, updatedAt)
 *
 * Used for CRUD operations and semantic search features in the application.
 */

// Note model definition for MongoDB using Mongoose.
// This schema represents a user's note, including title, content, AI-generated metadata (summary, tags, Q&A pairs),
// and references to vector embeddings for semantic search. Timestamps for creation and updates are included.
// Used for storing and retrieving notes in the application.

const noteSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true }, // From session.user.id (NextAuth)
        title: { type: String, required: true },
        content: { type: String, required: true },
      
        // AI-generated metadata
        summary: { type: String },
        tags: [String],
        qaPairs: [
          {
            question: { type: String },
            answer: { type: String }
          }
        ],
      
        // Link to vector index (Pinecone/Weaviate)
        embeddingId: { type: String },
      
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
      }
)

const Note = mongoose.models.Note as mongoose.Model<INote> || mongoose.model<INote>("Note", noteSchema);

export default Note;

 

/**
 * Note document interface for TypeScript type safety.
 */
export interface INote extends Document {
  userId: string;
  title: string;
  content: string;
  tags: string[];
  qaPairs: { question?: string; answer?: string }[];
  createdAt: Date;
  updatedAt: Date;
  summary?: string;
  embeddingId?: string;
}