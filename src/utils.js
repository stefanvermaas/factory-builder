/**
 * The `isObject` is an internal method that checks whether a given item is a
 * real object or not.
 * @param {Object} item - The object we want to check for being an object
 * @returns {Boolean} - The result of the check for an object
 */

export const isObject = item => typeof item === 'object' && !Array.isArray(item) && item !== null;

/**
 * The `isFunction` is an internal method to verify whether the passed item is
 * a function or not.
 * @param {Object} item - The object we want to check for being a function
 * @returns {Boolean} - The result of the check for a function
 */

export const isFunction = item => !!(item && item.constructor && item.call && item.apply);

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
      `we can't proceed in building/creating the factory.`,
  );
};

/**
 * The `checkHookForFunction` validates whether the hook we want to execute
 * is actually a function. When it's not a function, we can't update the data
 * correctly, so we want to enforce the hook to be a function.
 * @param {Object} factory - The factory we want to build/create
 * @param {String} hookName - The name of the hook that is being called
 */
export const checkHookForFunction = (factory, hookName) => {
  if (isFunction(factory[hookName])) return;

  throw new Error(
    `The ${hookName} is not a function. In order to work with hooks, you should ` +
      `make the ${hookName} a function.`,
  );
};

/**
 * The `checkForUnkownAttributes` method checks whether a developer is
 * adding attributes to the factory that are not on the base factory. When
 * this happens, we're raising an error message.
 * @param {Object} factory - The instance of the factory
 * @param {Object} attributes - The attributes that will be added to the factory
 */

export const checkForUnknownAttributes = (factoryAttributes, attributes) => {
  const factoryAttributeKeys = Object.keys(factoryAttributes);
  const whitelistedAttributes = ['id', 'createdAt', 'updatedAt'];

  // We check for none existing attributes, because we don't want to assign
  // attributes that are not defined on the factory. We also check the
  // whitelisted attributes to make sure the developer can set these when
  // building or creating a new factory.
  const unknownAttributes = Object.keys(attributes).filter(
    key => !factoryAttributeKeys.includes(key) && !whitelistedAttributes.includes(key),
  );

  // When there are unknown attributes, we raise an error that tells
  // the developer which attributes are added, that are not present on
  // the factory itself.
  if (unknownAttributes.length) {
    throw new Error(
      `"${unknownAttributes.join(', ')}" is/are not defined on the factory itself. ` +
        `Please add these to the factory to be able to use them and clear this message.`,
    );
  }
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
