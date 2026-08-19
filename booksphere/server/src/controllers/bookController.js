import mongoose from 'mongoose';
import Book from '../models/Book.js';
import Rating from '../models/Rating.js';
import Recommendation from '../models/Recommendation.js';
import { searchOpenLibrary } from '../services/openLibraryService.js';

function isValidBookId(bookId) {
  return mongoose.isObjectIdOrHexString(bookId);
}

function createRatingSummary(rows = []) {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let total = 0;
  let weightedSum = 0;

  rows.forEach(row => {
    const value = Number(row._id);
    const count = Number(row.count);

    if (value >= 1 && value <= 5) {
      distribution[value] = count;
      total += count;
      weightedSum += value * count;
    }
  });

  return {
    average: total ? Number((weightedSum / total).toFixed(1)) : 0,
    count: total,
    distribution
  };
}

async function getRatingSummary(bookId) {
  const rows = await Rating.aggregate([
    { $match: { book: new mongoose.Types.ObjectId(bookId) } },
    { $group: { _id: '$value', count: { $sum: 1 } } }
  ]);

  return createRatingSummary(rows);
}

export async function searchBooks(req, res, next) {
  try {
    const result = await searchOpenLibrary({
      query: req.query.q,
      type: req.query.type || 'all',
      limit: req.query.limit || 20
    });

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    if (
      error.message.includes('at least 2 characters') ||
      error.message.includes('Search type')
    ) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    next(error);
  }
}

export async function getBookDetails(req, res, next) {
  try {
    if (!isValidBookId(req.params.bookId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid book identifier.'
      });
    }

    const [book, ratingSummary, recommendations, userRating] = await Promise.all([
      Book.findById(req.params.bookId).lean(),
      getRatingSummary(req.params.bookId),
      Recommendation.find({
        book: req.params.bookId,
        visibility: 'public'
      })
        .populate('user', 'name avatarUrl')
        .sort({ createdAt: -1 })
        .limit(20)
        .lean(),
      req.user
        ? Rating.findOne({
            book: req.params.bookId,
            user: req.user._id
          }).lean()
        : Promise.resolve(null)
    ]);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found.'
      });
    }

    res.json({
      success: true,
      data: {
        book: {
          ...book,
          averageRating: ratingSummary.average,
          ratingsCount: ratingSummary.count
        },
        ratingSummary,
        userRating: userRating?.value || null,
        recommendations
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function rateBook(req, res, next) {
  try {
    if (!isValidBookId(req.params.bookId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid book identifier.'
      });
    }

    const value = Number(req.body.rating);

    if (!Number.isInteger(value) || value < 1 || value > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be a whole number between 1 and 5.'
      });
    }

    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found.'
      });
    }

    const rating = await Rating.findOneAndUpdate(
      { user: req.user._id, book: book._id },
      { $set: { value } },
      { upsert: true, new: true, runValidators: true }
    );

    const ratingSummary = await getRatingSummary(book._id);

    await Book.updateOne(
      { _id: book._id },
      {
        $set: {
          averageRating: ratingSummary.average,
          ratingsCount: ratingSummary.count
        }
      }
    );

    res.json({
      success: true,
      message: 'Rating saved successfully.',
      data: {
        userRating: rating.value,
        ratingSummary
      }
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Your rating is already being processed. Please try again.'
      });
    }

    next(error);
  }
}
