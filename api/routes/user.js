const router = require("express").Router();
// models
const User = require("../models/User");
const Post = require("../models/Post");
// helpers
const ResponseHandler = require("../utils/ResponseHandler");
const { ERROR } = require("../utils/errorHandler");
const { sanitizeUser } = require("../utils/sanitizer");
const { verifyAuth } = require("./verifyAuth");

// Get User
router.get("/:userId", verifyAuth, async (req, res) => {
  const resHandler = new ResponseHandler(res);
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return resHandler.error(ERROR.USER.NOT_FOUND, 404);

    resHandler.success({ user: sanitizeUser(user) });
  } catch (error) {
    resHandler.error(error);
  }
});

// Update
router.put("/:id", verifyAuth, async (req, res) => {
  const resHandler = new ResponseHandler(res);
  if (req.user._id.toString() === req.params.id) {
    try {
      let { username, email, password, imageFileName } = req.body;
      let imageURL = imageFileName ? `/images/${imageFileName}` : "";

      let payload = {};
      username && (payload.username = username);
      email && (payload.email = email);
      imageURL && (payload.imageURL = imageURL);

      // update user details
      const updatedUser = await User.findByIdAndUpdate(req.params.id, payload, {
        new: true,
      });
      if (!updatedUser) return resHandler.error(ERROR.USER.NOT_FOUND, 404);

      // update password
      if (password) {
        try {
          await updatedUser.setPassword(password);
          await updatedUser.save();
        } catch (err) {
          return resHandler.error(ERROR.USER.CANNOT_SET_PASSWORD);
        }
      }
      req.login(updatedUser, () => {
        return resHandler.success({ user: sanitizeUser(updatedUser) });
      });
    } catch (error) {
      resHandler.error(error);
    }
  } else {
    resHandler.error(ERROR.UNAUTHORIZED);
  }
});

// Delete
router.delete("/:id", verifyAuth, async (req, res) => {
  const resHandler = new ResponseHandler(res);
  const userId = req.params.id;
  if (req.user._id.toString() === userId) {
    try {
      const user = await User.findById(userId);
      if (!user) resHandler.error(ERROR.USER.NOT_FOUND, 404);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(userId);

        req.logOut();
        return resHandler.success({
          message: "User has been deleted.",
        });
      } catch (error) {
        resHandler.error(error);
      }
    } catch (error) {
      resHandler.error(error);
    }
  } else {
    resHandler.error(ERROR.UNAUTHORIZED, 401);
  }
});

module.exports = router;
