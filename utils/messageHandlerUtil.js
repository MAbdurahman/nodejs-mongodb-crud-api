const messageHandler = (res, success, error, statusCode = 400) =>
   res.status(statusCode).json({
      success: false,
      message: error,
      statusCode: statusCode
   });

export default messageHandler;