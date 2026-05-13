import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    brandName: {
      type: String,
    },

    platform: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model(
  "Project",
  projectSchema
);

export default Project;