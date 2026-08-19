function compactText(text = '') {
  return String(text).replace(/\s+/g, ' ').trim().slice(0, 500);
}

export function createMessageLog(event) {
  return {
    timestamp: new Date().toISOString(),
    type: event?.type || 'unknown',
    channel: event?.channel || 'unknown',
    user: event?.user || 'unknown',
    text: compactText(event?.text || '')
  };
}

export function logSlackMessage(event, logger = console) {
  const entry = createMessageLog(event);
  logger.info('[Slack message event]', entry);
  return entry;
}
