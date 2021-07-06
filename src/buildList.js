import build from './build';

const buildList = (factory, count = 2, parameters = {}) => {
  if (Array.isArray(parameters)) {
    return new Array(count).fill().map((_val, idx) => build(factory, parameters.length > idx && parameters[idx] || {}));
  }
  return new Array(count).fill().map(() => build(factory, parameters));
}
  

export default buildList;
