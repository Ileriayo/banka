import pool from './db';

class Query {
  static async query(text, params) {
    try {
      const result = await pool.query(text, params);
      return result;
    } catch (err) {
      return err;
    }
  }
}

export default Query;
