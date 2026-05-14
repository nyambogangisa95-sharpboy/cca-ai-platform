import express from "express";
import { getAgentResponse, generateCvPackage, matchMentor } from "../ai/careerAgent";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message, userProfile } = req.body;
    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Request body must contain a non-empty message." });
    }

    const answer = await getAgentResponse(message, userProfile);
    return res.json({ answer });
  } catch (error) {
    console.error("AI chat error", error);
    return res.status(500).json({ error: "Failed to generate response." });
  }
});

router.post("/cv", async (req, res) => {
  try {
    const { education, skills, experience, careerGoal } = req.body;
    if (!education || !skills || !experience) {
      return res.status(400).json({ error: "education, skills, and experience are required." });
    }

    const document = await generateCvPackage({ education, skills, experience, careerGoal });
    return res.json({ document });
  } catch (error) {
    console.error("CV generation error", error);
    return res.status(500).json({ error: "Failed to generate CV package." });
  }
});

router.post("/mentor-match", async (req, res) => {
  try {
    const { goals, interests } = req.body;
    if (!goals || !interests) {
      return res.status(400).json({ error: "goals and interests are required." });
    }

    const mentorRecommendations = await matchMentor(goals, interests);
    return res.json({ mentorRecommendations });
  } catch (error) {
    console.error("Mentor matching error", error);
    return res.status(500).json({ error: "Failed to match mentors." });
  }
});

export default router;
