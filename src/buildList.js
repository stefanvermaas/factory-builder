import build from './build';

const buildList = (factory, count = 2, parameters = {}) =>
  new Array(count).fill().map(() => build(factory, parameters));

export default buildList;
