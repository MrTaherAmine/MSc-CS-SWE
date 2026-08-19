const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await db.query(
      'SELECT user_id, username, email, password_hash, first_name, last_name, role, is_active FROM users WHERE email = $1',
      [email]
    );
    const user = result.rows[0];
    if (!user || !user.is_active || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    await db.query('UPDATE users SET last_login = NOW() WHERE user_id = $1', [user.user_id]);

    const token = jwt.sign(
      { id: user.user_id, email: user.email, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    delete user.password_hash;
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};

exports.me = async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT user_id, username, email, first_name, last_name, role, bio, avatar, created_at, last_login FROM users WHERE user_id = $1',
      [req.user.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
