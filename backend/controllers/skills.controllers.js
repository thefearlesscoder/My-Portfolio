import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Skill } from "../models/skills.models.js";
import { v2 as cloudinary } from "cloudinary";

export const addSkill = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Skill icon/svg required",
    });
  }

  const { svg } = req.files;
  const { title, proficiency } = req.body;

  if (!title || !proficiency) {
    return res.status(400).json({
      success: false,
      message: "title and proficiency required",
    });
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    {
      folder: "Portfolio_Skills_svgs",
    }
  );

  console.log("hehehe");

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cluoudinary Error : ",
      cloudinaryResponse.error || "unknowm cloudinary error"
    );
  }

  const skill = await Skill.create({
    title,
    proficiency,
    svg: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "Skill added successfully",
    skill,
  });
});

export const deleteSkill = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const skill = await Skill.findById(id);
  if (!skill) {
    return res.status(404).json({
      success: false,
      message: "Skill not found",
    });
  }
  const skillSvgId = skill.svg.public_id;

  await cloudinary.uploader.destroy(skillSvgId);
  await skill.deleteOne();
  res.status(200).json({
    success: true,
    message: "Skill deleted successfully",
  });
});

export const updateSkill = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let skill = await Skill.findById(id);
  if (!skill) {
    res.status(404).json({
      success: false,
      message: "Skill not found",
    });
  }
  const { proficiency } = req.body;

  skill = await Skill.findByIdAndUpdate(
    id,
    { proficiency },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Skill updated successfully",
    skill,
  });
});

export const getAllSkill = catchAsyncErrors(async (req, res, next) => {
  const skills = await Skill.find();
  res.status(200).json({
    success: true,
    skills,
  });
});
