import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateAverage,
  getLetterGrade,
  getPerformanceMessage
} from '../src/gradeCalculator.js';

test('calculateAverage returns the mean of valid scores', () => {
  assert.equal(calculateAverage([80, 90, 100]), 90);
});

test('calculateAverage accepts numeric strings from form input', () => {
  assert.equal(calculateAverage(['75', '85', '95']), 85);
});

test('calculateAverage rejects an empty array', () => {
  assert.throws(() => calculateAverage([]), /At least one score/);
});

test('calculateAverage rejects out-of-range scores', () => {
  assert.throws(() => calculateAverage([105, 90]), /between 0 and 100/);
});

test('getLetterGrade maps average values to expected grades', () => {
  assert.equal(getLetterGrade(94), 'A');
  assert.equal(getLetterGrade(84), 'B');
  assert.equal(getLetterGrade(74), 'C');
  assert.equal(getLetterGrade(64), 'D');
  assert.equal(getLetterGrade(54), 'F');
});

test('getPerformanceMessage returns a helpful message', () => {
  assert.equal(getPerformanceMessage('A'), 'Excellent work!');
});
