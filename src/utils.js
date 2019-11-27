/**
 * The `isObject` is an internal method that checks whether a given item is a
 * real object or not.
 * @param {Object} item - The object we want to check for being an object
 * @returns {Boolean} - The result of the check for an object
 */

const isObject = item => typeof item === 'object' && !Array.isArray(item) && item !== null;

/**
 * The `isFunction` is an internal method to verify whether the passed item is
 * a function or not.
 * @param {Object} item - The object we want to check for being a function
 * @returns {Boolean} - The result of the check for a function
 */

const isFunction = item => !!(item && item.constructor && item.call && item.apply);

/**
 * The `attributesFor` is a helper method that retrieves the attributes
 * from a factory instance. If none are found, it raises a helpful error
 * message.
 * @param {Object|Function} Factory - The factory or an instance of the factory
 * @param {String} - The variant for a factory
 * @returns {Object} - The attributes of the factory
 */

export const attributesFor = (Factory, as = undefined) => {
  // It's possible to pass a instance that is not initiate yet to this method
  // too. The internal methods will instanciate the, but when you use it directly
  // it's also possible to use the uninstanciated variant directly.
  const factoryInstance = isFunction(Factory) ? new Factory() : Factory;

  // Now we will check whether the factory has implemented the `attributes` key
  // or function. When that is not the case, we will ask the developer to implement this.
  if (factoryInstance.attributes) {
    // Get the base attributes for the factory. After this we can check for the variant.
    const baseAttributes = isObject(factoryInstance.attributes)
      ? factoryInstance.attributes
      : factoryInstance.attributes();

    // When the `as` param is undefined, we just return the base attributes. When
    // the `as` param is defined, we want to merge the base attributes with the
    // attributes of the variant.
    if (!as) return baseAttributes;
    return { baseAttributes, ...factoryInstance.variants[as] };
  }

  throw new Error(
    'Every factory needs some sensible defaults. So please implement the ' +
      'attributes method/key on the factory yourself.',
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
