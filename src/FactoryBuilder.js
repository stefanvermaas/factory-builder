import { create } from './FactoryBuilder/create';
import { createList } from './FactoryBuilder/createList';
import { build } from './FactoryBuilder/build';
import { buildList } from './FactoryBuilder/buildList';
import { attributesFor } from './FactoryBuilder/attributesFor';

const FactoryBuilder = {
  create,
  createList,
  build,
  buildList,
  attributesFor,
};

export default FactoryBuilder;
export { create, createList, build, buildList, attributesFor };
