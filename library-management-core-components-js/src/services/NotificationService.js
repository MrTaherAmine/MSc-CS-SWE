// Observer Pattern publisher.
export class NotificationService {
  constructor() {
    this.observers = new Map();
  }

  subscribe(userId, observer) {
    this.observers.set(userId, observer);
  }

  unsubscribe(userId) {
    this.observers.delete(userId);
  }

  notify(userId, message) {
    const observer = this.observers.get(userId);

    if (observer) {
      observer.update(message);
    }
  }
}
