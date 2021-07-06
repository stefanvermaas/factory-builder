import buildList from '../buildList';

const ExampleFactory = {
  attributes: () => ({ test: true }),
};

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

  it('builds with the given attributes when array is passed', () => {
    const attributeValues = [{ test: 'one' }, { test: 'two' }, { test: 'three' }]
    const result = buildList(ExampleFactory, 3, attributeValues);
    result.forEach((r, idx) => expect(r.test).toEqual(attributeValues[idx].test));
  });

  it('builds with the given attributes when array is passed with less items than the given number', () => {
    const attributeValues = [{ test: 'one' }]
    const result = buildList(ExampleFactory, 3, attributeValues);
    expect(result[0].test).toEqual(attributeValues[0].test);
    expect(result[1].test).toEqual(true);
    expect(result[2].test).toEqual(true);
  });

  it('builds with the given attributes when array is passed with more items than the given number', () => {
    const attributeValues = [{ test: 'one' }, { test: 'two' }, { test: 'three' }]
    const result = buildList(ExampleFactory, 2, attributeValues);
    expect(result.length).toEqual(2);
    result.forEach((r, idx) => expect(r.test).toEqual(attributeValues[idx].test));
  });
});
