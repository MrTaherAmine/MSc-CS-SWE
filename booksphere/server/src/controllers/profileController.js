import mongoose from 'mongoose';
import Comment from '../models/Comment.js';
import Follow from '../models/Follow.js';
import Like from '../models/Like.js';
import User from '../models/User.js';

function validId(value) {
  return mongoose.isObjectIdOrHexString(value);
}

export async function getProfile(req, res, next) {
  try {
    const { userId } = req.params;
    if (!validId(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user identifier.' });
    }

    const [user, followersCount, followingCount, likes, comments, followers, isFollowing] = await Promise.all([
      User.findById(userId).select('name bio avatarUrl favoriteGenres createdAt').lean(),
      Follow.countDocuments({ following: userId }),
      Follow.countDocuments({ follower: userId }),
      Like.find({ user: userId })
        .populate({
          path: 'recommendation',
          match: { visibility: 'public' },
          populate: [
            { path: 'book' },
            { path: 'user', select: 'name avatarUrl' }
          ]
        })
        .sort({ createdAt: -1 })
        .limit(40)
        .lean(),
      Comment.find({ user: userId })
        .populate({
          path: 'recommendation',
          match: { visibility: 'public' },
          populate: { path: 'book', select: 'title authors coverUrl' }
        })
        .sort({ createdAt: -1 })
        .limit(30)
        .lean(),
      Follow.find({ following: userId })
        .populate('follower', 'name avatarUrl bio')
        .sort({ createdAt: -1 })
        .limit(30)
        .lean(),
      req.user && String(req.user._id) !== String(userId)
        ? Follow.exists({ follower: req.user._id, following: userId })
        : Promise.resolve(null)
    ]);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const likedBooks = [];
    const seenBooks = new Set();
    likes.forEach(like => {
      const recommendation = like.recommendation;
      const bookId = recommendation?.book?._id;
      if (bookId && !seenBooks.has(String(bookId))) {
        seenBooks.add(String(bookId));
        likedBooks.push({
          likedAt: like.createdAt,
          recommendationId: recommendation._id,
          book: recommendation.book,
          recommendedBy: recommendation.user
        });
      }
    });

    res.json({
      success: true,
      data: {
        user,
        counts: {
          followers: followersCount,
          following: followingCount,
          likedBooks: likedBooks.length,
          comments: comments.filter(item => item.recommendation).length
        },
        isFollowing: Boolean(isFollowing),
        likedBooks,
        comments: comments.filter(item => item.recommendation),
        followers: followers.map(item => item.follower).filter(Boolean)
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function toggleFollow(req, res, next) {
  try {
    const { userId } = req.params;
    if (!validId(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user identifier.' });
    }
    if (String(req.user._id) === String(userId)) {
      return res.status(400).json({ success: false, message: 'You cannot follow yourself.' });
    }
    if (!(await User.exists({ _id: userId }))) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const removed = await Follow.findOneAndDelete({
      follower: req.user._id,
      following: userId
    });
    let following = false;

    if (!removed) {
      await Follow.create({ follower: req.user._id, following: userId });
      following = true;
    }

    const followersCount = await Follow.countDocuments({ following: userId });
    res.json({ success: true, data: { following, followersCount } });
  } catch (error) {
    if (error?.code === 11000) {
      const followersCount = await Follow.countDocuments({ following: req.params.userId });
      return res.json({ success: true, data: { following: true, followersCount } });
    }
    next(error);
  }
}

export async function updateMyPreferences(req, res, next) {
  try {
    const bio = String(req.body.bio || '').trim();
    const favoriteGenres = Array.isArray(req.body.favoriteGenres)
      ? [...new Set(req.body.favoriteGenres
          .map(value => String(value).trim())
          .filter(Boolean))]
      : [];

    if (bio.length > 500) {
      return res.status(400).json({ success: false, message: 'Bio cannot exceed 500 characters.' });
    }
    if (favoriteGenres.length > 10 || favoriteGenres.some(genre => genre.length > 60)) {
      return res.status(400).json({
        success: false,
        message: 'Choose up to 10 genres, each no longer than 60 characters.'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { bio, favoriteGenres } },
      { new: true, runValidators: true }
    ).select('name bio avatarUrl favoriteGenres createdAt');

    res.json({
      success: true,
      message: 'Reading preferences updated.',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
}
