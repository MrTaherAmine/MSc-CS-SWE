import test from 'node:test';
import assert from 'node:assert/strict';
import { helloResponse, helpResponse } from '../src/responses.js';
import { createMessageLog } from '../src/logger.js';

test('helloResponse includes the supplied name', () => {
  assert.match(helloResponse('Taher'), /Hello Taher!/);
});

test('helloResponse has a safe fallback', () => {
  assert.match(helloResponse(''), /Hello there!/);
});

test('helpResponse documents /hello', () => {
  assert.match(helpResponse(), /\/hello/);
});

test('createMessageLog returns structured Slack event data', () => {
  const result = createMessageLog({
    type: 'message',
    channel: 'C123',
    user: 'U456',
    text: 'Hello Slack'
  });

  assert.equal(result.type, 'message');
  assert.equal(result.channel, 'C123');
  assert.equal(result.user, 'U456');
  assert.equal(result.text, 'Hello Slack');
  assert.ok(result.timestamp);
});

test('message logger trims very long message text', () => {
  const result = createMessageLog({ text: 'a'.repeat(900) });
  assert.equal(result.text.length, 500);
});
