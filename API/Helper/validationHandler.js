const validationHandler = next => (result) => {
  if (result.isEmpty()) return;
  if (!next) {
    throw new Error(
      result.array().map(i => `'${i.param}' has ${i.msg}`).join(' '),
    );
  }
  next(
    new Error(
      result.array().map(i => `'${i.param}' has ${i.msg}`).join(''),
    ),
  );
};

export default validationHandler;
