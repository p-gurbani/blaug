const express = require("express");
const path = require("path");
const passport = require("./passport");
const cookieSession = require("cookie-session");
const server = express();

server.use(
  cookieSession({
    name: "blaug_sess",
    keys: [process.env.SESSION_SECRET],
    maxAge: 259200000,
  })
);

server.use(passport.initialize());
server.use(passport.session());

server.use(express.json());
server.use("/images", express.static(path.join(__dirname, "../images")));

// serve frontend
server.use(express.static(path.join(__dirname, "../client/build")));

module.exports = server;
