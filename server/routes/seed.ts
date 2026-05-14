import express from "express";
import { ingestKnowledgeDocuments } from "../../lib/ai/ingestion";

const router = express.Router();

router.post("/documents", async (req, res) => {
  try {
    const { documents } = req.body;
    if (!Array.isArray(documents) || documents.length === 0) {
      return res.status(400).json({ error: "documents must be a non-empty array." });
    }

    const normalized = documents.map((doc: any) => ({
      id: String(doc.id ?? `${Date.now()}-${Math.random()}`),
      text: String(doc.text ?? ""),
      metadata: doc.metadata ?? {},
    }));

    const result = await ingestKnowledgeDocuments(normalized);
    return res.json(result);
  } catch (error) {
    console.error("Knowledge ingestion error", error);
    return res.status(500).json({ error: "Failed to ingest documents." });
  }
});

export default router;
