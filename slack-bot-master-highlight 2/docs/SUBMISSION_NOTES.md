# Submission Notes

This repository demonstrates the three objectives from the checkpoint:

## Respond to messages in a Slack channel

`bot.js` registers a Bolt message listener for the phrase `hello bot` and replies in the same thread/conversation.

## Recognize `/hello`

`bot.js` registers the slash command:

```js
app.command('/hello', ...)
```

The handler acknowledges the command and returns an ephemeral greeting.

## Log messages with the Events API

The app subscribes to the `message.channels` bot event. Incoming non-bot messages are converted into structured log records containing timestamp, event type, channel, user, and a bounded copy of the message text.

## Security

Slack tokens are read only from environment variables. The `.env` file is ignored by Git and an `.env.example` template is provided.

## Validation

The pure response and message-log utilities have automated unit tests under `tests/`.
