import { build } from './build';

export const buildList = (
  factory,
  count = 2,
  attributes = {},
  skipHooks = false,
) => new Array(count).fill().map(() => build(factory, attributes, skipHooks));
