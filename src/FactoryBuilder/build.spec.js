import build from './build';

const ExampleFactory = () => ({
  attributes: () => ({ test: true }),
});

describe('build', () => {
  it('builds the default instance of a factory', () => {
    expect(() => build(ExampleFactory)).not.toThrow();
  });

  it('adds updates attributes of the factory', () => {
    const addedAttributes = { test: false };
    const result = build(ExampleFactory, addedAttributes);

    expect(result.test).toEqual(addedAttributes.test);
    expect(result).not.toEqual(new ExampleFactory().attributes());
  });

  xit('adds warns in development when the attribute is not defined on the factory', () => {});

  it('does not add an ID attribute', () => {
    const result = build(ExampleFactory);
    expect(result.id).toBeUndefined();
  });

  it('does not add a createdAt attribute', () => {
    const result = build(ExampleFactory);
    expect(result.createdAt).toBeUndefined();
  });

  it('does not add a updatedAt attribute', () => {
    const result = build(ExampleFactory);
    expect(result.updatedAt).toBeUndefined();
  });

  describe('beforeBuild', () => {
    it('throws when no data is returned from the hook', () => {
      const errorMessage = `The beforeBuild needs to return the factory data otherwise we can't proceed in building/creating the factory.`;

      const ExampleFactoryWithNoneReturningBeforeHook = () => ({
        attributes: () => ({ test: true }),
        beforeBuild: jest.fn(),
      });

      expect(() => {
        build(ExampleFactoryWithNoneReturningBeforeHook);
      }).toThrow(errorMessage);
    });

    it('calls the beforeBuild method', () => {
      const defaultAttributes = { test: false };
      const beforeBuildMock = jest.fn();

      const ExampleFactoryWithBeforeHook = () => ({
        attributes: () => defaultAttributes,
        beforeBuild: beforeBuildMock.mockReturnValueOnce({ test: false }),
      });

      build(ExampleFactoryWithBeforeHook);
      expect(beforeBuildMock).toHaveBeenCalledTimes(1);
      expect(beforeBuildMock).toHaveBeenCalledWith(defaultAttributes);
    });
  });

  describe('afterBuild', () => {
    xit('throws when no data is returned from the hook', () => {});
    xit('calls the afterBuild method', () => {});
  });
});
