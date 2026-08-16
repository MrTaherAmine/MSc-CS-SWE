require("dotenv").config();

const { App } = require("@slack/bolt");

// Validate required environment variables before starting.
const requiredVariables = ["SLACK_BOT_TOKEN", "SLACK_SIGNING_SECRET"];

for (const variableName of requiredVariables) {
  if (!process.env[variableName]) {
    console.error(`Missing required environment variable: ${variableName}`);
    process.exit(1);
  }
}

// Create the Slack Bolt application.
// Bolt's default HTTP receiver accepts Slack requests at /slack/events.
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Respond to the custom /hello slash command.
app.command("/hello", async ({ command, ack, respond, logger }) => {
  await ack();

  logger.info(
    `Received /hello from user ${command.user_id} in channel ${command.channel_id}`
  );

  await respond(`Hello <@${command.user_id}>! 👋 Your Slack bot is working.`);
});

// Listen for messages the bot is allowed to receive and log them.
app.message(async ({ message, logger }) => {
  // Ignore message subtypes such as edits, deletions, and bot-generated messages.
  if (message.subtype) {
    return;
  }

  logger.info("Message received", {
    channel: message.channel,
    user: message.user,
    text: message.text,
    timestamp: message.ts
  });
});

// Log unexpected Bolt errors.
app.error(async (error) => {
  console.error("Slack Bolt error:", error);
});

// Start the application.
(async () => {
  const port = Number(process.env.PORT) || 3000;

  await app.start(port);

  console.log(`⚡ Slack Bolt app is running on port ${port}`);
  console.log(`Slack request endpoint: /slack/events`);
})();
