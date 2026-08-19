import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/db.js';
import Book from '../models/Book.js';
import Recommendation from '../models/Recommendation.js';
import Rating from '../models/Rating.js';
import User from '../models/User.js';

async function seed() {
  await connectDatabase();

  await Recommendation.deleteMany({});
  await Rating.deleteMany({});
  await Book.deleteMany({});
  await User.deleteMany({ email: 'demo@booksphere.local' });

  const passwordHash = await bcrypt.hash('Demo1234!', 12);

  const user = await User.create({
    name: 'BookSphere Demo',
    email: 'demo@booksphere.local',
    passwordHash,
    favoriteGenres: ['Software Engineering', 'Technology']
  });

  const book = await Book.create({
    source: 'manual',
    title: 'Clean Code',
    authors: ['Robert C. Martin'],
    description:
      'A practical software engineering book about writing readable and maintainable code.',
    genres: ['Software Engineering', 'Programming']
  });

  await Recommendation.create({
    user: user._id,
    book: book._id,
    recommendationText:
      'A useful introduction to readable, maintainable, and disciplined software development.',
    rating: 5,
    tags: ['software-engineering', 'clean-code']
  });

  await Rating.create({
    user: user._id,
    book: book._id,
    value: 5
  });

  book.averageRating = 5;
  book.ratingsCount = 1;
  await book.save();

  console.log('✅ Phase 4 seed data created');
  console.log('Demo login: demo@booksphere.local / Demo1234!');

  await mongoose.disconnect();
}

seed().catch(async error => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
