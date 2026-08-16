# Checkpoint TypeScript Fundamentals — Slack Bot

This repository contains the Slack bot requested for the **System Design: TypeScript 5 Fundamentals** checkpoint.

> The checkpoint instructions explicitly request a Node.js file named `bot.js`, so this submission follows the assignment as written and uses JavaScript with Slack's official Bolt framework.

## Features

- Connects to Slack using a bot OAuth token and signing secret.
- Responds to the `/hello` slash command.
- Logs messages received from subscribed public channels.
- Uses Slack Bolt for JavaScript.
- Stores credentials in environment variables instead of source code.

## Project structure

```text
typescript-fundamentals-slack-bot/
├── .env.example
├── .gitignore
├── bot.js
├── package.json
└── README.md
```

## 1. Create the Slack app

Create a Slack app in the Slack API dashboard and choose the workspace where you want to test it.

### Bot Token Scopes

Under **OAuth & Permissions**, add:

```text
chat:write
channels:history
commands
```

The checkpoint asks for `chat:write` and `channels:history`. The additional `commands` scope is required by Slack for slash commands such as `/hello`.

Install or reinstall the app to the workspace after changing scopes.

Copy the **Bot User OAuth Token** (`xoxb-...`).

## 2. Get the signing secret

Open **Basic Information** in the Slack app configuration and copy the app's **Signing Secret**.

Do not publish the token or signing secret in GitHub.

## 3. Configure message events

Open **Event Subscriptions** and enable events.

Subscribe to the bot event:

```text
message.channels
```

This lets the bot receive message events from public channels it can access.

The bot must be present in the channel you use for testing.

## 4. Configure `/hello`

Open **Slash Commands** and create:

```text
/hello
```

The Request URL should point to the same public Bolt endpoint used for events:

```text
https://YOUR-PUBLIC-HTTPS-URL/slack/events
```

## 5. Configure the Events API request URL

Bolt listens locally on:

```text
http://localhost:3000/slack/events
```

Slack cannot call `localhost`, so while testing locally you need a public HTTPS forwarding URL.

For example, after exposing port `3000` with your preferred development tunnel, configure Slack's Event Subscriptions Request URL as:

```text
https://YOUR-PUBLIC-HTTPS-URL/slack/events
```

Use the same endpoint for `/hello`.

## 6. Install dependencies

```bash
npm install
```

## 7. Configure environment variables

Copy:

```text
.env.example
```

to:

```text
.env
```

Then replace the placeholders:

```env
SLACK_BOT_TOKEN=xoxb-your-real-bot-token
SLACK_SIGNING_SECRET=your-real-signing-secret
PORT=3000
```

Never commit `.env`.

## 8. Run the bot

```bash
npm start
```

or:

```bash
node bot.js
```

Expected terminal output:

```text
⚡ Slack Bolt app is running on port 3000
Slack request endpoint: /slack/events
```

## 9. Test

### Slash command

In Slack:

```text
/hello
```

The bot replies with a greeting.

### Message logging

Post a normal message in a public channel where the bot is present.

The terminal will log information such as:

```text
channel
user
text
timestamp
```

## Security notes

- Real Slack tokens are intentionally **not included** in this repository.
- `.env` is ignored by Git.
- If a real token is ever accidentally committed, revoke/rotate it immediately in Slack.

## Author

Taher Amine ELHOUARI
