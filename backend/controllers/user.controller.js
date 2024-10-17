import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.models.js";
import { v2 as clodinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("No files were uploaded", 400));
  }

  const { avatar } = req.files;

  //upload avatar to cloudinary
  const cloudinaryResponseForAvatar = await clodinary.uploader.upload(
    avatar.tempFilePath,
    { folder: "AVATAR" }
  );

  //   console.log(cloudinaryResponseForAvatar);
  if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
    console.error(
      "Cluoudinary Error : ",
      cloudinaryResponseForAvatar.error || "unknowm cloudinary error"
    );
  }

  const { resume } = req.files;
  //upload resume to cloudiary
  const cloudinaryResponseForResume = await clodinary.uploader.upload(
    resume.tempFilePath,
    { folder: "RESUME" }
  );

  if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
    console.error(
      "Cluoudinary Error : ",
      cloudinaryResponseForResume.error || "unknowm cloudinary error"
    );
  }

  const {
    fullName,
    email,
    aboutMe,
    phone,
    password,
    portfolioURL,
    githubURL,
  } = req.body;

  const user = await User.create({
    fullName,
    email,
    aboutMe,
    phone,
    password,
    portfolioURL,
    githubURL,
    avatar: {
      public_id: cloudinaryResponseForAvatar.public_id,
      url: cloudinaryResponseForAvatar.secure_url,
    },
    resume: {
      public_id: cloudinaryResponseForResume.public_id,
      url: cloudinaryResponseForResume.secure_url,
    },
  });

  console.log("user: ", user);

  generateToken(user, "User registered", 201, res);
  /* 
    
    const {fullName, email, phone, password, avatar, resume, portfolioURL, githubURL, linkedInURL, instagramURL} = req.body;

    //validate data
    if(!fullName ||!email ||!phone ||!password ||!avatar ||!resume ||!portfolioURL){
        return next(new ErrorHandler("Please fill all required fields", 400))
    }

    //check if email already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        return next(new ErrorHandler("Email already exists", 400))
    }

    //upload avatar and resume to cloudinary
    const avatarResult = await uploadToCloudinary(avatar);
    const resumeResult = await uploadToCloudinary(resume);

    //create user
    const user = await User.create({
        fullName,
        email,
        phone,
        password,
        avatar: {
            public_id: avatarResult.public_
        }})

    */
});

// creating user login

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("email and Password are required", 400));
  }

  const user = await User.findOne({ email }).select("+password"); //note this line

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 404));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  generateToken(user, "User logged in", 200, res);
});
