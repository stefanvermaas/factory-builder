import build from './build';

/**
 * Builds multiple instances for the Factory.
 * @param {Object} factory - The Factory to build multiple times.
 * @param {Integer} count - The number of factories that should be returned.
 * @param {Object} parameters - Optional parameters for the build.
 * @returns {Array} A list of instances of the Factory.
 */
const buildList = (factory, count = 2, parameters = {}) => {
  if (Array.isArray(parameters)) {
    return new Array(count).fill().map((_val, idx) => build(factory, parameters.length > idx && parameters[idx] || {}));
  }
  return new Array(count).fill().map(() => build(factory, parameters));
}

export default buildList;
