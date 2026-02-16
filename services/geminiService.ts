
import { GoogleGenAI } from "@google/genai";
import { Job } from "../types";

export class GeminiService {
  /**
   * Summarizes a job posting using Gemini 3 Flash.
   * Note: We instantiate GoogleGenAI inside the method to ensure it always uses the most up-to-date API key.
   */
  async summarizeJob(job: Job): Promise<string> {
    try {
      // Use process.env.API_KEY directly as required.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a catchy, 2-sentence summary for this job to attract applicants. 
        Job Title: ${job.title}
        Category: ${job.category}
        Pay: ${job.pay}/${job.payFrequency}
        Description: ${job.description}
        Tags: ${job.tags.join(', ')}`,
        config: {
            systemInstruction: "You are a professional recruiting assistant for non-office, high-speed jobs. Keep it energetic and brief."
        }
      });
      // Access the .text property directly.
      return response.text || "Unlock this local opportunity and start earning today!";
    } catch (error) {
      console.error("Gemini failed:", error);
      return "Unlock this local opportunity and start earning today!";
    }
  }
}

export const geminiService = new GeminiService();
