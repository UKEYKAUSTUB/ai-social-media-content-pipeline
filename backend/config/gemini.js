import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
   process.env.API_KEY || process.env.GEMINI_API_KEY 
);

export default genAI;