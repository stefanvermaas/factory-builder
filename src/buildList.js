import build from './build';

const buildList = (factory, count = 2, attributes = {}, skipHooks = false) =>
  new Array(count).fill().map(() => build(factory, attributes, skipHooks));

export default buildList;
