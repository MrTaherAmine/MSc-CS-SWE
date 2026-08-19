import jwt from 'jsonwebtoken';
import User from '../models/User.js';

function readToken(req) {
  const cookieName = process.env.COOKIE_NAME || 'booksphere_token';
  const cookieToken = req.cookies?.[cookieName];

  if (cookieToken) {
    return cookieToken;
  }

  const authorization = req.get('authorization') || '';

  if (authorization.startsWith('Bearer ')) {
    return authorization.slice(7);
  }

  return null;
}

async function authenticate(req, res, next, required) {
  try {
    const token = readToken(req);

    if (!token) {
      if (!required) {
        return next();
      }

      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET is not configured.');
    }

    const payload = jwt.verify(token, secret);
    const user = await User.findById(payload.sub);

    if (!user) {
      if (!required) {
        return next();
      }

      return res.status(401).json({
        success: false,
        message: 'Authentication session is no longer valid.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    ) {
      if (!required) {
        return next();
      }

      return res.status(401).json({
        success: false,
        message: 'Authentication session is invalid or expired.'
      });
    }

    next(error);
  }
}

export function requireAuth(req, res, next) {
  return authenticate(req, res, next, true);
}

export function optionalAuth(req, res, next) {
  return authenticate(req, res, next, false);
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to access this resource.'
      });
    }

    next();
  };
}
