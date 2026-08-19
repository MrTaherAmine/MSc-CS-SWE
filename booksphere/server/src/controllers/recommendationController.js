import Book from '../models/Book.js';
import Recommendation from '../models/Recommendation.js';

export async function listRecommendations(req, res, next) {
  try {
    const recommendations = await Recommendation.find({ visibility: 'public' })
      .populate('book')
      .populate('user', 'name avatarUrl')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: recommendations.length,
      data: recommendations
    });
  } catch (error) {
    next(error);
  }
}

export async function createRecommendation(req, res, next) {
  try {
    const {
      book,
      recommendationText,
      rating,
      tags = []
    } = req.body;

    if (!book?.title) {
      return res.status(400).json({
        success: false,
        message: 'book.title is required.'
      });
    }

    if (!recommendationText || String(recommendationText).trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Recommendation text must contain at least 3 characters.'
      });
    }

    const numericRating = Number(rating);

    if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5.'
      });
    }

    let savedBook = null;

    if (book.externalId) {
      savedBook = await Book.findOne({
        externalId: book.externalId,
        source: book.source || 'manual'
      });
    }

    if (!savedBook) {
      savedBook = await Book.create({
        externalId: book.externalId || undefined,
        source: book.source || 'manual',
        title: book.title,
        authors: book.authors || [],
        description: book.description || '',
        coverUrl: book.coverUrl || '',
        isbn10: book.isbn10 || '',
        isbn13: book.isbn13 || '',
        genres: book.genres || [],
        publishedDate: book.publishedDate || ''
      });
    }

    const recommendation = await Recommendation.create({
      user: req.user._id,
      book: savedBook._id,
      recommendationText: String(recommendationText).trim(),
      rating: numericRating,
      tags
    });

    const populated = await recommendation.populate([
      { path: 'book' },
      { path: 'user', select: 'name avatarUrl' }
    ]);

    res.status(201).json({
      success: true,
      data: populated
    });
  } catch (error) {
    next(error);
  }
}
