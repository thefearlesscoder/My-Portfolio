import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Software } from "../models/software.models.js";
import { v2 as clodinary} from "cloudinary" //cloudinary spelling mistake

export const addNewApp = catchAsyncErrors(async(req, res, next) =>{
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Software icon/svg required",
        })
      }

      const { svg } = req.files;
      const {name} = req.body;

      if(!name){
        return res.status(400).json({
            success: false,
            message: "Name is required",
        })
      }

      const cloudinaryResponse = await clodinary.uploader.upload(
        svg.tempFilePath,
        { folder: "Portfolii_software_app" }
      );

      if (!cloudinaryResponse|| cloudinaryResponse.error) {
        console.error(
          "Cluoudinary Error : ",
          cloudinaryResponse.error || "unknowm cloudinary error"
        );
      }

      const softwareApp = await Software.create(({
        svg:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
      }))

      res.status(200).json({
        success:true,
        message: "Software App added successfully",
        softwareApp,
      })
})

export const deleteApp = catchAsyncErrors(async(req, res, next) =>{
    const {id} = req.params
    const software = await Software.findById(id);
    if(!software){
        return res.status(404).json({
            success: false,
            message: "Software App not found",
        })
    }
    const softwareAppSvg = software.svg.public_id;

    await clodinary.uploader.destroy(softwareAppSvg)
    await software.deleteOne();
    res.status(200).json({
        success: true,
        message: "Software App deleted successfully",
    })
})

export const getAllApp = catchAsyncErrors(async(req, res, next) =>{
	const software = await Software.find();
  res.status(200).json({
    success: true,
    software,
  });
})