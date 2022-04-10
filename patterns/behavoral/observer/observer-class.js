/**
 * Aggregates observers and notifies them by invoking their update method.
 */
class Subject {
  constructor () {
    this.notifications = 0;
    this._observers = new Set();
  }

  /**
   * Add observer to the observers collection.
   * @param {Object} obs Observer to add.
   * @returns {Object} Reference to self.
   */
  attach (obs) {
    this._observers.add(obs);
    return this;
  }

  /**
   * Remove observer from the observers collection.
   * @param {Object} obs Observer to remove.
   * @returns {Object} Reference to self.
   */
  detach (obs) {
    this._observers.delete(obs);
    return this;
  }

  /**
   * Get the number of current observers.
   * @returns {number} Size of the observers collection.
   */
  get aggregateCount () {
    return this._observers.size;
  }

  /**
   * Notify all observers.
   */
  _notify (state) {
    for (const obs of this._observers) {
      obs.update(state);
      this.notifications++;
    }
  }
}

/**
 * Represents a switch with a boolean state.
 */
class Switch extends Subject {
  constructor () {
    super();
    this._switch = false;
  }

  /**
   * Negates the switch value.
   * @returns {Object} Reference to self.
   */
  toggleSwitch () {
    this._switch = !this._switch;
    this._notify(this.switch);
    return this;
  }

  /**
   * Get switch value.
   * @returns {boolean} True if switch is on, false otherwise.
   */
  get switch () {
    return this._switch;
  }
}

/**
 * Factory for Switch.
 * @returns {Object} A new switch instance.
 */
const createSwitch = () => new Switch();

/**
 * Attaches to subjects that control the execution of the update method.
 */
class Observer {
  constructor () {
    this.updates = 0;
  }

  /**
   * Increase the updates counter by one.
   */
  update () {
    this.updates++;
  }
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
  get isOn () {
    return this._isOn;
  }
}

/**
 * Factory for Lightbulb.
 * @returns {Object} A new Lightbulb instance.
 */
const createLightbulb = () => new Lightbulb();

module.exports = {
  createSwitch,
  createLightbulb,
  id: 'subject class with observers set and class inheritance'
};
