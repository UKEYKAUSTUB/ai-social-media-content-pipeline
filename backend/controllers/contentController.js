import generateAIContent from "../services/aiService.js";

import Content from "../model/Content.js";


// GENERATE CONTENT

export const generateContent = async (req, res) => {

  try {

     const {
      projectId,
      platform,
      tone,
      contentType,
      description,
    } = req.body;

    // GENERATE AI CONTENT

    const aiText = await generateAIContent({
      platform,
      tone,
      contentType,
      description,
    });

    // SAVE TO DATABASE

     const content = await Content.create({

      user: req.user._id,

      project: projectId,

      platform,

      tone,

      contentType,

      generatedContent: aiText,
    });

    res.status(201).json(content);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET USER HISTORY
export const getContentHistory = async (req, res) => {

  try {

    const history = await Content.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(history);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// DELETE CONTENT
export const deleteContent = async (req, res) => {

  try {

    // FIND CONTENT

    const content = await Content.findById(req.params.id);

    // CHECK IF CONTENT EXISTS

    if (!content) {
      return res.status(404).json({
        message: "Content not found",
      });
    }

    // CHECK OWNERSHIP

    if (content.user.toString() !== req.user._id.toString()) {

      return res.status(401).json({
        message: "Not authorized",
      });

    }

    // DELETE CONTENT

    await content.deleteOne();

    res.json({
      success: true,
      message: "Content deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};