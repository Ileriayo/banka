import db from '../db/index';

const emailExist = (prop, userData) => {
  const data = userData.filter(user => user.email === prop);
  return data;
};

class EmailExistDB {
  static async emailExistDB(email) {
    const queryString = 'SELECT * FROM users WHERE email = $1';
    const data = await db.query(queryString, [email]);
    return data.rows[0];
  }
}

export default EmailExistDB;
