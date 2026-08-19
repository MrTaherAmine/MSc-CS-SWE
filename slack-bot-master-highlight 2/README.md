# High School Learning Bot — Slack API + Bolt

A small Node.js Slack bot created for the **Master Degree Highlights — Build a Slack Bot Using the Slack API** checkpoint.

## Objectives

The project demonstrates:

- responding to channel messages;
- recognizing `/hello`;
- logging Slack message events;
- Slack OAuth scopes and authentication;
- Events API subscriptions;
- Bolt for JavaScript;
- secure environment-variable handling.

## Stack

- Node.js
- `@slack/bolt`
- Slack Events API
- Slack Web API
- Socket Mode
- Node.js built-in test runner

## Features

### `/hello`

Returns an ephemeral greeting to the user.

### `/bot-help`

Lists available bot interactions.

### `hello bot`

The bot replies to messages containing this phrase.

### Message event logging

Non-bot channel messages are logged as structured data:

```text
timestamp
event type
channel
user
message text
```

## Slack Permissions

Bot scopes:

```text
chat:write
channels:history
commands
```

Bot event subscription:

```text
message.channels
```

App-level token scope for Socket Mode:

```text
connections:write
```

> The checkpoint text mentions `chat:write` and `channels:history`. This repository additionally uses the `commands` bot scope because `/hello` is implemented as a Slack slash command.

## Quick Start

```bash
npm install
cp .env.example .env
```

Add your Slack credentials to `.env`, then:

```bash
npm test
npm start
```

Detailed configuration instructions are available in [`docs/SETUP.md`](docs/SETUP.md).

## Project Structure

```text
.
├── .github/workflows/ci.yml
├── docs/
│   ├── SETUP.md
│   └── SUBMISSION_NOTES.md
├── src/
│   ├── logger.js
│   └── responses.js
├── tests/
│   └── responses.test.js
├── .env.example
├── .gitignore
├── bot.js
├── manifest.json
├── package.json
└── README.md
```

## Important

Never commit a real Slack Bot OAuth Token (`xoxb-...`) or App-Level Token (`xapp-...`) to GitHub.

## Author

**Taher Amine ELHOUARI**

Master Degree Highlights — Software Engineering
