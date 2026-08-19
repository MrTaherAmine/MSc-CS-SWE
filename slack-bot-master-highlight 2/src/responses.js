export function helloResponse(displayName = 'there') {
  const safeName = String(displayName || 'there').trim() || 'there';
  return `Hello ${safeName}! 👋 I am your Git, CI and QA learning bot.`;
}

export function helpResponse() {
  return [
    '*Available commands*',
    '• `/hello` — receive a greeting',
    '• `/bot-help` — show this help message',
    '• Send a message containing `hello bot` — the bot will reply'
  ].join('\n');
}
