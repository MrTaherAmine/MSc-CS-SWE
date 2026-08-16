const express = require("express");
const rateLimit = require("express-rate-limit");
const catchAsync = require("../utils/catchAsync");
const {
  signup,
  login,
  googleCallback,
  logout
} = require("../controllers/authController");
const { passport } = require("../config/passport");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    status: "fail",
    message: "Too many login attempts. Please try again later."
  }
});

router.post("/signup", catchAsync(signup));
router.post("/login", loginLimiter, catchAsync(login));

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/google/failure"
  }),
  googleCallback
);

router.get("/google/failure", (req, res) => {
  res.status(401).json({
    status: "fail",
    message: "Google authentication failed."
  });
});

router.post("/logout", logout);

module.exports = router;
