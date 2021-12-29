import { isFunction, isObject } from "./utils";

/**
 * Evaluates the attributes of a Factory.
 * @param {Object|Function} attributes - The attributes of a factory
 * @returns {Object} - The evaluated attributes
 */
const evaluateAttributes = (attributes) => isObject(attributes) ? attributes : attributes()

/**
 * Extracts the attributes of a Factory.
 * @param {Object|Function} Factory - The factory or an instance of the factory
 * @param {String} as - The variant for a factory
 * @returns {Object} - The attributes of the factory
 */
const attributesFor = (Factory, as = undefined) => {
  // It's possible to pass a instance that is not initiate yet to this method
  // too. The internal methods will instanciate the, but when you use it directly
  // it's also possible to use the uninstanciated variant directly.
  const factoryInstance = isFunction(Factory) ? new Factory() : Factory;

  // Now we will check whether the factory has implemented the `attributes` key
  // or function. When that is not the case, we will ask the developer to implement this.
  if (factoryInstance.attributes) {
    // Get the base attributes for the factory. After this we can check for the variant.
    const defaultAttributes = evaluateAttributes(factoryInstance.attributes)

    // When the `as` param is undefined, we just return the base attributes. When
    // the `as` param is defined, we want to merge the base attributes with the
    // attributes of the variant.
    if (!as) return defaultAttributes;

    const variantAttributes = evaluateAttributes(factoryInstance.variants[as])
    return { ...defaultAttributes, ...variantAttributes };
  }

  throw new Error(
    'Every factory needs some sensible defaults. So please implement the ' +
    'attributes method/key on the factory yourself.',
  );
};

export default attributesFor;
