import create from '../create';

const ExampleFactory = {
  attributes: { test: true },
};

describe('create', () => {
  it('creates an factory without throwing an exception', () => {
    expect(() => create(ExampleFactory)).not.toThrow();
  });

  it('adds a id to the factory', () => {
    const result = create(ExampleFactory);
    expect(result.id).not.toBeUndefined();
  });

  it('adds a createdAt to the factory', () => {
    const result = create(ExampleFactory);
    expect(result.createdAt).not.toBeUndefined();
  });

  it('adds a updatedAt to the factory', () => {
    const result = create(ExampleFactory);
    expect(result.updatedAt).not.toBeUndefined();
  });

  it('is possible to set the attributes', () => {
    const defaultAttributes = ExampleFactory.attributes;

    const result = create(ExampleFactory, { test: !defaultAttributes.test });
    expect(result.test).not.toEqual(defaultAttributes.test);
  });

  it('skips the hooks when skipHooks is true', () => {
    const beforeCreateMock = jest.fn();
    const afterCreateMock = jest.fn();

    const ExampleFactoryWithHooks = {
      attributes: { test: true },
      beforeCreate: beforeCreateMock,
      afterCreate: afterCreateMock,
    };

    create(ExampleFactoryWithHooks, { skipHooks: true });
    expect(beforeCreateMock).not.toHaveBeenCalled();
    expect(afterCreateMock).not.toHaveBeenCalled();
  });

  it('throws an error when the attribute is not defined on the factory', () => {
    const unknownAttributes = { unkown: false };
    const errorMessage =
      `"${Object.keys(unknownAttributes).join(', ')}" is/are not defined on the factory itself. ` +
      `Please add these to the factory to be able to use them and clear this message.`;

    expect(() => create(ExampleFactory, unknownAttributes)).toThrow(errorMessage);
  });

  describe('beforeCreate', () => {
    it('throws when no data is returned from the hook', () => {
      const errorMessage = `The beforeCreate needs to return the factory data otherwise we can't proceed in building/creating the factory.`;

      const ExampleFactoryWithNoneReturningBeforeHook = {
        attributes: { test: true },
        beforeCreate: jest.fn(),
      };

      expect(() => {
        create(ExampleFactoryWithNoneReturningBeforeHook);
      }).toThrow(errorMessage);
    });

    it('calls the beforeCreate method', () => {
      const defaultAttributes = { test: false };
      const beforeCreateMock = jest.fn();

      const ExampleFactoryWithBeforeHook = {
        attributes: defaultAttributes,
        beforeCreate: beforeCreateMock.mockReturnValueOnce({ test: false }),
      };

      create(ExampleFactoryWithBeforeHook);
      expect(beforeCreateMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('afterCreate', () => {
    it('throws when no data is returned from the hook', () => {
      const errorMessage = `The afterCreate needs to return the factory data otherwise we can't proceed in building/creating the factory.`;

      const ExampleFactoryWithNoneReturningAfterHook = {
        attributes: { test: true },
        afterCreate: jest.fn(),
      };

      expect(() => {
        create(ExampleFactoryWithNoneReturningAfterHook);
      }).toThrow(errorMessage);
    });

    it('calls the afterCreate method', () => {
      const defaultAttributes = { test: false };
      const afterCreateMock = jest.fn();

      const ExampleFactoryWithAfterHook = {
        attributes: defaultAttributes,
        afterCreate: afterCreateMock.mockReturnValueOnce({ test: true }),
      };

      create(ExampleFactoryWithAfterHook);
      expect(afterCreateMock).toHaveBeenCalledTimes(1);
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
      const factory = create(FactoryWithVariants, { as: 'admin' });
      expect(factory.isAdmin).toEqual(true);
    });
  });
});
