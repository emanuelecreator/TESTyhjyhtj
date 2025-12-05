import { GoogleGenAI, Type } from "@google/genai";
import { MENU_ITEMS } from "../constants";
import { AIRecommendation } from "../types";

// Initialize Gemini
// Note: In a real production app, ensure API_KEY is set securely.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getPizzaRecommendation = async (userPreference: string): Promise<AIRecommendation | null> => {
  if (!process.env.API_KEY) {
    console.error("API Key not found");
    // Return a dummy recommendation if no key is present for demo purposes
    return {
      recommendedPizzaId: 'margherita',
      reasoning: "Modalità demo: Chiave API mancante. Ti consiglio una classica Margherita!",
      pairingSuggestion: "Birra bionda artigianale."
    };
  }

  try {
    const menuContext = MENU_ITEMS.map(p => `${p.id}: ${p.name} (${p.ingredients.join(', ')}). Desc: ${p.description}`).join('\n');

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        Sei un esperto pizzaiolo italiano e sommelier.
        
        Ecco il nostro menu:
        ${menuContext}
        
        L'utente dice: "${userPreference}"
        
        Scegli UNA sola pizza dal menu che meglio si adatta alla richiesta.
        Fornisci anche un abbinamento bevanda (vino o birra).
        Rispondi in JSON.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedPizzaId: { type: Type.STRING, description: "L'ID della pizza raccomandata (deve esistere nel menu)" },
            reasoning: { type: Type.STRING, description: "Breve spiegazione appassionata del perché questa pizza è perfetta, in Italiano." },
            pairingSuggestion: { type: Type.STRING, description: "Un abbinamento bevanda specifico." }
          },
          required: ["recommendedPizzaId", "reasoning", "pairingSuggestion"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as AIRecommendation;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
