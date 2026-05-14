import { upsertKnowledgeBase } from "./embeddings";

export interface KnowledgeDocument {
  id: string;
  text: string;
  metadata?: Record<string, unknown>;
}

export async function ingestKnowledgeDocuments(documents: KnowledgeDocument[]) {
  if (!Array.isArray(documents) || documents.length === 0) {
    return {
      success: false,
      count: 0,
      message: "No documents provided for ingestion.",
    };
  }

  return upsertKnowledgeBase(documents);
}
