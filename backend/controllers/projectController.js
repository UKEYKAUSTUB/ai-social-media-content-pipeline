import Project from "../model/Project.js";
import Content from "../model/Content.js";


// CREATE PROJECT

export const createProject = async (req, res) => {

  try {

    const {
      name,
      description,
      brandName,
      platform,
    } = req.body;

    const project = await Project.create({

      user: req.user._id,

      name,

      description,

      brandName,

      platform,
    });

    res.status(201).json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// GET USER PROJECTS

export const getProjects = async (req, res) => {

  try {

    const projects = await Project.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// DELETE PROJECT

export const deleteProject = async (req, res) => {

  try {

    const project = await Project.findById(
      req.params.id
    );

    if (!project) {

      return res.status(404).json({
        message: "Project not found",
      });

    }

    // OWNERSHIP CHECK

    if (
      project.user.toString() !==
      req.user._id.toString()
    ) {

      return res.status(401).json({
        message: "Not authorized",
      });

    }

    await project.deleteOne();

    res.json({
      success: true,
      message: "Project deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const getProjectContent = async (
  req,
  res
) => {

  try {

    const content = await Content.find({
      project: req.params.projectId,
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(content);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};