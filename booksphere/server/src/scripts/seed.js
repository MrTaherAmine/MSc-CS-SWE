import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/db.js';
import Book from '../models/Book.js';
import Recommendation from '../models/Recommendation.js';

async function seed() {
  await connectDatabase();
  await Recommendation.deleteMany({});
  await Book.deleteMany({});
  const book = await Book.create({
    source: 'manual', title: 'Clean Code', authors: ['Robert C. Martin'],
    description: 'A practical book about writing maintainable software.',
    genres: ['Software Engineering', 'Programming']
  });
  await Recommendation.create({
    book: book._id,
    recommendationText: 'A useful introduction to readable, maintainable, and disciplined software development.',
    rating: 5,
    tags: ['software-engineering', 'clean-code']
  });
  console.log('✅ Seed data created');
  await mongoose.disconnect();
}
seed().catch(async error => { console.error(error); await mongoose.disconnect(); process.exit(1); });
