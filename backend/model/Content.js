import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    platform: {
      type: String,
      required: true,
    },

    tone: {
      type: String,
      required: true,
    },

    contentType: {
      type: String,
      required: true,
    },

    generatedContent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model(
  "Content",
  contentSchema
);

export default Content;