const mongoose = require('mongoose');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');


const errorConverter = (err, req, res, next) => {
  let error = err;
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    error = new ApiError(httpStatus.BAD_REQUEST, 'Invalid JSON payload');
  }

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};


const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (!err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
  };

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
