import createList from './createList';

const ExampleFactory = () => ({
  attributes: () => ({ test: true }),
});

describe('createList', () => {
  const numberOfFactories = 5;

  it('builds the given number of items', () => {
    const result = createList(ExampleFactory, numberOfFactories);
    expect(result.length).toEqual(numberOfFactories);
  });

  it('builds with the given attributes added to every item', () => {
    const attributeValue = false;
    const result = createList(ExampleFactory, numberOfFactories, { test: attributeValue });
    result.forEach(r => expect(r.test).toEqual(attributeValue));
  });
});
