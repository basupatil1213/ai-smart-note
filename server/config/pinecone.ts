import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
    apiKey: "pcsk_2gak32_5QyBUW23cgUzn4KPTa2HSjJkDAZczxofzUUf87BZdMYb6WMdWpjpNKCbbMBfUuG"// || process.env.PINECONE_API_KEY as string,
});

const indexName = "notes-index";//process.env.PINECONE_INDEX_NAME as string;

await pinecone.createIndex({
    name: indexName,
    spec: {
       serverless: {
        cloud: "aws",
        region: "us-east-1"
       }
    },
    dimension: 3072,
    metric: "cosine"
})

const index = pinecone.Index(indexName);

export default index;