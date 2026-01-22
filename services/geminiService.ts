
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from "../constants";

export const getGeminiRecommendation = async (userPrompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Create a context of our store's products to help the AI recommend
  const productContext = PRODUCTS.map(p => 
    `ID: ${p.id}, Name: ${p.name}, Price: ${p.price}, Rating: ${p.rating}, Description: ${p.description}`
  ).join('\n');

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
      System: You are 'SabMilta AI Shopping Assistant'. You help customers find products from the SabMilta catalog.
      
      Catalog:
      ${productContext}
      
      Instructions:
      1. Be helpful, friendly, and professional.
      2. Recommend 1-3 specific products from the catalog that match the user's needs.
      3. Explain why you are recommending them.
      4. If no exact match exists, recommend the closest alternative.
      5. Answer in a helpful conversational tone.
      
      User Prompt: "${userPrompt}"
    `,
  });

  return response.text;
};
