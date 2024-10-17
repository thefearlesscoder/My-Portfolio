// this middle ware will the used to authenticate the admin

import { User } from "../models/user.models.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js"
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const {token} = req.cookies;
    if(!token){

        console.log("inside");
    // return res.status(24).json((new ErrorHandler("Invalid email or password", 401) )); //getting error here
        
        return res.status(200).json({
            success: false,
            message: "User not authenticated"
        });
    }

    console.log("user is autho : token : ",token);
    
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = await User.findById(decoded.id);
    next();
})