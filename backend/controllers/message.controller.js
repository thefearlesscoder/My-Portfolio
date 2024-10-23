import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/message.models.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { senderName, subject, message } = req.body; //{} iske ander ke variables same hone chaiye jaisa schema mein hain

  if (!senderName || !subject || !message) {
    return next(new ErrorHandler("Please fill full form", 400));
  }

  const data = await Message.create({
    senderName,
    subject,
    message,
  });
  res.status(200).json({
    success: true,
    message: "message sent",
    data,
  });
});


export const getAllMessages = catchAsyncErrors(async(req, res, next) => {
    const messages = await Message.find(); //yahan Message mein 'M' hai kyon ?? -> gave error in 'm'
    //Message wale model ke ander jitne bhi message hain unko get kr dega
    res.status(200).json({
        success: true,
        messages,   
    })
})

export const deleteMessage = catchAsyncErrors(async(req,res,next) =>{
    const {id} = req.params;
    const message = await Message.findById(id);
    if(!message){
      return res.status(400).json({
        success: false,
        message: "Message not found",
        })
    }

    await message.deleteOne();
    res.status(200).json({
        success: true,
        message: "message deleted",
    })
})

//message deletion authority is only for admin so to ensure this we need to create a middleware 

