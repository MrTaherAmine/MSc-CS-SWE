const db = require('../config/database');
const { generateSlug } = require('../utils/helpers');

function resource(table, idColumn) {
  return {
    list: async (req, res, next) => {
      try {
        const result = await db.query(`SELECT * FROM ${table} ORDER BY name`);
        res.json(result.rows);
      } catch (error) { next(error); }
    },
    create: async (req, res, next) => {
      try {
        const { name, description = null } = req.body;
        const result = await db.query(
          `INSERT INTO ${table} (name, slug, description) VALUES ($1,$2,$3) RETURNING *`,
          [name, generateSlug(name), description]
        );
        res.status(201).json(result.rows[0]);
      } catch (error) { next(error); }
    },
    remove: async (req, res, next) => {
      try {
        const result = await db.query(
          `DELETE FROM ${table} WHERE ${idColumn} = $1 RETURNING ${idColumn}`,
          [req.params.id]
        );
        if (!result.rows[0]) return res.status(404).json({ message: 'Not found' });
        res.status(204).end();
      } catch (error) { next(error); }
    }
  };
}

exports.categories = resource('categories', 'category_id');
exports.tags = resource('tags', 'tag_id');
