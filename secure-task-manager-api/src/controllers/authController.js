const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const {
  createLocalUser,
  findUserByEmail,
  safeUser
} = require("../store/userStore");
const { signToken, setTokenCookie } = require("../utils/token");

async function signup(req, res, next) {
  const { email, password, displayName } = req.body;

  if (!email || typeof email !== "string") {
    return next(new AppError("A valid email is required.", 400));
  }

  if (!password || typeof password !== "string" || password.length < 8) {
    return next(
      new AppError("Password must contain at least 8 characters.", 400)
    );
  }

  if (findUserByEmail(email)) {
    return next(new AppError("An account with this email already exists.", 409));
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = createLocalUser({
    email,
    passwordHash,
    displayName:
      typeof displayName === "string" && displayName.trim()
        ? displayName.trim()
        : email.split("@")[0]
  });

  const token = signToken(user.id);
  setTokenCookie(res, token);

  res.status(201).json({
    status: "success",
    user: safeUser(user)
  });
}

async function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required.", 400));
  }

  const user = findUserByEmail(email);

  if (!user || !user.passwordHash) {
    return next(new AppError("Invalid email or password.", 401));
  }

  const correctPassword = await bcrypt.compare(password, user.passwordHash);

  if (!correctPassword) {
    return next(new AppError("Invalid email or password.", 401));
  }

  const token = signToken(user.id);
  setTokenCookie(res, token);

  res.status(200).json({
    status: "success",
    user: safeUser(user)
  });
}

function googleCallback(req, res) {
  const token = signToken(req.user.id);
  setTokenCookie(res, token);

  res.status(200).json({
    status: "success",
    message: "Google authentication successful.",
    user: safeUser(req.user)
  });
}

function logout(req, res) {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "lax",
    secure:
      process.env.COOKIE_SECURE === "true" ||
      process.env.NODE_ENV === "production"
  });

  res.status(200).json({
    status: "success",
    message: "Logged out."
  });
}

module.exports = {
  signup,
  login,
  googleCallback,
  logout
};
