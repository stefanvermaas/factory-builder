import { attributesFor, checkHookForReturnValue, randomNumber } from './utils';

const create = (FactoryInstance, attributes = {}, skipHooks = false) => {
  const factoryInstance = new FactoryInstance();
  const defaultAttributes = attributesFor(factoryInstance);

  // Let's start building this factory by merging the default attributes
  // of the factory with the given attributes that should override it
  let factoryBuild = { ...defaultAttributes, ...attributes };

  // Before we start creating the factory, we want to give the developer
  // some extra options to modify the data as they wish. This is the place
  // where they can still add data to the factory.
  if (factoryInstance.beforeCreate && !skipHooks) {
    factoryBuild = factoryInstance.beforeCreate(factoryBuild);
    checkHookForReturnValue(factoryBuild, 'beforeCreate');
  }

  // Now, we're actually creating the factory by adding an ID and
  // the timestamps (createdAt and updatedAt) to the factory.
  factoryBuild = {
    id: randomNumber,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...factoryBuild,
  };

  // Just before we return it, we want to pass the data back to
  // the developer so they can use the newly created data and maybe
  // add some extra's here.
  if (factoryInstance.afterCreate && !skipHooks) {
    factoryBuild = factoryInstance.afterCreate(factoryBuild);
    checkHookForReturnValue(factoryBuild, 'afterCreate');
  }

  return factoryBuild;
};

export default create;
