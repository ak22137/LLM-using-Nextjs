import { GoogleGenerativeAI } from "@google/generative-ai";

// Prefer server-side secret if available
const API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
export const DEFAULT_TEXT_MODEL = process.env.GEMINI_TEXT_MODEL || "gemini-2.0-flash"; // updated model
export const DEFAULT_IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-1.5-flash";

export function getGenAI() {
  if (!API_KEY) throw new Error("Gemini API key missing");
  return new GoogleGenerativeAI(API_KEY);
}

export function getTextModel(model: string = DEFAULT_TEXT_MODEL) {
  return getGenAI().getGenerativeModel({ model });
}

export function getImageModel(model: string = DEFAULT_IMAGE_MODEL) {
  return getGenAI().getGenerativeModel({ model });
}
