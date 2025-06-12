import { ChatOllama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { OllamaEmbeddings } from "@langchain/ollama";



const chatModel = new ChatOllama({
  baseUrl: "http://localhost:11434",  // default Ollama endpoint
  model: "llama3.2:latest"                     // or "mistral", "gemma", etc.
});

export async function generateSummary(content: string) {
  const prompt = PromptTemplate.fromTemplate(
    "Summarize the following note in 2-3 lines:\n\n{content}"
  );
  const input = await prompt.format({ content });
  const response = await chatModel.invoke(input);
  return String(response.content).trim();
}

export async function generateTags(content: string) {
  const prompt = PromptTemplate.fromTemplate(
    "Generate 3 short, relevant tags (comma-separated) for this note:\n\n{content} and just return the tags separated by commas"
  );
  const input = await prompt.format({ content });
  const response = await chatModel.invoke(input);
  console.log("tags response", response);
  return String(response.content).trim().split(",");
}

export async function generateEmbedding(content: string) {
  const embeddings = new OllamaEmbeddings({
    model: "llama3.2:latest"
  });
  const vector = await embeddings.embedQuery(content);
  return vector;
}
