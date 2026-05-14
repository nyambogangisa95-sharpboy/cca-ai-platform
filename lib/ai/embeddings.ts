import { openai } from "./openai";
import { PineconeClient } from "@pinecone-database/pinecone";

const pinecone = new PineconeClient();

function hasPineconeConfig() {
  return Boolean(
    process.env.PINECONE_API_KEY &&
      process.env.PINECONE_ENVIRONMENT &&
      process.env.PINECONE_INDEX_NAME
  );
}

export async function initPinecone() {
  if (!hasPineconeConfig()) {
    return null;
  }

  await pinecone.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });

  return pinecone.Index(process.env.PINECONE_INDEX_NAME!);
}

export async function getEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return response.data[0].embedding;
}

export async function searchKnowledgeBase(query: string) {
  if (!query || !hasPineconeConfig()) {
    return "";
  }

  try {
    const index = await initPinecone();
    if (!index) {
      return "";
    }

    const vector = await getEmbedding(query);
    const result = await index.query({
      queryRequest: {
        topK: 5,
        vector,
        includeMetadata: true,
        includeValues: false,
      },
    });

    return (result.matches ?? [])
      .map((match) => match.metadata?.text)
      .filter(Boolean)
      .join("\n\n");
  } catch (error) {
    console.warn("Pinecone search skipped:", error);
    return "";
  }
}

export async function upsertKnowledgeBase(
  documents: Array<{ id: string; text: string; metadata?: Record<string, unknown> }>
) {
  if (!hasPineconeConfig()) {
    return {
      success: false,
      count: 0,
      message: "Pinecone configuration is missing. Document ingestion is disabled.",
    };
  }

  const index = await initPinecone();
  if (!index) {
    return {
      success: false,
      count: 0,
      message: "Could not initialize Pinecone index.",
    };
  }

  const vectors = await Promise.all(
    documents.map(async (doc) => ({
      id: doc.id,
      values: await getEmbedding(doc.text),
      metadata: {
        ...doc.metadata,
        text: doc.text,
      },
    }))
  );

  await index.upsert({ upsertRequest: { vectors } });
  return { success: true, count: vectors.length };
}
