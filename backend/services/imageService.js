import { GoogleGenAI } from "@google/genai";

// Initialize using your existing API key from .env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY,});

export const generateImageWithGemini = async (prompt) => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: "image/jpeg",
                // You can change aspect ratio: "1:1", "3:4", "4:3", "9:16", or "16:9"
                aspectRatio: "1:1"
            },
        });

        // The image comes back as a base64 encoded string
        const base64Image = response.generatedImages[0].image.imageBytes;

        // Format it so the frontend can display it directly in an <img> tag
        return `data:image/jpeg;base64,${base64Image}`;

    } catch (error) {
        console.error("Gemini Image Generation Error:", error);
        throw new Error("Failed to generate image with Gemini");
    }
};