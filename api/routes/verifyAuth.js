const ResponseHandler = require("../utils/ResponseHandler");

const verifyAuth = (req, res, next) => {
  const resHandler = new ResponseHandler(res);
  if (req.user) {
    next();
  } else {
    return resHandler.error("You are not authorized!", 403);
  }
};

module.exports = { verifyAuth };
