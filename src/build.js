import { attributesFor, checkHookForReturnValue, checkForUnknownAttributes } from './utils';

const build = (FactoryInstance, parameters = {}) => {
  const { as, skipHooks, ...attributes } = parameters;

  // Create a new instance for the factory
  const factoryInstance = new FactoryInstance();

  // Check whether the given attributes are known to the instance
  checkForUnknownAttributes(factoryInstance, attributes);

  // Let's start building this factory by merging the default attributes
  // of the factory with the given attributes that should override it
  const baseAttributes = attributesFor(factoryInstance, as);
  let factoryBuild = { ...baseAttributes, ...attributes };

  // Before we start building the factory, we want to give the developer
  // some extra options to modify the data as they wish. This is the place
  // where they can still add data to the factory.
  if (factoryInstance.beforeBuild && !skipHooks) {
    factoryBuild = factoryInstance.beforeBuild(factoryBuild);
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
  if (factoryInstance.afterBuild && !skipHooks) {
    factoryBuild = factoryInstance.afterBuild(factoryBuild);
    checkHookForReturnValue(factoryBuild, 'afterBuild');
  }

  return factoryBuild;
};

export default build;
