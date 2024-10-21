import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.models.js";
import { v2 as clodinary } from "cloudinary"; //cloudinary ki spelling wrong hai
import { generateToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

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

  const { fullName, email, aboutMe, phone, password, portfolioURL, githubURL } =
    req.body;

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

//logout user
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User logged out",
    });
});

//get user
export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({
    success: true,
    user,
  });
});

//updating profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    fullName: req.body.fullName,
    email: req.body.email,
    aboutMe: req.body.aboutMe,
    phone: req.body.phone,

    portfolioURL: req.body.portfolioURL,
    githubURL: req.body.githubURL,
  };

  if (req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    const user = await User.findById(req.user.id);
    const profileImageId = user.avatar.public_id;
    await clodinary.uploader.destroy(profileImageId);

    const cloudinaryResponse = await clodinary.uploader.upload(
      avatar.tempFilePath,
      { folder: "AVATAR" }
    );
    newUserData.avatar = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }
  if (req.files && req.files.resume) {
    const resume = req.files.resume;
    const user = await User.findById(req.user.id);
    const resumeId = user.resume.public_id;
    await clodinary.uploader.destroy(resumeId);

    const cloudinaryResponse = await clodinary.uploader.upload(
      resume.tempFilePath,
      { folder: "RESUME" }
    );
    newUserData.resume = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    succes: true,
    message: "profile updates successfully",
    user,
  });
});

//reset password

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  if (!confirmNewPassword || !newPassword || !currentPassword) {
    // return next(new ErrorHandler("Please fill all required fields", 400));
    //error can come here
    return res.status(400).json({
      sucess: false,
      message: "all fiels required",
    });
  }
  const user = await User.findByIdAndUpdate(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(currentPassword);

  if (!isPasswordMatched) {
    // return next(new ErrorHandler("incorrect current password", 400))
    return res.status(400).json({
      sucess: false,
      message: "current pass did not match",
    });
  }
  if (newPassword !== confirmNewPassword) {
    // return next(new ErrorHandler("new Passowrds must be same", 400))
    return res.status(400).json({
      sucess: false,
      message: "new passwords must be same",
    });
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: " password updates successfully",
  });
});

//get profile for porrtforlio
export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
  const id = "670f5800d2634867a840c1c2"; // copy form DB
  const user = await User.findById(id);

  res.status(200).json({
    sucess: true,
    user,
  });
});

//forgot passoword
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "enter valid email ID",
    });
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforSave: false });

  const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;

  const message = `Your reset password token is: \n\n ${resetPasswordUrl} \n\n If you have not requested, 
        please ignore!!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Personal Portfolio password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();

    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.params
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }, //$gt --> greater than
    })
    if(!user){
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      })
    }
    if(!req.body.password || !req.body.confirmPassword){
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      })
    }
    if(req.body.password !== req.body.confirmPassword){
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      })
    }

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    generateToken(user, "User password reset successfull", 200, res);
});
