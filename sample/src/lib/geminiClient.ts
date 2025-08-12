import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

export const genAI = new GoogleGenerativeAI(API_KEY);

export function getTextModel() {
  return genAI.getGenerativeModel({ model: "gemini-pro" });
}

export function getImageModel() {
  return genAI.getGenerativeModel({ model: "gemini-pro-vision" });
}
