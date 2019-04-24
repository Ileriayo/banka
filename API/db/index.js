const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  // console.log('connected to the db');
});

export default {
  query(text, params) {
    return new Promise((res, rej) => {
      pool.query(text, params)
        .then(done => res(done))
        .catch(err => rej(err));
    });
  },
};
