export const attributesFor = factoryInstance => {
  if (factoryInstance.attributes) {
    return factoryInstance.attributes();
  }

  throw new Error(
    'Every factory needs some sensible defaults. So please implement the ' +
      'defaultAttributes() method on the factory yourself.',
  );
};
