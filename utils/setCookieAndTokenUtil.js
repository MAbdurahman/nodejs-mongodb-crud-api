
export default function setCookieAndToken(user, res, statusCode) {
   const token = user.generateJsonWebToken();

   /************************* options for cookie *************************/
   const options = {
      expires: new Date(
         Date.now() + process.env.COOKIE_EXPIRES_TIME
      ),
      httpOnly: true
   }

   res.status(statusCode).cookie('access_token', token, options).json({
      success: true,
      token,
      user
   })

}