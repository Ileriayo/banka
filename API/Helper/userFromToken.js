import Query from '../db/db';

const { query } = Query;
class UserFromToken {
  static async userFromToken(decodedToken) {
    try {
      const { id, email } = decodedToken;
      const queryString = 'SELECT * FROM users WHERE id = $1 AND email = $2;';
      const data = await query(queryString, [id, email]);
      return data.rows;
    } catch (err) {
      return err;
    }
  }
}

export default UserFromToken;
