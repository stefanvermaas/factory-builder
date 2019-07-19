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
    if (isObject(factoryInstance.attributes)) {
      return factoryInstance.attributes;
    }

    // When the attributes are dynamic, evaluate the attributes
    // and return the values of it.
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
      `we can't proceed in building/creating the factory.`,
  );
};

/**
 * The `checkForUnkownAttributes` method checks whether a developer is
 * adding attributes to the factory that are not on the base factory. When
 * this happens, we're raising an error message.
 * @param {Object} factoryInstance - The instance of the factory
 * @param {Object} attributes - The attributes that will be added to the factory
 */

export const checkForUnknownAttributes = (factoryInstance, attributes) => {
  const factoryAttributes = Object.keys(attributesFor(factoryInstance));
  const whitelistedAttributes = ['id', 'createdAt', 'updatedAt'];

  // We check for none existing attributes, because we don't want to assign
  // attributes that are not defined on the factory. We also check the
  // whitelisted attributes to make sure the developer can set these when
  // building or creating a new factory.
  const unknownAttributes = Object.keys(attributes).filter(
    key => !factoryAttributes.includes(key) && !whitelistedAttributes.includes(key),
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
