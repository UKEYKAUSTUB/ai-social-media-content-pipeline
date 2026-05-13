import genAI from "../config/gemini.js";

const generateAIContent = async ({
  platform,
  tone,
  contentType,
  description,
}) => {

  // SELECT MODEL

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
  });

  // CREATE PROMPT

  const prompt = `
You are an expert social media marketer.

Generate a ${platform} ${contentType}.


Tone:
${tone}

Description:
${description}

Also include:
- catchy hooks
- emojis if needed
- hashtags
- call to action
`;

  // GENERATE RESPONSE

  const result = await model.generateContent(prompt);

  const response = await result.response;

  return response.text();
};

export default generateAIContent;