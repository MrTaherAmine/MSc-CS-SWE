const db = require('../config/database');

exports.list = async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT m.*, u.username AS uploaded_by_name
      FROM media m
      LEFT JOIN users u ON u.user_id = m.uploaded_by
      ORDER BY m.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) { next(error); }
};

exports.upload = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No valid file uploaded' });

    const f = req.file;
    const result = await db.query(`
      INSERT INTO media
      (filename, original_name, file_path, file_type, file_size, mime_type, uploaded_by)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
    `, [
      f.filename, f.originalname, f.path, f.mimetype.split('/')[0], f.size, f.mimetype, req.user.id
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) { next(error); }
};
