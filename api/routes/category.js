const router = require("express").Router();
// models
const Category = require("../models/Category");
// helpers
const ResponseHandler = require("../utils/ResponseHandler");
const { ERROR } = require("../utils/errorHandler");

// Insert Category
router.post("/", async (req, res) => {
  const resHandler = new ResponseHandler(res);
  try {
    const { name } = req.body;
    if (!name) return resHandler.error(ERROR.REQUEST.INVALID, 400);

    const newCategory = new Category({ name: name.toLowerCase() });
    const category = await newCategory.save();

    resHandler.success({ category });
  } catch (error) {
    resHandler.error(error);
  }
});

// Get All Categories
router.get("/", async (_, res) => {
  const resHandler = new ResponseHandler(res);
  try {
    const categories = await Category.find({}, { __v: 0 });
    resHandler.success({ categories });
  } catch (error) {
    resHandler.error(error);
  }
});

module.exports = router;
