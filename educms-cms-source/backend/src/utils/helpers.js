const slugify = require('slugify');

function generateSlug(value) {
  return slugify(value || '', { lower: true, strict: true, trim: true });
}

function paginate(page = 1, limit = 10) {
  page = Math.max(1, Number(page) || 1);
  limit = Math.min(100, Math.max(1, Number(limit) || 10));
  return { page, limit, offset: (page - 1) * limit };
}

function extractExcerpt(html = '', length = 180) {
  const text = html.replace(/<[^>]*>/g, '').trim();
  return text.length <= length ? text : `${text.slice(0, length).trim()}...`;
}

module.exports = { generateSlug, paginate, extractExcerpt };
