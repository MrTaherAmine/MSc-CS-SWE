const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { validationResult } = require('express-validator');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');
const tagRoutes = require('./routes/tags');
const commentRoutes = require('./routes/comments');
const mediaRoutes = require('./routes/media');
const analyticsRoutes = require('./routes/analytics');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const api = `/api/${process.env.API_VERSION || 'v1'}`;

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(compression());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 }));

app.use((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
});

app.get(`${api}/health`, (req, res) => {
  res.json({ status: 'ok', service: 'EduCMS API', version: '1.0.0' });
});

app.use(`${api}/auth`, authRoutes);
app.use(`${api}/posts`, postRoutes);
app.use(`${api}/categories`, categoryRoutes);
app.use(`${api}/tags`, tagRoutes);
app.use(`${api}/comments`, commentRoutes);
app.use(`${api}/media`, mediaRoutes);
app.use(`${api}/analytics`, analyticsRoutes);

app.use('/uploads', express.static(process.env.UPLOAD_DIR || './uploads'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
