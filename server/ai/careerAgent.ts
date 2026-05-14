import { getOpenAIClient } from "../../lib/ai/openai";
import { searchKnowledgeBase } from "../../lib/ai/embeddings";

const baseSystemPrompt = `You are the Corporate Career Academy intelligent assistant. Use available academy content, mentorship data, career assessments, and program information to produce practical and actionable guidance. Always answer as a career ecosystem assistant, not a generic chatbot.

If you cannot answer from academy data, be honest and offer next steps such as career assessment, mentorship, or program exploration.`;

export async function getAgentResponse(message: string, userProfile?: Record<string, unknown>) {
  const knowledge = await searchKnowledgeBase(message);

  const prompt = [`${baseSystemPrompt}`].concat(
    knowledge ? [`\nAcademy knowledge context:\n${knowledge}`] : [],
    [`\nUser question:\n${message}`]
  ).join("\n");

  const openai = getOpenAIClient();
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: message },
    ],
    temperature: 0.2,
    max_tokens: 900,
  });

  return response.choices?.[0]?.message?.content ?? "I could not generate a response right now.";
}

export async function generateCvPackage(profile: { education: string; skills: string; experience: string; careerGoal?: string }) {
  const prompt = `${baseSystemPrompt}\n
Create an ATS-friendly CV and cover letter for the candidate below. Provide a LinkedIn summary as well.

Profile:\nEducation: ${profile.education}\nSkills: ${profile.skills}\nExperience: ${profile.experience}\nCareer goal: ${profile.careerGoal ?? "Not specified"}`;

  const openai = getOpenAIClient();
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: "Generate the CV package." },
    ],
    temperature: 0.25,
    max_tokens: 1200,
  });

  return response.choices?.[0]?.message?.content ?? "Unable to generate CV package.";
}

export async function matchMentor(goals: string, interests: string) {
  const prompt = `${baseSystemPrompt}\n
You are matching students to mentors using the following inputs:\n- Goals: ${goals}\n- Interests: ${interests}\n
Recommend 3 mentor archetypes, their expertise, and why they are a good match.`;

  const openai = getOpenAIClient();
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: "Match mentors for this learner." },
    ],
    temperature: 0.3,
    max_tokens: 800,
  });

  return response.choices?.[0]?.message?.content ?? "Unable to produce mentor recommendations.";
}
