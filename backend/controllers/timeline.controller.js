import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Timeline } from "../models/timeline.models.js";
import ErrorHandler from "../middlewares/error.js";

export const postTimeline = catchAsyncErrors(async (req, res, next) => {
  const { title, description, from, to } = req.body;
  const newtimeline = await Timeline.create({
    title,
    description,
    timeline: { from, to },
  });
  res.status(201).json({
    success: true,
    message: "timeline added",
    newtimeline,
  });
});

export const deleteTimeline = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const timeline = await Timeline.findById(id);
    if (!timeline) {
      return next(new ErrorHandler("timeline not found", 404));
    }
    await timeline.deleteOne();
    res.status(200).json({
      success: true,
      message: "timeline deleted",
    });
  
});

export const getAllTimeline = catchAsyncErrors(async (req, res, next) => {
    const timelines = await Timeline.find();
    res.status(200).json({
      success: true,
      timelines,
    });
});
