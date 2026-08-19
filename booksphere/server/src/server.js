import 'dotenv/config';
import app from './app.js';
import { connectDatabase } from './config/db.js';

const port = Number(process.env.PORT || 5000);

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => console.log(`📚 BookSphere API running on http://localhost:${port}`));
  } catch (error) {
    console.error('Unable to start BookSphere:', error.message);
    process.exit(1);
  }
}
startServer();
