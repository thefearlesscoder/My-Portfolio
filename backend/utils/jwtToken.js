export const generateToken = (user, message, statusCode, res) =>{

  // console.log("inside token generation");
  
    const token = user.getJwtToken();

    // console.log("token is " + token);
    

    res.status(statusCode).cookie("token", token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 *1000),
      httpOnly: true,
    }).json({
        success: true,
        message,
        token,
        user,
    })
}
