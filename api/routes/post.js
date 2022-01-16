const router = require("express").Router();
// models
const User = require("../models/User");
const Post = require("../models/Post");
// helpers
const ResponseHandler = require("../utils/ResponseHandler");
const { ERROR } = require("../utils/errorHandler");
const { verifyAuth } = require("./verifyAuth");

// Insert Post
router.post("/", verifyAuth, async (req, res) => {
  const resHandler = new ResponseHandler(res);
  try {
    const { title, desc, image, username, categories } = req.body;

    const user = await User.findOne({ username });
    if (!user) return resHandler.error(ERROR.USER.NOT_FOUND, 404);

    const post = new Post({
      title,
      desc,
      imageURL: image ? "/images/" + image : "",
      username,
      categories,
    });

    const savedPost = await post.save();
    resHandler.success({ post: savedPost });
  } catch (error) {
    resHandler.error(error);
  }
});

// Update Post
router.put("/:postId", verifyAuth, async (req, res) => {
  const resHandler = new ResponseHandler(res);
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return resHandler.error(ERROR.POST.NOT_FOUND, 404);

    if (post.username === req.user.username) {
      const { title, desc, imageURL, categories } = req.body;
      title && (post.title = title);
      desc && (post.desc = desc);
      imageURL !== null && imageURL !== undefined && (post.imageURL = imageURL);
      categories && (post.categories = categories);

      const savedPost = await post.save();
      resHandler.success({ post: savedPost });
    } else {
      resHandler.error(ERROR.UNAUTHORIZED, 401);
    }
  } catch (error) {
    resHandler.error(error);
  }
});

// Delete Post
router.delete("/:postId", verifyAuth, async (req, res) => {
  const resHandler = new ResponseHandler(res);
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return resHandler.error(ERROR.POST.NOT_FOUND, 404);

    if (post.username === req.user.username) {
      await post.delete();
      resHandler.success({ message: "Post has been deleted." });
    } else {
      resHandler.error(ERROR.UNAUTHORIZED, 401);
    }
  } catch (error) {
    resHandler.error(error);
  }
});

// Get Post
router.get("/:postId", async (req, res) => {
  const resHandler = new ResponseHandler(res);
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return resHandler.error(ERROR.POST.NOT_FOUND, 404);

    resHandler.success({ post });
  } catch (error) {
    resHandler.error(error);
  }
});

// Get All Posts
router.get("/", async (req, res) => {
  const resHandler = new ResponseHandler(res);
  const { user: username, category } = req.query;
  try {
    let query = {};
    username && (query.username = username);
    category && (query.categories = { $in: [category.toLowerCase()] });

    const posts = await Post.find(query, { __v: 0 });
    resHandler.success({ posts });
  } catch (error) {
    resHandler.error(error);
  }
});

module.exports = router;
