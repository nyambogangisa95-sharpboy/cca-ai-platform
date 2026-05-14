# Corporate Career Academy AI Platform

This repository contains the backend and starter web interface for the Corporate Career Academy AI platform.

## Local Setup

1. Copy `.env.example` to `.env` and add your OpenAI + Pinecone credentials.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate Prisma client:
   ```bash
   npm run db:generate
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open the UI at:
   ```
   http://localhost:4000/app-ui.html
   ```

## GitHub Push

From your local development machine with git configured:

```bash
cd /path/to/cca-ai-platform
git init            # only if not already a git repo
git add .
git commit -m "Initial Corporate Career Academy AI platform"
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

## Vercel Deployment

1. Sign in to Vercel and create a new project.
2. Connect your GitHub repository.
3. Set environment variables in Vercel to match `.env.example`.
4. No extra build command is required; Vercel will detect the Node app.

The repository is already configured for Vercel with `vercel.json` and a serverless wrapper in `api/index.ts`.

If you want to deploy manually, use this Vercel config:

```json
{
  "version": 2,
  "builds": [
    { "src": "api/index.ts", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "api/index.ts" }
  ]
}
```

Then set these Vercel environment variables:

- `OPENAI_API_KEY`
- `PINECONE_API_KEY`
- `PINECONE_ENVIRONMENT`
- `PINECONE_INDEX_NAME`
- `PORT=4000`
- `DATABASE_URL="file:./dev.db"` (optional)

## Available Endpoints

- `GET /health`
- `POST /api/ai/chat`
- `POST /api/ai/cv`
- `POST /api/ai/mentor-match`
- `POST /api/seed/documents`

## Notes

- `OPENAI_API_KEY` is required for AI endpoints.
- Pinecone is optional; if not configured, RAG search will be disabled.
- `DATABASE_URL` is included for Prisma but not required to run the server.
