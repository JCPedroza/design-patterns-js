let instance = null;

/**
 * Object that has a counter that can be increased by one at a time.
 * @param {object} state Collection of attributes.
 * @returns {object} A ticker object.
 */
const ticker = (state) => ({
  /**
   * Increase tick counter by one.
   */
  tick: () => { state._ticks++; },

  /**
   * Get total number of ticks.
   * @returns {number} Total number of ticks.
   */
  getTicks: () => state._ticks
});

/**
 * Factory function for the ticker singleton instance.
 * @returns {object} The ticker singleton instance.
 */
const createGlobalCounter = () => {
  if (instance) return instance;
  instance = ticker({ _ticks: 0 });
  return instance;
};

module.exports = {
  createGlobalCounter,
  id: 'object literal'
};
