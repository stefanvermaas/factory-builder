import create from './create';
import createList from './createList';
import build from './build';
import buildList from './buildList';
import { attributesFor } from './utils';

const FactoryBuilder = {
  create,
  createList,
  build,
  buildList,
  attributesFor,
};

export default FactoryBuilder;
export { create, createList, build, buildList, attributesFor };
