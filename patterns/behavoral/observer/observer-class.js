/**
 * Aggregates observers and notifies them by invoking their update method.
 */
class Subject {
  constructor () {
    this.observers = new Set();
    this.notifications = 0;
  }

  /**
   * Add observer to the observers collection.
   * @param {Observer} obs Observer to add.
   */
  attach (obs) {
    this.observers.add(obs);
  }

  /**
   * Remove observer from the observers collection.
   * @param {Observer} obs Observer to remove.
   */
  detach (obs) {
    this.observers.delete(obs);
  }

  /**
   * Notify all observers.
   */
  notify () {
    for (const obs of this.observers) {
      obs.update();
      this.notifications++;
    }
  }
}

/**
 * Attaches to subjects that control the execution of the update method.
 */
class Observer {
  constructor (name) {
    this.updates = 0;
  }

  /**
   * Increase the updates counter by one.
   */
  update () {
    this.updates++;
  }
}

module.exports = {
  Subject,
  Observer,
  id: 'subject class with observers set'
};
