# Slack App Setup

## 1. Create the Slack app

Open the Slack app management page and create an app from the included `manifest.json`, or create it manually.

## 2. Bot OAuth scopes

Under **OAuth & Permissions**, add:

- `chat:write`
- `channels:history`
- `commands`

The course instructions list `chat:write` and `channels:history`. The additional `commands` scope is needed for the `/hello` slash command implemented by this repository.

## 3. Event subscription

Enable the Events API and subscribe the bot to:

- `message.channels`

Because this project uses **Socket Mode**, Slack delivers Events API payloads through the WebSocket connection instead of requiring a public HTTP request URL.

## 4. Socket Mode

Enable **Socket Mode**.

Create an App-Level Token with:

- `connections:write`

Save the token beginning with `xapp-`.

## 5. Install the app

Install or reinstall the app into your Slack workspace after changing scopes.

Copy the Bot User OAuth Token beginning with `xoxb-`.

## 6. Environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```text
SLACK_BOT_TOKEN=xoxb-...
SLACK_APP_TOKEN=xapp-...
BOT_NAME=HighSchoolLearningBot
```

Never commit `.env` or real Slack tokens to GitHub.

## 7. Install and run

```bash
npm install
npm test
npm start
```

## 8. Test in Slack

Invite the bot to a public channel.

Try:

```text
/hello
```

Try:

```text
/bot-help
```

Then post:

```text
hello bot
```

You should also see message-event logs in the Node.js console.
