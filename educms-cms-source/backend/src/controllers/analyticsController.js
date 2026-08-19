const db = require('../config/database');

exports.summary = async (req, res, next) => {
  try {
    const [posts, users, comments, views] = await Promise.all([
      db.query(`SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE status='published')::int AS published,
        COUNT(*) FILTER (WHERE status='draft')::int AS drafts
        FROM posts`),
      db.query(`SELECT COUNT(*)::int AS total FROM users WHERE is_active = true`),
      db.query(`SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE status='pending')::int AS pending
        FROM comments`),
      db.query(`SELECT COALESCE(SUM(view_count),0)::int AS total FROM posts`)
    ]);

    res.json({
      posts: posts.rows[0],
      users: users.rows[0].total,
      comments: comments.rows[0],
      views: views.rows[0].total
    });
  } catch (error) { next(error); }
};
