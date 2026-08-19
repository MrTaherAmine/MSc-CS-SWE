import Book from '../models/Book.js';
import Like from '../models/Like.js';
import Recommendation from '../models/Recommendation.js';

export async function listRecommendations(req, res, next) {
  try {
    const safeLimit = Math.min(Math.max(Number(req.query.limit) || 24, 1), 50);
    const recommendations = await Recommendation.find({ visibility: 'public' })
      .populate('book')
      .populate('user', 'name avatarUrl')
      .sort({ createdAt: -1, _id: -1 })
      .limit(safeLimit)
      .lean();
    const recommendationIds = recommendations.map(item => item._id);
    const likes = req.user && recommendationIds.length
      ? await Like.find({
          user: req.user._id,
          recommendation: { $in: recommendationIds }
        }).select('recommendation').lean()
      : [];
    const likedIds = new Set(likes.map(item => String(item.recommendation)));
    const data = recommendations.map(item => ({
      ...item,
      likedByMe: likedIds.has(String(item._id))
    }));

    res.json({
      success: true,
      count: data.length,
      data
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

    const title = String(book?.title || '').trim();
    const authors = Array.isArray(book?.authors)
      ? book.authors.map(value => String(value).trim()).filter(Boolean)
      : [];
    const description = String(book?.description || '').trim();
    const note = String(recommendationText || '').trim();
    const numericRating = Number(rating);

    if (title.length < 1) {
      return res.status(400).json({
        success: false,
        message: 'Book title is required.'
      });
    }

    if (authors.length < 1) {
      return res.status(400).json({
        success: false,
        message: 'At least one author is required.'
      });
    }

    if (description.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Book description must contain at least 10 characters.'
      });
    }

    if (note.length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Recommendation note must contain at least 3 characters.'
      });
    }

    if (
      !Number.isFinite(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
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
        title,
        authors,
        description,
        coverUrl: String(book.coverUrl || '').trim(),
        isbn10: String(book.isbn10 || '').trim(),
        isbn13: String(book.isbn13 || '').trim(),
        genres: Array.isArray(book.genres)
          ? book.genres.map(value => String(value).trim()).filter(Boolean)
          : [],
        publishedDate: String(
          book.publishedDate ||
          book.firstPublishYear ||
          ''
        ).trim()
      });
    } else if (!savedBook.description && description) {
      savedBook.description = description;
      await savedBook.save();
    }

    const recommendation = await Recommendation.create({
      user: req.user._id,
      book: savedBook._id,
      recommendationText: note,
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
