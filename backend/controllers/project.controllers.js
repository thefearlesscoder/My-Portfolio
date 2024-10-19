import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Project } from "../models/project.models.js";
import { v2 as cloudinary } from "cloudinary";

export const addProject = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Project Banner Image Required!", 404));
  }
  const { projectBanner } = req.files;
  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    stack,
    technologies,
    deployed,
  } = req.body;
  if (
    !title ||
    !description ||
    !gitRepoLink ||
    !projectLink ||
    !stack ||
    !technologies ||
    !deployed
  ) {
    return res.status(404).json({
      success: false,
      message: "All fields are required!",
    });
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    projectBanner.tempFilePath,
    { folder: "PORTFOLIO PROJECT IMAGES" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload avatar to Cloudinary", 500));
  }
  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    stack,
    technologies,
    deployed,
    projectBanner: {
      public_id: cloudinaryResponse.public_id, // Set your cloudinary public_id here
      url: cloudinaryResponse.secure_url, // Set your cloudinary secure_url here
    },
  });
  res.status(201).json({
    success: true,
    message: "New Project Added!",
    project,
  });
});

export const updateProject = catchAsyncErrors(async (req, res, next) => {
  const newProjectData = {
    title: req.body.title,
    description: req.body.description,
    gitRepoLink: req.body.gitRepoLink,
    projectLink: req.body.projectLink,
    stack: req.body.stack,
    technologies: req.body.technologies,
    deployed: req.body.deployed,
  };

  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;
    const project = await Project.findById(req.params.id);
    const projectBannerId = project.projectBanner.public_id;
    await cloudinary.uploader.destroy(projectBannerId);

    const cloudinaryResponse = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      { folder: "PORTFOLIO PROJECT IMAGES" }
    );
    newProjectData.projectBanner = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { newProjectData },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    project,
  })
});

export const deleteProject = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    if(!project){
        return res.status(404).json({
            success: false,
            message: "Project not found",
        })
    }
    const projectBannerId = project.projectBanner.public_id;
    
    await cloudinary.uploader.destroy(projectBannerId);

    await Project.deleteOne();

    res.status(200).json({
        success: true,
        message: "Project deleted successfully",
    })
});

export const getAllProject = catchAsyncErrors(async (req, res, next) => {
  const projects = await Project.find();
  res.status(200).json({
    success: true,
    projects,
  });
});

export const getProjectById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
});
