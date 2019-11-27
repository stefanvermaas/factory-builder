import { checkHookForReturnValue, randomNumber } from './utils';
import build from './build';

const create = (factory, parameters = {}) => {
  const { skipHooks, ...attributes } = parameters;

  // Get the base attributes for the factory by building the factory and skip the
  // hooks for the build method. This way we can re-use the code of the `build` method.
  const baseAttributes = build(factory, { ...parameters, skipHooks: true });

  // Create a new factory build we can continue building on
  let factoryBuild = { ...baseAttributes, ...attributes };

  // Before we start creating the factory, we want to give the developer
  // some extra options to modify the data as they wish. This is the place
  // where they can still add data to the factory.
  if (factory.beforeCreate && !skipHooks) {
    factoryBuild = factory.beforeCreate(factoryBuild);
    checkHookForReturnValue(factoryBuild, 'beforeCreate');
  }

  // Now, we're actually creating the factory by adding an ID and
  // the timestamps (createdAt and updatedAt) to the factory.
  const timestamp = new Date();
  factoryBuild = {
    id: randomNumber(),
    createdAt: timestamp,
    updatedAt: timestamp,
    ...factoryBuild,
  };

  // Just before we return it, we want to pass the data back to
  // the developer so they can use the newly created data and maybe
  // add some extra's here.
  if (factory.afterCreate && !skipHooks) {
    factoryBuild = factory.afterCreate(factoryBuild);
    checkHookForReturnValue(factoryBuild, 'afterCreate');
  }

  return factoryBuild;
};

export default create;
