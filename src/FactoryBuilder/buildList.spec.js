import buildList from './buildList';

const ExampleFactory = () => ({
  attributes: () => ({ test: true }),
});

describe('buildList', () => {
  const numberOfFactories = 5;

  it('builds the given number of items', () => {
    const result = buildList(ExampleFactory, numberOfFactories);
    expect(result.length).toEqual(numberOfFactories);
  });

  it('builds with the given attributes added to every item', () => {
    const attributeValue = false;
    const result = buildList(ExampleFactory, numberOfFactories, { test: attributeValue });
    result.forEach(r => expect(r.test).toEqual(attributeValue));
  });
});
