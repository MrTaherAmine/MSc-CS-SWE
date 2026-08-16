// Interface-like abstraction for Observer Pattern subscribers.
export class Observer {
  update(message) {
    throw new Error("update() must be implemented.");
  }
}
