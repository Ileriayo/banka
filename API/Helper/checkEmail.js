import Query from '../db/db';

const { query } = Query;

// const emailExist = (prop, userData) => {
//   const data = userData.filter(user => user.email === prop);
//   return data;
// };

class CheckEmail {
  static async checkEmail(email) {
    try {
      const queryString = 'SELECT * FROM users WHERE email = $1';
      const data = await query(queryString, [email]);
      if (data.rows.length <= 0) return [];
      return data.rows;
    } catch (err) {
      return err;
    }
  }
}

export default CheckEmail;
