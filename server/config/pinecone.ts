import { Pinecone } from "@pinecone-database/pinecone";

const indexName = "notes-index";
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string || "pcsk_2gak32_5QyBUW23cgUzn4KPTa2HSjJkDAZczxofzUUf87BZdMYb6WMdWpjpNKCbbMBfUuG",
});

let indexInstance: ReturnType<typeof pinecone.Index> | null = null;

export const initPinecone = async () => {
  const existingIndexes = await pinecone.listIndexes();
  const exists = existingIndexes.indexes?.find(index => index.name === indexName);

  if (!exists) {
    console.log(`Creating index: ${indexName}`);
    await pinecone.createIndex({
      name: indexName,
      dimension: 3072,
      metric: "cosine",
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1",
        },
      },
    });
    // await pinecone.waitUntilReady(indexName);
  }

  indexInstance = pinecone.Index(indexName);
  return indexInstance;
};

export const getPineconeIndex = async () => {
  if (!indexInstance) {
    await initPinecone();
    // throw new Error("Pinecone index is not initialized yet. Call initPinecone first.");
  }
  return indexInstance;
};
