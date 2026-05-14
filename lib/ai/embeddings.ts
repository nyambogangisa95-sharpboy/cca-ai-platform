import { getOpenAIClient } from "./openai";
import { Pinecone } from "@pinecone-database/pinecone";

function getPineconeConfig() {
  const apiKey = process.env.PINECONE_API_KEY;
  const controllerHostUrl =
    process.env.PINECONE_CONTROLLER_HOST ||
    (process.env.PINECONE_ENVIRONMENT
      ? `https://controller.${process.env.PINECONE_ENVIRONMENT}.pinecone.io`
      : undefined);

  return {
    apiKey,
    controllerHostUrl,
    indexName: process.env.PINECONE_INDEX_NAME,
  };
}

function hasPineconeConfig() {
  const { apiKey, controllerHostUrl, indexName } = getPineconeConfig();
  return Boolean(apiKey && controllerHostUrl && indexName);
}

export async function initPinecone() {
  if (!hasPineconeConfig()) {
    return null;
  }

  const { apiKey, controllerHostUrl, indexName } = getPineconeConfig();

  const pinecone = new Pinecone({
    apiKey: apiKey!,
    controllerHostUrl: controllerHostUrl!,
  });

  return pinecone.index(indexName!);
}

export async function getEmbedding(text: string) {
  const openai = getOpenAIClient();
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
      topK: 5,
      vector,
      includeMetadata: true,
      includeValues: false,
    });

    return (result.matches ?? [])
      .map((match: any) => match.metadata?.text)
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

  await index.upsert(vectors);
  return { success: true, count: vectors.length };
}
