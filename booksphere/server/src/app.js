import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import feedRoutes from './routes/feedRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const clientDistPath = path.resolve(currentDirectory, '../../client/dist');
const configuredOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');

if (isProduction) {
  app.set('trust proxy', 1);
}

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: https://covers.openlibrary.org; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'"
  );

  if (isProduction) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  next();
});

app.use(
  cors((req, callback) => {
    const origin = req.header('Origin');
    let isSameOrigin = false;

    if (origin) {
      try {
        isSameOrigin = new URL(origin).host === req.get('host');
      } catch {
        isSameOrigin = false;
      }
    }

    const isAllowed =
      !origin || isSameOrigin || configuredOrigins.includes(origin);

    callback(null, {
      origin: isAllowed ? origin || false : false,
      credentials: true
    });
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  res.status(databaseConnected ? 200 : 503).json({
    success: databaseConnected,
    service: 'BookSphere API',
    status: databaseConnected ? 'ready' : 'degraded',
    database: databaseConnected ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/users', userRoutes);

if (isProduction) {
  app.use(
    express.static(clientDistPath, {
      index: false,
      setHeaders(res, filePath) {
        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    })
  );

  app.use((req, res, next) => {
    const acceptsHtml = req.accepts('html');

    if (req.method === 'GET' && acceptsHtml && !req.path.startsWith('/api')) {
      res.setHeader('Cache-Control', 'no-cache');
      return res.sendFile(path.join(clientDistPath, 'index.html'));
    }

    return next();
  });
}

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found.'
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === 'production'
        ? 'Internal server error.'
        : error.message
  });
});

export default app;
