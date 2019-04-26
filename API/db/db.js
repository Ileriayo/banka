/* eslint-disable no-console */
import { Pool } from 'pg';

import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err) => {
  if (err) throw err.message;
  console.log(`Connected to ${process.env.DATABASE_URL}`);
});

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
