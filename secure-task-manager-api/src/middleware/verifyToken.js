const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const { findUserById, safeUser } = require("../store/userStore");

function verifyToken(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AppError("Authentication required.", 401));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"]
    });

    const user = findUserById(payload.sub);

    if (!user) {
      return next(new AppError("User for this token no longer exists.", 401));
    }

    req.user = safeUser(user);
    next();
  } catch (error) {
    next(new AppError("Invalid or expired authentication token.", 401));
  }
}

module.exports = verifyToken;
