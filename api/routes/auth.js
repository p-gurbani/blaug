const router = require("express").Router();
const User = require("../models/User");
const ResponseHandler = require("../utils/ResponseHandler");
const passport = require("passport");
const { sanitizeUser } = require("../utils/sanitizer");
const { verifyAuth } = require("./verifyAuth");

// Register
router.post("/register", async (req, res) => {
  const resHandler = new ResponseHandler(res);
  try {
    const { username, email, password, referralCode } = req.body;
    if (referralCode !== process.env.REFERRAL_CODE) {
      return resHandler.error("Referral code is incorrect!");
    }

    const newUser = new User({ username, email });
    // uses passport-local-mongoose (register method)
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, () => {
      resHandler.success({ user: sanitizeUser(registeredUser) });
    });
  } catch (error) {
    resHandler.error(error);
  }
});

// Login
router.post("/login", passport.authenticate("local"), (req, res) => {
  const resHandler = new ResponseHandler(res);
  resHandler.success({ user: req.user });
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URI);
});

// get session
router.get("/session", verifyAuth, (req, res) => {
  const resHandler = new ResponseHandler(res);
  resHandler.success({ user: req.user });
});

module.exports = router;
