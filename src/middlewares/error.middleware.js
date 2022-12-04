const handleError = (error, req, res, next) => {
  const {status, message, errorContent} = error;
  res.status(status).json(
    {
      message,
      error: errorContent.message
    }
  )
  console.log(errorContent)
}

module.exports = handleError;

