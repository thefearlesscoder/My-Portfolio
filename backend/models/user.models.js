import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      minlength: [2, "Full Name should be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    aboutMe: {
      type: String,
      required: [true, "This is required"],
      minlength: [10, "atleast 10 charaters required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      minlength: [10, "Phone number should be 10 digits long"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "password should be at least 6 characters long"],
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    resume: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    portfolioURL: {
      type: String,
      required: [true, "portfolioURL is required"],
    },
    githubURL: String,
    linkedInURL: String,
    instagramURl: String,
    resetPasswordToken: String,
    resetPasswordExpired: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
/* IMP NOTE: 
    
Arrow Function Syntax: You can't use an arrow function (async () => {}) here because 
in the Mongoose pre middleware, this refers to the document being saved,
 and arrow functions don’t bind their own this.
  By using a regular function expression, 
  this refers to the current instance of the document.*/

//compare emtered password with saved password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generate JWT
userSchema.methods.getJwtToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });

  return token;
};

//generate reset password token
export const User = mongoose.model("User", userSchema);
