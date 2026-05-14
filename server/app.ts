import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import aiRoutes from "./routes/ai";
import seedRoutes from "./routes/seed";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/ai", aiRoutes);
app.use("/api/seed", seedRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "cca-ai-platform" });
});

export default app;
