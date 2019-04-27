const validate = (user) => {
  const validFirstName = typeof user.firstName === 'string' && user.firstName.trim() !== '';
  const validLastName = typeof user.lastName === 'string' && user.lastName.trim() !== '';
  const validEmail = typeof user.email === 'string' && user.email.trim() !== '';
  const validPassword = typeof user.password === 'string' && user.email.trim() !== '';

  return validFirstName && validLastName && validEmail && validPassword;
};

export default validate;
