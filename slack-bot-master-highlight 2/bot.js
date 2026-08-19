import 'dotenv/config';
import bolt from '@slack/bolt';
import { helloResponse, helpResponse } from './src/responses.js';
import { logSlackMessage } from './src/logger.js';

const { App } = bolt;

const requiredVariables = ['SLACK_BOT_TOKEN', 'SLACK_APP_TOKEN'];
const missing = requiredVariables.filter(name => !process.env[name]);

if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  console.error('Copy .env.example to .env and add your Slack tokens.');
  process.exit(1);
}

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

// Slash command: /hello
app.command('/hello', async ({ command, ack, respond }) => {
  await ack();

  const name = command.user_name || 'there';
  await respond({
    response_type: 'ephemeral',
    text: helloResponse(name)
  });
});

// Optional helper command
app.command('/bot-help', async ({ ack, respond }) => {
  await ack();
  await respond({
    response_type: 'ephemeral',
    text: helpResponse()
  });
});

// Events API: log channel messages.
app.event('message', async ({ event }) => {
  // Ignore messages created by bots or message subtypes to prevent loops/noise.
  if (event.bot_id || event.subtype) {
    return;
  }

  logSlackMessage(event);
});

// Respond to a simple conversational trigger.
app.message(/hello bot/i, async ({ message, say }) => {
  if (message.bot_id || message.subtype) {
    return;
  }

  await say({
    text: helloResponse(`<@${message.user}>`),
    thread_ts: message.thread_ts || message.ts
  });
});

app.error(async error => {
  console.error('Slack Bolt error:', error);
});

(async () => {
  await app.start();
  console.log(`⚡ ${process.env.BOT_NAME || 'Slack Learning Bot'} is running in Socket Mode.`);
})();
