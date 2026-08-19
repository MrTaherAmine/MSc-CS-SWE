import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import {
  clearAuthCookie,
  createToken,
  publicUser,
  setAuthCookie
} from '../utils/auth.js';

function normalizeEmail(email = '') {
  return String(email).trim().toLowerCase();
}

export async function register(req, res, next) {
  try {
    const name = String(req.body.name || '').trim();
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || '');

    if (name.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name must contain at least 2 characters.'
      });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must contain at least 8 characters.'
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      passwordHash
    });

    const token = createToken(user);
    setAuthCookie(res, token);

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      user: publicUser(user)
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || '');

    const user = await User.findOne({ email }).select('+passwordHash');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = createToken(user);
    setAuthCookie(res, token);

    res.json({
      success: true,
      message: 'Login successful.',
      user: publicUser(user)
    });
  } catch (error) {
    next(error);
  }
}

export async function me(req, res) {
  res.json({
    success: true,
    user: publicUser(req.user)
  });
}

export async function logout(req, res) {
  clearAuthCookie(res);

  res.json({
    success: true,
    message: 'Logged out successfully.'
  });
}
