/**
 * Singleton that keeps track of the number of ticks called.
 */
class GlobalCounter {
  constructor () {
    if (GlobalCounter._instance) return GlobalCounter._instance;
    GlobalCounter._instance = this;
    this._ticks = 0;
  }

  /**
   * Increase tick counter by one.
   */
  tick () { this._ticks++; }

  /**
   * Get total number of ticks.
   * @returns {number} Total number of ticks.
   */
  getTicks () { return this._ticks; }
}

/**
 * Factory function for the GlobalCounter singleton.
 * @returns {object} The GlobalCounter singleton instance.
 */
const createGlobalCounter = () => new GlobalCounter();

module.exports = {
  createGlobalCounter,
  id: 'class'
};
