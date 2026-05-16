## Plan: Continue Building Corporate Career Academy AI Agent

TL;DR: scaffold the missing Node/TypeScript project, wire the AI backend into an Express API, add RAG support and agent endpoints, then verify with local requests.

**Steps**
1. Create the project manifest and TypeScript config in the repository root.
   - `package.json` with dependencies for `express`, `openai`, `@pinecone-database/pinecone`, `dotenv`, `cors`, `typescript`, and dev tools.
   - `tsconfig.json` for Node + ES module support.
   - `.env.example` for `OPENAI_API_KEY`, `PINECONE_API_KEY`, `PINECONE_ENVIRONMENT`, `PINECONE_INDEX_NAME`, and optional `PORT`.

2. Add the Express server entrypoint.
   - Create `server/index.ts`.
   - Load environment variables via `dotenv`.
   - Register JSON body parsing, CORS, and the AI router.
   - Expose API routes under `/api/ai`.

3. Add the AI router and backend endpoints.
   - Create `server/routes/ai.ts` with endpoints for `/chat`, `/cv`, and `/mentor-match`.
   - Validate request bodies and return structured JSON responses.

4. Improve the AI agent and RAG support.
   - Confirm `lib/ai/openai.ts` uses the OpenAI SDK correctly and supports `process.env.OPENAI_API_KEY`.
   - Enhance `lib/ai/embeddings.ts` to initialize Pinecone safely, generate embedded vectors, and perform knowledge-base search.
   - Keep the existing `server/ai/careerAgent.ts` and make it the orchestration layer for agent responses, CV generation, and mentor matching.

5. Add a minimal RAG ingestion helper.
   - Create a service for ingesting academy content, FAQs, mentor profiles, and career documents into Pinecone.
   - This can be a simple function that embeds content and upserts metadata into an index.

6. Verify the implementation.
   - Install packages and run the server with `npm run dev` or equivalent.
   - Call `/api/ai/chat`, `/api/ai/cv`, and `/api/ai/mentor-match` with test JSON.
   - Ensure the agent returns valid text and the `OPENAI_API_KEY`/Pinecone variables are loaded.

**Relevant files**
- `lib/ai/openai.ts` — existing OpenAI client wrapper.
- `lib/ai/embeddings.ts` — existing embedding and Pinecone search helper.
- `server/ai/careerAgent.ts` — existing agent orchestration logic.
- `server/routes/ai.ts` — should hold the Express route implementations.
- `server/index.ts` — should hold the Express server bootstrap.

**Verification**
1. Confirm `package.json` exists and dependencies install cleanly.
2. Confirm `tsconfig.json` compiles the TypeScript backend.
3. Launch the server and call each AI endpoint with sample payloads.
4. Validate that `searchKnowledgeBase` does not throw on empty or missing Pinecone config.

**Decisions**
- Continue with an Express backend and AI service layer first, because the current workspace contains only backend AI code and no frontend scaffold.
- Keep the agent design aligned with the Corporate Career Academy use case: career guidance, mentor matching, CV generation, and RAG-enabled answers.
- Defer Next.js frontend pages until the backend API is stable.

**Further Considerations**
1. Confirm whether you want this repo to become a full Next.js app, or only a backend AI service for now.
2. Confirm whether the Pinecone vector store should be mocked if the live service is unavailable.
3. Confirm if you want built-in education/career content ingestion now, or just the API framework.
