import { checkForUnknownAttributes } from '../utils';

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
        checkForUnknownAttributes(factoryInstance, unknownAttributes);
      }).toThrow(expectedExceptionMessage);
    });

    it('does not throw an exception for a whitelisted key', () => {
      const whitelistedAttributes = { id: 1, createdAt: new Date(), updatedAt: new Date() };

      expect(() => {
        checkForUnknownAttributes(factoryInstance, whitelistedAttributes);
      }).not.toThrow();
    });
  });
});
