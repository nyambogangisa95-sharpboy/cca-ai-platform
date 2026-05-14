export interface ChatRequest {
  message: string;
  userProfile?: Record<string, unknown>;
}

export interface ChatResponse {
  answer: string;
}

export interface CvRequest {
  education: string;
  skills: string;
  experience: string;
  careerGoal?: string;
}

export interface MentorMatchRequest {
  goals: string;
  interests: string;
}

export interface MentorMatchResponse {
  mentorRecommendations: string;
}
