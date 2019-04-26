const emailExist = (prop, userData) => {
  const data = userData.filter(user => user.email === prop);
  return data;
};

export default emailExist;
