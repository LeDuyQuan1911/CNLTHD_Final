
const sendToken = (user, statusCode, res) => {
  console.log("token ne");
  const token = user.getJwtToken();
  const expireDays = parseInt(process.env.COOKIE_EXPIRE) || 7;
  const options = {
      expires: new Date(Date.now() + expireDays * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;