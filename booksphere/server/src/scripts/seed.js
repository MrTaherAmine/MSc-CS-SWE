import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/db.js';
import Book from '../models/Book.js';
import Comment from '../models/Comment.js';
import Follow from '../models/Follow.js';
import Like from '../models/Like.js';
import Recommendation from '../models/Recommendation.js';
import Rating from '../models/Rating.js';
import User from '../models/User.js';

async function seed() {
  await connectDatabase();

  await Recommendation.deleteMany({});
  await Comment.deleteMany({});
  await Like.deleteMany({});
  await Follow.deleteMany({});
  await Rating.deleteMany({});
  await Book.deleteMany({});
  await User.deleteMany({
    email: { $in: ['demo@booksphere.local', 'reader@booksphere.local'] }
  });

  const passwordHash = await bcrypt.hash('Demo1234!', 12);

  const user = await User.create({
    name: 'BookSphere Demo',
    email: 'demo@booksphere.local',
    passwordHash,
    favoriteGenres: ['Software Engineering', 'Technology']
  });

  const reader = await User.create({
    name: 'Amina Reader',
    email: 'reader@booksphere.local',
    passwordHash,
    bio: 'Exploring software, leadership, and thoughtful nonfiction.',
    favoriteGenres: ['Technology', 'Leadership', 'Nonfiction']
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

  const pragmaticProgrammer = await Book.create({
    source: 'manual',
    title: 'The Pragmatic Programmer',
    authors: ['David Thomas', 'Andrew Hunt'],
    description:
      'A practical guide to adaptable thinking, craftsmanship, and sustainable software development.',
    genres: ['Software Engineering', 'Technology'],
    averageRating: 4.7,
    ratingsCount: 1
  });

  const pragmaticRecommendation = await Recommendation.create({
    user: reader._id,
    book: pragmaticProgrammer._id,
    recommendationText:
      'A timeless guide for developing the judgment and habits of an effective software professional.',
    rating: 5,
    tags: ['software-engineering', 'technology'],
    likesCount: 1,
    commentsCount: 1
  });

  await Rating.create({
    user: user._id,
    book: book._id,
    value: 5
  });

  await Rating.create({
    user: user._id,
    book: pragmaticProgrammer._id,
    value: 5
  });

  await Like.create({
    user: user._id,
    recommendation: pragmaticRecommendation._id
  });

  await Comment.create({
    user: user._id,
    recommendation: pragmaticRecommendation._id,
    body: 'The focus on deliberate practice makes this recommendation especially useful.'
  });

  await Follow.create({ follower: user._id, following: reader._id });

  book.averageRating = 5;
  book.ratingsCount = 1;
  await book.save();

  console.log('✅ Phase 5 seed data created');
  console.log('Demo login: demo@booksphere.local / Demo1234!');

  await mongoose.disconnect();
}

seed().catch(async error => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
