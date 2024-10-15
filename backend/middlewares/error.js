class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

//making middleware to work make this handler work
export const errorMiddleware = (err, req, res, next) => {
  err.message = err.statusCode || "internal server error";
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    //11000 -> when slow internet or connection timeout or dupicate key
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Json web Token id Invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "CastError") {
    const message = `Invalid Data format`;
    err = new ErrorHandler(message, 400);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

    //to get detail about error.
    console.log(err);


    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage
    })
};

export default ErrorHandler;
