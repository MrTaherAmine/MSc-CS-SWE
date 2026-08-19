import assert from 'node:assert/strict';
import test from 'node:test';
import { createComment, toggleLike } from '../src/controllers/interactionController.js';
import {
  toggleFollow,
  updateMyPreferences
} from '../src/controllers/profileController.js';
import {
  decodeFeedCursor,
  encodeFeedCursor,
  scoreRecommendation
} from '../src/services/recommendationFeedService.js';

function createResponse() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };
}

function failOnNext(error) {
  assert.fail(error?.message || 'Controller unexpectedly called next().');
}

test('feed cursor round-trips creation time and identifier', () => {
  const source = {
    _id: '507f1f77bcf86cd799439011',
    createdAt: new Date('2026-08-19T12:00:00.000Z')
  };
  const decoded = decodeFeedCursor(encodeFeedCursor(source));

  assert.equal(decoded.id, String(source._id));
  assert.equal(decoded.createdAt.toISOString(), source.createdAt.toISOString());
});

test('personalization score rewards genre matches and followed readers', () => {
  const base = {
    _id: '507f1f77bcf86cd799439011',
    createdAt: new Date('2026-08-18T12:00:00.000Z'),
    likesCount: 2,
    commentsCount: 1,
    user: { _id: '507f191e810c19729de860ea', name: 'Amina' },
    book: {
      genres: ['Technology'],
      authors: ['David Thomas'],
      averageRating: 4.5
    }
  };
  const noSignals = { genres: new Map(), authors: new Map(), following: new Set() };
  const strongSignals = {
    genres: new Map([['technology', 4]]),
    authors: new Map([['david thomas', 1]]),
    following: new Set(['507f191e810c19729de860ea'])
  };

  const baseline = scoreRecommendation(base, noSignals, new Date('2026-08-19T12:00:00.000Z').getTime());
  const personalized = scoreRecommendation(base, strongSignals, new Date('2026-08-19T12:00:00.000Z').getTime());

  assert.ok(personalized.score > baseline.score);
  assert.equal(personalized.reason, 'Because you follow Amina');
});

test('like endpoint rejects a malformed recommendation identifier', async () => {
  const response = createResponse();
  await toggleLike(
    { params: { recommendationId: 'bad-id' }, user: { _id: '507f191e810c19729de860ea' } },
    response,
    failOnNext
  );

  assert.equal(response.statusCode, 400);
  assert.match(response.body.message, /invalid recommendation/i);
});

test('comment endpoint rejects an empty body before database access', async () => {
  const response = createResponse();
  await createComment(
    {
      params: { recommendationId: '507f1f77bcf86cd799439011' },
      body: { body: '   ' },
      user: { _id: '507f191e810c19729de860ea' }
    },
    response,
    failOnNext
  );

  assert.equal(response.statusCode, 400);
  assert.match(response.body.message, /between 1 and 1000/i);
});

test('follow endpoint prevents self-following', async () => {
  const response = createResponse();
  const userId = '507f191e810c19729de860ea';
  await toggleFollow(
    { params: { userId }, user: { _id: userId } },
    response,
    failOnNext
  );

  assert.equal(response.statusCode, 400);
  assert.match(response.body.message, /cannot follow yourself/i);
});

test('preference endpoint limits the number of favorite genres', async () => {
  const response = createResponse();
  await updateMyPreferences(
    {
      body: { favoriteGenres: Array.from({ length: 11 }, (_, index) => `Genre ${index}`) },
      user: { _id: '507f191e810c19729de860ea' }
    },
    response,
    failOnNext
  );

  assert.equal(response.statusCode, 400);
  assert.match(response.body.message, /up to 10 genres/i);
});
