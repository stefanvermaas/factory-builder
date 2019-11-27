import create from './create';

const createList = (factory, count = 2, parameters = {}) =>
  new Array(count).fill().map(() => create(factory, parameters));

export default createList;
