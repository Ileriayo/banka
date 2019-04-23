const signUpValidation = (req, res, next) => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  if (!firstName) {
    res.json({ status: 400, error: 'Firstname field is required' }).status(400);
  } else if (!lastName) {
    res.json({ status: 400, error: 'Lastname field is required' }).status(400);
  } else if (!email) {
    res.json({ status: 400, error: 'Email field is required' }).status(400);
  } else if (!password) {
    res.json({ status: 400, error: 'Password field is required' }).status(400);
  } else next();
};

export default signUpValidation;
