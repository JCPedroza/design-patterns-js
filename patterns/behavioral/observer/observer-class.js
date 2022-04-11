/**
 * Aggregates observers and notifies them by invoking their update method.
 */
class Subject {
  constructor () {
    this._notifyCount = 0;
    this._observers = new Set();
  }

  /**
   * Add observer to the observers collection.
   * @param {object} obs Observer to add.
   */
  attach (obs) { this._observers.add(obs); }

  /**
   * Remove observer from the observers collection.
   * @param {object} obs Observer to remove.
   */
  detach (obs) { this._observers.delete(obs); }

  /**
   * Get the total number of sent notifications.
   * @returns {number} Total number of sent notifications.
   */
  getNotifyCount () { return this._notifyCount; }

  /**
   * Get the number of current observers.
   * @returns {number} Size of the observers collection.
   */
  getObserversSize () { return this._observers.size; }

  /**
   * Notify all observers.
   */
  _notify (state) {
    for (const obs of this._observers) {
      obs.update(state);
      this._notifyCount++;
    }
  }
}

/**
 * Represents a switch with a boolean state.
 */
class Switch extends Subject {
  constructor () {
    super();
    this._isOn = false;
  }

  /**
   * Negates the switch value and notifies observers.
   */
  toggle () {
    this._isOn = !this._isOn;
    this._notify(this._isOn);
  }

  /**
   * Get switch value.
   * @returns {boolean} True if switch is on, false otherwise.
   */
  getIsOn () { return this._isOn; }
}

/**
 * Factory for Switch.
 * @returns {object} A new switch instance.
 */
const createSwitch = () => new Switch();

/**
 * Attaches to subjects that control the execution of the update method.
 */
class Observer {
  constructor () {
    this._updateCount = 0;
  }

  /**
   * Increase the updates counter by one.
   */
  update () { this._updateCount++; }

  /**
   * Get the total number of updates received.
   * @returns {number} Total number of updates received.
   */
  getUpdateCount () { return this._updateCount; }
}

/**
 * Represents a light emitting bulb.
 */
class Lightbulb extends Observer {
  constructor () {
    super();
    this._isOn = false;
  }

  /**
   * Turn on / off depending on the switche's state.
   * @param {boolean} state Current subject state.
   */
  update (state) {
    super.update();
    this._isOn = state;
  }

  /**
   * Get isOn value.
   * @returns {boolean} True if bulb is on, false otherwise.
   */
  getIsOn () { return this._isOn; }
}

/**
 * Factory for Lightbulb.
 * @returns {object} A new Lightbulb instance.
 */
const createLightbulb = () => new Lightbulb();

module.exports = {
  createSwitch,
  createLightbulb,
  id: 'class inheritance'
};
