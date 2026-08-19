import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getBookDetails,
  rateBook,
  searchBooks
} from '../src/controllers/bookController.js';

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

test('book details rejects a malformed MongoDB identifier', async () => {
  const response = createResponse();

  await getBookDetails(
    { params: { bookId: 'not-an-object-id' } },
    response,
    failOnNext
  );

  assert.equal(response.statusCode, 400);
  assert.equal(response.body.success, false);
  assert.equal(response.body.message, 'Invalid book identifier.');
});

test('rating rejects a value outside the 1 to 5 range', async () => {
  const response = createResponse();

  await rateBook(
    {
      params: { bookId: '507f1f77bcf86cd799439011' },
      body: { rating: 6 }
    },
    response,
    failOnNext
  );

  assert.equal(response.statusCode, 400);
  assert.equal(response.body.success, false);
  assert.match(response.body.message, /between 1 and 5/i);
});

test('rating rejects fractional values', async () => {
  const response = createResponse();

  await rateBook(
    {
      params: { bookId: '507f1f77bcf86cd799439011' },
      body: { rating: 4.5 }
    },
    response,
    failOnNext
  );

  assert.equal(response.statusCode, 400);
  assert.equal(response.body.success, false);
});

test('search rejects a query shorter than two characters', async () => {
  const response = createResponse();

  await searchBooks(
    { query: { q: 'a', type: 'title' } },
    response,
    failOnNext
  );

  assert.equal(response.statusCode, 400);
  assert.equal(response.body.success, false);
  assert.match(response.body.message, /at least 2 characters/i);
});
