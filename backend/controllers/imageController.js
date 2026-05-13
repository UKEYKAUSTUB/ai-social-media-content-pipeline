import { generateImageWithGemini } from "../services/imageService.js";

export const generateSocialMediaImage = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ success: false, message: "Prompt is required" });
        }

        const imageUrl = await generateImageWithGemini(prompt);

        res.status(200).json({ success: true, imageUrl });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};