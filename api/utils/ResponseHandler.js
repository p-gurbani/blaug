const {
  generateSuccessResponse,
  generateErrorResponse,
} = require("./errorHandler");

class ResponseHandler {
  constructor(response) {
    this.res = response;
    this.sendResponse = this.sendResponse.bind(this);
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
  }

  sendResponse(result) {
    return this.res.status(result.statusCode).json(result);
  }

  success(data, statusCode) {
    statusCode = statusCode || 200;
    this.sendResponse(generateSuccessResponse(statusCode, data));
  }

  error(error, statusCode) {
    statusCode = statusCode || 500;
    console.log(error);
    this.sendResponse(generateErrorResponse(statusCode, error));
  }
}

module.exports = ResponseHandler;
