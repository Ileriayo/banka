const userFromToken = (decodedToken, database) => {
  const userObj = database.filter(user => user.id === decodedToken.id);
  return userObj[0];
};

export default userFromToken;
