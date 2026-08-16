import { Observer } from "./Observer.js";

export class UserNotificationObserver extends Observer {
  constructor(user) {
    super();
    this.user = user;
  }

  update(message) {
    console.log(`[Notification -> ${this.user.name}] ${message}`);
  }
}
