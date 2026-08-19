import { getPersonalizedFeed } from '../services/recommendationFeedService.js';

export async function personalizedFeed(req, res, next) {
  try {
    const result = await getPersonalizedFeed({
      userId: req.user._id,
      cursor: req.query.cursor,
      limit: req.query.limit
    });

    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
}
