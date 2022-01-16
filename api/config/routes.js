// import routes
const authRoute = require("../routes/auth");
const userRoute = require("../routes/user");
const postRoute = require("../routes/post");
const categoryRoute = require("../routes/category");
const uploadRoute = require("../routes/upload");

module.exports = (server) => {
  server.use("/api/auth", authRoute);
  server.use("/api/users", userRoute);
  server.use("/api/posts", postRoute);
  server.use("/api/categories", categoryRoute);
  server.use("/api/upload", uploadRoute);
};
