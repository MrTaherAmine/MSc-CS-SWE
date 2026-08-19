import mongoose from 'mongoose';

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not configured.');

  mongoose.connection.on('connected', () => console.log('✅ MongoDB connected'));
  mongoose.connection.on('error', error => console.error('❌ MongoDB error:', error.message));
  mongoose.connection.on('disconnected', () => console.warn('⚠️ MongoDB disconnected'));

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10,
    minPoolSize: 0,
    maxIdleTimeMS: 30000
  });
  return mongoose.connection;
}
