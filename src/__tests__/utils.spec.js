import { checkForUnknownAttributes, checkHookForFunction } from '../utils';

describe('utilities', () => {
  describe('checkForUnknownAttributes', () => {
    const UnknownAttributesFactory = () => ({
      attributes: { some: 'key' },
    });

    const factoryInstance = new UnknownAttributesFactory();

    it('throws an exception when the attribute is unknown', () => {
      const unknownAttributes = { unknown: 'attribute' };

      // The expected exception message should the word "unknown" (in this case)
      // because the name of the key is called "unknown".
      const expectedExceptionMessage =
        `"unknown" is/are not defined on the factory itself. ` +
        `Please add these to the factory to be able to use them and clear this message.`;

      expect(() => {
        checkForUnknownAttributes(factoryInstance.attributes, unknownAttributes);
      }).toThrow(expectedExceptionMessage);
    });

    it('does not throw an exception for a whitelisted key', () => {
      const whitelistedAttributes = { id: 1, createdAt: new Date(), updatedAt: new Date() };

      expect(() => {
        checkForUnknownAttributes(factoryInstance.attributes, whitelistedAttributes);
      }).not.toThrow();
    });
  });

  describe('checkHookForFunction', () => {
    const BaseFactory = {
      attributes: { firstName: 'testing' },
    };

    it('throws an exception when the hook is not a function', () => {
      const factory = {
        ...BaseFactory,
        beforeCreate: { lastName: 'resulting in an exception' },
      };

      const errorMessage =
        `The beforeCreate is not a function. In order to work with hooks, you should ` +
        `make the beforeCreate a function.`;

      expect(() => {
        checkHookForFunction(factory, 'beforeCreate');
      }).toThrow(errorMessage);
    });

    it('does not throw an exception when the hook is a function', () => {
      const factory = {
        ...BaseFactory,
        beforeCreate: attributes => ({ ...attributes, lastName: 'no exception' }),
      };

      expect(() => {
        checkHookForFunction(factory, 'beforeCreate');
      }).not.toThrow();
    });
  });
});
