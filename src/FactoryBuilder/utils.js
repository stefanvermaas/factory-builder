export const checkHookForReturnValue = (buildResult, hookName) => {
  if (buildResult) return;

  throw new Error(
    `The ${hookName} needs to return the factory data otherwise ` +
      `we can't proceed in building/creating the factory.`,
  );
};
