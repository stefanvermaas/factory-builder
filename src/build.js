import {
  attributesFor,
  checkHookForReturnValue,
  checkForUnknownAttributes,
  isObject,
} from './utils';

const build = (factory, parameters = {}) => {
  const { as, skipHooks, ...attributes } = parameters;

  // The factory should be a simple object. When it's not, we will reject it from
  // being processed.
  if (!isObject(factory)) {
    throw new Error(
      'Every factory needs to be an object. Please implement this new way of defining ' +
        'your factories to keep using Factory Builder.',
    );
  }

  // Check whether the given attributes are known to the instance
  checkForUnknownAttributes(factory, attributes);

  // Let's start building this factory by merging the default attributes
  // of the factory with the given attributes that should override it
  const baseAttributes = attributesFor(factory, as);
  let factoryBuild = { ...baseAttributes, ...attributes };

  // Before we start building the factory, we want to give the developer
  // some extra options to modify the data as they wish. This is the place
  // where they can still add data to the factory.
  if (factory.beforeBuild && !skipHooks) {
    factoryBuild = factory.beforeBuild(factoryBuild);
    checkHookForReturnValue(factoryBuild, 'beforeBuild');
  }

  // Now, we're actually building the factory by remove the ID and
  // the timestamps (createdAt and updatedAt) from the factory if they're
  // even present.
  const { id, createdAt, updatedAt, ...restProps } = factoryBuild;
  factoryBuild = restProps;

  // Just before we return it, we want to pass the data back to
  // the developer so they can use the newly build data and maybe
  // add some extra's here.
  if (factory.afterBuild && !skipHooks) {
    factoryBuild = factory.afterBuild(factoryBuild);
    checkHookForReturnValue(factoryBuild, 'afterBuild');
  }

  return factoryBuild;
};

export default build;
