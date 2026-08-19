const db = require('../config/database');
const { generateSlug, paginate, extractExcerpt } = require('../utils/helpers');

exports.list = async (req, res, next) => {
  try {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    const search = `%${req.query.search || ''}%`;
    const status = req.query.status || null;

    const params = [search, limit, offset];
    let statusClause = '';
    if (status) {
      statusClause = 'AND p.status = $4';
      params.push(status);
    }

    const data = await db.query(`
      SELECT p.*, u.username AS author_name, c.name AS category_name
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.user_id
      LEFT JOIN categories c ON p.category_id = c.category_id
      WHERE (p.title ILIKE $1 OR p.content ILIKE $1)
      ${statusClause}
      ORDER BY p.created_at DESC
      LIMIT $2 OFFSET $3
    `, params);

    const count = await db.query(
      `SELECT COUNT(*)::int AS total FROM posts p
       WHERE (p.title ILIKE $1 OR p.content ILIKE $1)
       ${status ? 'AND p.status = $2' : ''}`,
      status ? [search, status] : [search]
    );

    res.json({ items: data.rows, page, limit, total: count.rows[0].total });
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT p.*, u.username AS author_name, c.name AS category_name
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.user_id
      LEFT JOIN categories c ON p.category_id = c.category_id
      WHERE p.post_id = $1
    `, [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ message: 'Post not found' });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      title, content, excerpt, category_id, status = 'draft',
      meta_title, meta_description, meta_keywords, is_featured = false
    } = req.body;

    const slug = generateSlug(title);
    const finalExcerpt = excerpt || extractExcerpt(content);
    const publishedAt = status === 'published' ? new Date() : null;

    const result = await db.query(`
      INSERT INTO posts
      (title, slug, content, excerpt, author_id, category_id, status, published_at,
       meta_title, meta_description, meta_keywords, is_featured)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *
    `, [
      title, slug, content, finalExcerpt, req.user.id, category_id || null, status, publishedAt,
      meta_title || null, meta_description || null, meta_keywords || null, is_featured
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') error.message = 'A post with this slug already exists';
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const current = await db.query('SELECT * FROM posts WHERE post_id = $1', [req.params.id]);
    if (!current.rows[0]) return res.status(404).json({ message: 'Post not found' });

    const p = { ...current.rows[0], ...req.body };
    const slug = req.body.title ? generateSlug(req.body.title) : p.slug;
    const publishedAt = p.status === 'published' ? (p.published_at || new Date()) : null;

    const result = await db.query(`
      UPDATE posts SET
        title=$1, slug=$2, content=$3, excerpt=$4, category_id=$5, status=$6,
        published_at=$7, meta_title=$8, meta_description=$9, meta_keywords=$10,
        is_featured=$11, updated_at=NOW()
      WHERE post_id=$12
      RETURNING *
    `, [
      p.title, slug, p.content, p.excerpt || extractExcerpt(p.content), p.category_id || null,
      p.status, publishedAt, p.meta_title || null, p.meta_description || null,
      p.meta_keywords || null, Boolean(p.is_featured), req.params.id
    ]);

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const result = await db.query('DELETE FROM posts WHERE post_id = $1 RETURNING post_id', [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ message: 'Post not found' });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
