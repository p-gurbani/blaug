const router = require("express").Router();
const ResponseHandler = require("../utils/ResponseHandler");
const upload = require("../config/multer");
const { verifyAuth } = require("./verifyAuth");

router.post("/", verifyAuth, upload.single("file"), (_, res) => {
  const resHandler = new ResponseHandler(res);
  resHandler.success({ message: "File has been uploaded." });
});

module.exports = router;
