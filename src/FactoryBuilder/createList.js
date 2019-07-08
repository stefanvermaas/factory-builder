import create from './create';

const createList = (factory, count = 2, attributes = {}, skipHooks = false) =>
  new Array(count).fill().map(() => create(factory, attributes, skipHooks));

export default createList;
