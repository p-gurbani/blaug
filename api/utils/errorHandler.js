exports.ERROR = {
  GET: "Couldn't retrieve item(s)",
  INSERT: "Couldn't insert item(s)",
  UPDATE: "Couldn't update item(s)",
  DELETE: "Couldn't delete item(s)",
  RESOURCE_NOT_FOUND: "404. Resource not found",
  WRONG_CREDENTIALS: "Those are wrong credentials :(",
  UNAUTHORIZED: "You are not authorized to perform this action",
  USER: {
    NOT_FOUND: "User not found.",
    CANNOT_SET_PASSWORD: "Could not set password",
  },
  POST: {
    NOT_FOUND: "Post not found.",
  },
  REQUEST: {
    INVALID: "Invalid request.",
  },
};

exports.generateSuccessResponse = (statusCode, data, extraInfo) => {
  let res = {
    success: true,
    error: false,
    statusCode,
  };
  data && (res = { ...res, ...data });
  extraInfo && (res = { ...res, ...extraInfo });
  return res;
};

exports.generateErrorResponse = (statusCode, error, extraInfo) => {
  if (error && error.message) {
    error = error.message;
    if (error.includes("Cast to ObjectId failed")) {
      error = exports.ERROR.RESOURCE_NOT_FOUND;
    }
  }
  let res = {
    success: false,
    error: true,
    statusCode,
    error,
  };
  extraInfo && (res = { ...res, ...extraInfo });
  return res;
};

exports.throwErr = (err) => {
  throw new Error(err);
};
