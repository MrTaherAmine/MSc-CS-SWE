import mongoose from 'mongoose';
import Comment from '../models/Comment.js';
import Like from '../models/Like.js';
import Recommendation from '../models/Recommendation.js';

function validId(value) {
  return mongoose.isObjectIdOrHexString(value);
}

async function findPublicRecommendation(recommendationId) {
  return Recommendation.findOne({
    _id: recommendationId,
    visibility: 'public'
  });
}

export async function toggleLike(req, res, next) {
  try {
    const { recommendationId } = req.params;
    if (!validId(recommendationId)) {
      return res.status(400).json({ success: false, message: 'Invalid recommendation identifier.' });
    }

    const recommendation = await findPublicRecommendation(recommendationId);
    if (!recommendation) {
      return res.status(404).json({ success: false, message: 'Recommendation not found.' });
    }

    const removed = await Like.findOneAndDelete({
      user: req.user._id,
      recommendation: recommendation._id
    });
    let liked = false;

    let updatedRecommendation;
    if (removed) {
      updatedRecommendation = await Recommendation.findByIdAndUpdate(
        recommendation._id,
        { $inc: { likesCount: -1 } },
        { new: true }
      ).select('likesCount');
    } else {
      await Like.create({
        user: req.user._id,
        recommendation: recommendation._id
      });
      updatedRecommendation = await Recommendation.findByIdAndUpdate(
        recommendation._id,
        { $inc: { likesCount: 1 } },
        { new: true }
      ).select('likesCount');
      liked = true;
    }

    res.json({
      success: true,
      data: { liked, likesCount: Math.max(0, updatedRecommendation.likesCount) }
    });
  } catch (error) {
    if (error?.code === 11000) {
      const recommendation = await Recommendation.findById(req.params.recommendationId).lean();
      return res.json({
        success: true,
        data: { liked: true, likesCount: recommendation?.likesCount || 0 }
      });
    }
    next(error);
  }
}

export async function listComments(req, res, next) {
  try {
    const { recommendationId } = req.params;
    if (!validId(recommendationId)) {
      return res.status(400).json({ success: false, message: 'Invalid recommendation identifier.' });
    }

    const safeLimit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 50);
    const query = { recommendation: recommendationId };

    if (req.query.before) {
      const before = new Date(req.query.before);
      if (Number.isNaN(before.getTime())) {
        return res.status(400).json({ success: false, message: 'Invalid comment cursor.' });
      }
      query.createdAt = { $lt: before };
    }

    const comments = await Comment.find(query)
      .populate('user', 'name avatarUrl')
      .sort({ createdAt: -1, _id: -1 })
      .limit(safeLimit)
      .lean();

    res.json({ success: true, data: comments });
  } catch (error) {
    next(error);
  }
}

export async function createComment(req, res, next) {
  try {
    const { recommendationId } = req.params;
    const body = String(req.body.body || '').trim();

    if (!validId(recommendationId)) {
      return res.status(400).json({ success: false, message: 'Invalid recommendation identifier.' });
    }
    if (!body || body.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Comment must contain between 1 and 1000 characters.'
      });
    }

    const recommendation = await findPublicRecommendation(recommendationId);
    if (!recommendation) {
      return res.status(404).json({ success: false, message: 'Recommendation not found.' });
    }

    const comment = await Comment.create({
      user: req.user._id,
      recommendation: recommendation._id,
      body
    });
    const updatedRecommendation = await Recommendation.findByIdAndUpdate(
      recommendation._id,
      { $inc: { commentsCount: 1 } },
      { new: true }
    ).select('commentsCount');
    await comment.populate('user', 'name avatarUrl');

    res.status(201).json({
      success: true,
      data: { comment, commentsCount: updatedRecommendation.commentsCount }
    });
  } catch (error) {
    next(error);
  }
}

export async function recordShare(req, res, next) {
  try {
    const { recommendationId } = req.params;
    if (!validId(recommendationId)) {
      return res.status(400).json({ success: false, message: 'Invalid recommendation identifier.' });
    }

    const recommendation = await Recommendation.findOneAndUpdate(
      { _id: recommendationId, visibility: 'public' },
      { $inc: { sharesCount: 1 } },
      { new: true }
    ).select('sharesCount');

    if (!recommendation) {
      return res.status(404).json({ success: false, message: 'Recommendation not found.' });
    }

    res.json({ success: true, data: { sharesCount: recommendation.sharesCount } });
  } catch (error) {
    next(error);
  }
}
