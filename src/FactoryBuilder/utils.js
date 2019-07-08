/**
 * The `isObject` method checks whether a given item is a real
 * object or not.
 * @param {Object} item - The object we want to check
 * @returns {Boolean} - The result of the check
 */

const isObject = item => typeof item === 'object' && !Array.isArray(item) && item !== null;

/**
 * The `attributesFor` is a helper method that retrieves the attributes
 * from a factory instance. If none are found, it raises a helpful error
 * message.
 * @param {Object} factoryInstance - The instance of a factory
 * @returns {Object} - The attributes of the factory
 */

export const attributesFor = factoryInstance => {
  if (factoryInstance.attributes) {
    return factoryInstance.attributes();
  }

  throw new Error(
    'Every factory needs some sensible defaults. So please implement the ' +
      'defaultAttributes() method on the factory yourself.',
  );
};

/**
 * The `checkHookForReturnValue` double checks whether a before/after hook
 * really returned an object.
 * @param {Object} hookResult - The result of the hook
 * @param {String} hookName - The name of the hook that is being called
 */

export const checkHookForReturnValue = (hookResult, hookName) => {
  if (hookResult && isObject(hookResult)) return;

  throw new Error(
    `The ${hookName} needs to return the factory data otherwise ` +
      "we can't proceed in building/creating the factory.",
  );
};

/**
 * The `randomNumber` helper function generates a random number between
 * a certain range.
 * @param {Integer} min - The minimal number
 * @param {Integer} max - The maximal number
 * @returns {Integer} - A randomly generated number
 */

export const randomNumber = (min = 1, max = 1000) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
