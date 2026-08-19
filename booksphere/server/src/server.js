import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';
import { connectDatabase } from './config/db.js';

const port = Number(process.env.PORT || 5000);

async function startServer() {
  try {
    await connectDatabase();
    const server = app.listen(port, '0.0.0.0', () => {
      console.log(`📚 BookSphere running on port ${port}`);
    });

    async function shutdown(signal) {
      console.log(`${signal} received. Closing BookSphere gracefully…`);

      server.close(async () => {
        await mongoose.disconnect();
        process.exit(0);
      });

      setTimeout(() => process.exit(1), 10000).unref();
    }

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('Unable to start BookSphere:', error.message);
    process.exit(1);
  }
}
startServer();
