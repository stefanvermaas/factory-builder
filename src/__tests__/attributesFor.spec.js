import attributesFor from '../attributesFor';
import { randomNumber } from '../utils';

describe('attributesFor', () => {
  describe('attributes as object', () => {
    const Factory = () => ({
      attributes: { some: 'key' },
    });

    it('assigns the attributes', () => {
      const attributes = attributesFor(Factory);
      expect(attributes.some).toEqual('key');
    });

    it('does not raise an exception when the factory is passed without instanciating it', () => {
      expect(() => attributesFor(Factory)).not.toThrow();
    });

    it('does not raise an exception when the factory instance is passed', () => {
      expect(() => attributesFor(new Factory())).not.toThrow();
    });
  });

  describe('attributes as function', () => {
    const id = randomNumber();

    const Factory = () => ({
      attributes: () => ({ id }),
    });

    it('evaluates the attributes function and assigns the attributes', () => {
      const attributes = attributesFor(Factory);
      expect(attributes.id).toEqual(id);
    })

    it('does not raise an exception when the factory is passed without instanciating it', () => {
      expect(() => attributesFor(Factory)).not.toThrow();
    });

    it('does not raise an exception when the factory instance is passed', () => {
      expect(() => attributesFor(new Factory())).not.toThrow();
    });
  });

  describe('variants', () => {
    const FactoryWithVariants = {
      attributes: { color: 'red' },
      variants: {
        green: { color: 'green' },
        purple: () => ({ color: 'purple' }),
      },
    };

    it('always returns the default attributes without variant definition', () => {
      const attributes = attributesFor(FactoryWithVariants);
      expect(attributes.color).toEqual('red');
    });

    describe('with attributes as an object', () => {
      it('returns the expected attributes', () => {
        const attributes = attributesFor(FactoryWithVariants, 'green');
        expect(attributes.color).toEqual('green');
      })
    });

    describe('with attributes as an function', () => {
      it('returns the expected attributes', () => {
        const attributes = attributesFor(FactoryWithVariants, 'purple');
        expect(attributes.color).toEqual('purple');
      })
    });
  })
});
