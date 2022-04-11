/**
 * Aggregates observers and notifies them by invoking their update method.
 * @param {object} state Collection of properties.
 * @returns {object} A subjectable object.
 */
const subjectable = (state) => ({
  /**
   * Add observer to the observers collection.
   * @param {object} obs Observer to add.
   */
  attach: (obs) => { state.observers.add(obs); },

  /**
   * Remove observer from observers collection.
   * @param {object} obs Observer to remove.
   */
  detach: (obs) => { state.observers.delete(obs); },

  /**
   * Get the number of current observers.
   * @returns {number} Size of the observers collection.
   */
  getObserversSize: () => state.observers.size,

  /**
   * Get the total number of sent notifications.
   * @returns {number} Total number of sent notifications.
   */
  getNotifyCount: () => state.notifyCount,

  /**
   * Notify all observers by calling their update method.
   */
  notify: (newState) => {
    for (const obs of state.observers) {
      obs.update(newState);
      state.notifyCount += 1;
    }
  }
});

/**
 * Can be turned on or off.
 * @param {object} state Collection of properties.
 * @param {function} notify Function used to notify observers.
 * @returns {object} A switcher object.
 */
const switcher = (state, notify) => ({
  /**
   * Get the state of isOn.
   * @returns {boolean} True if switcher is on, false, otherwise.
   */
  getIsOn: () => state.isOn,

  /**
   * Change state between on and off (true, false).
   */
  toggle: () => {
    state.isOn = !state.isOn;
    notify(state.isOn);
  }
});

/**
 * Factory function for switches. Switches are subjects that can be toggled
 * between on or off (true or false) states.
 * @returns {object} A switch object.
 */
const createSwitch = () => {
  const state = {
    notifyCount: 0,
    observers: new Set(),
    isOn: false
  };

  const subj = subjectable(state);
  const swtc = switcher(state, subj.notify);

  return {
    ...subj,
    ...swtc
  };
};

/**
 * Imlements the update method that is called by subjects.
 * @param {object} state Collection of properties.
 * @returns {object} An observer object.
 */
const observer = (state) => ({
  /**
   * Get total number of updates.
   * @returns {number} Total number of updates.
   */
  getUpdateCount: () => state.updateCount,

  /**
   * Update method called by subjects on state change.
   * @param {*} newState State that has been changed.
   */
  update: (newState) => {
    state.updateCount += 1;
  }
});

/**
 * Changes its on / off state based on the observed subjects.
 * @param {object} state Collection of properties.
 * @param {function} prevUpdate Update function to be called before own update
 * function.
 * @returns A triggerable object.
 */
const triggerable = (state, prevUpdate) => ({
  /**
  * Get the state of isOn.
  * @returns {boolean} True if triggerable is on, false otherwise.
  */
  getIsOn: () => state.isOn,

  /**
   * Update state based on the state provided by the subject, who also invoeks
   * the method.
   * @param {boolean} newState State that has been changed on subject.
   */
  update: (newState) => {
    prevUpdate(newState);
    state.isOn = newState;
  }
});

/**
 * Factory method for lightbulbs. Lightbulbs are observers that can be
 * triggered.
 * @returns {object} A lightbulb object.
 */
const createLightbulb = () => {
  const state = {
    updateCount: 0,
    isOn: false
  };

  const obs = observer(state);
  const trig = triggerable(state, obs.update);

  return {
    state,
    ...obs,
    ...trig
  };
};

module.exports = {
  createSwitch,
  createLightbulb,
  id: 'concatenative inheritance'
};
