// Observer Pattern helper: subscribers receive overdue notifications.
class NotificationService {
  constructor() {
    this._subscribers = new Map();
  }

  subscribe(user) {
    this._subscribers.set(user.id, user);
  }

  unsubscribe(userId) {
    this._subscribers.delete(userId);
  }

  notifyUser(userId, message) {
    const user = this._subscribers.get(userId);

    if (user && typeof user.update === "function") {
      user.update(message);
    }
  }
}

module.exports = NotificationService;
