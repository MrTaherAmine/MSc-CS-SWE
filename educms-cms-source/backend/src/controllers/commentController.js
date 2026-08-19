const db = require('../config/database');

exports.list = async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT c.*, p.title AS post_title, u.username
      FROM comments c
      LEFT JOIN posts p ON p.post_id = c.post_id
      LEFT JOIN users u ON u.user_id = c.user_id
      ORDER BY c.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) { next(error); }
};

exports.create = async (req, res, next) => {
  try {
    const { post_id, content, parent_id = null } = req.body;
    const userId = req.user?.id || null;
    const result = await db.query(
      `INSERT INTO comments (post_id, user_id, parent_id, content, status)
       VALUES ($1,$2,$3,$4,'pending') RETURNING *`,
      [post_id, userId, parent_id, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) { next(error); }
};

exports.setStatus = async (req, res, next) => {
  try {
    const allowed = ['pending', 'approved', 'spam', 'trash'];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ message: 'Invalid status' });

    const result = await db.query(
      'UPDATE comments SET status=$1, updated_at=NOW() WHERE comment_id=$2 RETURNING *',
      [req.body.status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (error) { next(error); }
};
