import { create } from './create';

export const createList = (
  factory,
  count = 2,
  attributes = {},
  skipHooks = false,
) => new Array(count).fill().map(() => create(factory, attributes, skipHooks));
