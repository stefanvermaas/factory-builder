import build from '../build';

const ExampleFactory = {
  attributes: { test: true },
};

describe('build', () => {
  it('builds the default instance of a factory', () => {
    expect(() => build(ExampleFactory)).not.toThrow();
  });

  it('adds updates attributes of the factory', () => {
    const addedAttributes = { test: false };
    const result = build(ExampleFactory, addedAttributes);

    expect(result.test).toEqual(addedAttributes.test);
    expect(result).not.toEqual(ExampleFactory.attributes);
  });

  it('skips the hooks when skipHooks is true', () => {
    const beforeBuildMock = jest.fn();
    const afterBuildMock = jest.fn();

    const ExampleFactoryWithHooks = {
      attributes: { test: true },
      beforeBuild: beforeBuildMock,
      afterBuild: afterBuildMock,
    };

    build(ExampleFactoryWithHooks, { skipHooks: true });
    expect(beforeBuildMock).not.toHaveBeenCalled();
    expect(afterBuildMock).not.toHaveBeenCalled();
  });

  it('throws an error when the attribute is not defined on the factory', () => {
    const unknownAttributes = { unkown: false };
    const errorMessage =
      `"${Object.keys(unknownAttributes).join(', ')}" is/are not defined on the factory itself. ` +
      `Please add these to the factory to be able to use them and clear this message.`;

    expect(() => build(ExampleFactory, unknownAttributes)).toThrow(errorMessage);
  });

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

      const ExampleFactoryWithNoneReturningBeforeHook = {
        attributes: { test: true },
        beforeBuild: jest.fn(),
      };

      expect(() => {
        build(ExampleFactoryWithNoneReturningBeforeHook);
      }).toThrow(errorMessage);
    });

    it('calls the beforeBuild method', () => {
      const defaultAttributes = { test: false };
      const beforeBuildMock = jest.fn();

      const ExampleFactoryWithBeforeHook = {
        attributes: defaultAttributes,
        beforeBuild: beforeBuildMock.mockReturnValueOnce({ test: false }),
      };

      build(ExampleFactoryWithBeforeHook);
      expect(beforeBuildMock).toHaveBeenCalledTimes(1);
      expect(beforeBuildMock).toHaveBeenCalledWith(defaultAttributes);
    });
  });

  describe('afterBuild', () => {
    it('throws when no data is returned from the hook', () => {
      const errorMessage = `The afterBuild needs to return the factory data otherwise we can't proceed in building/creating the factory.`;

      const ExampleFactoryWithNoneReturningAfterHook = {
        attributes: { test: true },
        afterBuild: jest.fn(),
      };

      expect(() => {
        build(ExampleFactoryWithNoneReturningAfterHook);
      }).toThrow(errorMessage);
    });

    it('calls the afterBuild method', () => {
      const defaultAttributes = { test: false };
      const afterBuildMock = jest.fn();

      const ExampleFactoryWithAfterHook = {
        attributes: defaultAttributes,
        afterBuild: afterBuildMock.mockReturnValueOnce({ test: true }),
      };

      build(ExampleFactoryWithAfterHook);
      expect(afterBuildMock).toHaveBeenCalledTimes(1);
      expect(afterBuildMock).toHaveBeenCalledWith(defaultAttributes);
    });
  });

  describe('variants', () => {
    const FactoryWithVariants = {
      attributes: { isAdmin: false },
      variants: {
        admin: {
          isAdmin: true,
        },
      },
    };

    it('returns the variant when defined', () => {
      const factory = build(FactoryWithVariants, { as: 'admin' });
      expect(factory.isAdmin).toEqual(true);
    });
  });
});
