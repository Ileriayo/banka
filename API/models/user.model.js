class User {
  constructor(email, firstName, lastName, password) {
    this.id = 0;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.type = 'client';
    this.isAdmin = false;
  }
}

export default User;
