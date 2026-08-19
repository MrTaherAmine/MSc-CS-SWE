import Book from '../models/Book.js';
import Follow from '../models/Follow.js';
import Like from '../models/Like.js';
import Rating from '../models/Rating.js';
import Recommendation from '../models/Recommendation.js';
import User from '../models/User.js';

const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 24;

function normalize(value = '') {
  return String(value).trim().toLowerCase();
}

function addWeight(map, key, weight) {
  const normalized = normalize(key);
  if (normalized) map.set(normalized, (map.get(normalized) || 0) + weight);
}

export function encodeFeedCursor(item) {
  return Buffer.from(`${new Date(item.createdAt).toISOString()}|${item._id}`)
    .toString('base64url');
}

export function decodeFeedCursor(cursor) {
  if (!cursor) return null;

  try {
    const [createdAt, id] = Buffer.from(cursor, 'base64url')
      .toString('utf8')
      .split('|');
    const date = new Date(createdAt);

    if (!id || Number.isNaN(date.getTime())) return null;
    return { createdAt: date, id };
  } catch {
    return null;
  }
}

export function scoreRecommendation(recommendation, signals, now = Date.now()) {
  const book = recommendation.book || {};
  const matchedGenres = [];
  const matchedAuthors = [];
  let score = 1;

  (book.genres || []).forEach(genre => {
    const weight = signals.genres.get(normalize(genre)) || 0;
    if (weight) {
      score += weight;
      matchedGenres.push(genre);
    }
  });

  (book.authors || []).forEach(author => {
    const weight = signals.authors.get(normalize(author)) || 0;
    if (weight) {
      score += weight;
      matchedAuthors.push(author);
    }
  });

  if (signals.following.has(String(recommendation.user?._id))) score += 4;

  score += Number(book.averageRating || 0) * 0.45;
  score += Math.log1p(Number(recommendation.likesCount || 0)) * 0.55;
  score += Math.log1p(Number(recommendation.commentsCount || 0)) * 0.4;

  const ageDays = Math.max(
    0,
    (now - new Date(recommendation.createdAt).getTime()) / 86_400_000
  );
  score += Math.max(0, 2.5 - ageDays / 14);

  let reason = 'Popular with the BookSphere community';
  if (signals.following.has(String(recommendation.user?._id))) {
    reason = `Because you follow ${recommendation.user.name}`;
  } else if (matchedGenres.length) {
    reason = `Matches your interest in ${matchedGenres[0]}`;
  } else if (matchedAuthors.length) {
    reason = `More from ${matchedAuthors[0]}`;
  }

  return { score: Number(score.toFixed(3)), reason };
}

async function buildSignals(userId) {
  const [user, likes, ratings, follows] = await Promise.all([
    User.findById(userId).select('favoriteGenres').lean(),
    Like.find({ user: userId }).select('recommendation').sort({ createdAt: -1 }).limit(100).lean(),
    Rating.find({ user: userId }).select('book value').sort({ updatedAt: -1 }).limit(100).lean(),
    Follow.find({ follower: userId }).select('following').limit(500).lean()
  ]);

  const likedRecommendationIds = likes.map(item => item.recommendation);
  const likedRecommendations = likedRecommendationIds.length
    ? await Recommendation.find({ _id: { $in: likedRecommendationIds } })
        .select('book')
        .lean()
    : [];

  const likedBookIds = likedRecommendations.map(item => item.book);
  const ratingByBook = new Map(
    ratings.map(item => [String(item.book), Number(item.value)])
  );
  const signalBookIds = [...new Set([
    ...likedBookIds.map(String),
    ...ratings.map(item => String(item.book))
  ])];
  const books = signalBookIds.length
    ? await Book.find({ _id: { $in: signalBookIds } })
        .select('genres authors')
        .lean()
    : [];

  const genres = new Map();
  const authors = new Map();
  (user?.favoriteGenres || []).forEach(genre => addWeight(genres, genre, 4));

  const likedBookSet = new Set(likedBookIds.map(String));
  books.forEach(book => {
    const likedWeight = likedBookSet.has(String(book._id)) ? 2.5 : 0;
    const ratingWeight = ratingByBook.has(String(book._id))
      ? ratingByBook.get(String(book._id)) / 2.5
      : 0;
    const totalWeight = likedWeight + ratingWeight;

    book.genres.forEach(genre => addWeight(genres, genre, totalWeight));
    book.authors.forEach(author => addWeight(authors, author, totalWeight * 0.55));
  });

  return {
    genres,
    authors,
    following: new Set(follows.map(item => String(item.following)))
  };
}

export async function getPersonalizedFeed({ userId, cursor, limit }) {
  const safeLimit = Math.min(Math.max(Number(limit) || DEFAULT_LIMIT, 1), MAX_LIMIT);
  const decodedCursor = decodeFeedCursor(cursor);
  const query = {
    visibility: 'public',
    user: { $ne: userId }
  };

  if (decodedCursor) {
    query.$or = [
      { createdAt: { $lt: decodedCursor.createdAt } },
      { createdAt: decodedCursor.createdAt, _id: { $lt: decodedCursor.id } }
    ];
  }

  const [signals, rawCandidates] = await Promise.all([
    buildSignals(userId),
    Recommendation.find(query)
      .populate('book')
      .populate('user', 'name avatarUrl bio')
      .sort({ createdAt: -1, _id: -1 })
      .limit(safeLimit + 1)
      .lean()
  ]);

  const hasMore = rawCandidates.length > safeLimit;
  const candidates = rawCandidates.slice(0, safeLimit);

  const candidateIds = candidates.map(item => item._id);
  const likes = candidateIds.length
    ? await Like.find({ user: userId, recommendation: { $in: candidateIds } })
        .select('recommendation')
        .lean()
    : [];
  const likedIds = new Set(likes.map(item => String(item.recommendation)));

  const scored = candidates
    .map(item => ({
      ...item,
      likedByMe: likedIds.has(String(item._id)),
      personalization: scoreRecommendation(item, signals)
    }))
    .sort((a, b) =>
      b.personalization.score - a.personalization.score ||
      new Date(b.createdAt) - new Date(a.createdAt)
    );

  const data = scored;
  const nextCursor = hasMore && candidates.length
    ? encodeFeedCursor(candidates[candidates.length - 1])
    : null;

  return { data, nextCursor, limit: safeLimit };
}
