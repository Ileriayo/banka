const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createTables = () => {
  const queryString = `
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS transactions;
  DROP TABLE IF EXISTS accounts;
  CREATE TABLE IF NOT EXISTS
        users(
          id SERIAL PRIMARY KEY,
          email VARCHAR(128) NOT NULL,
          firstname VARCHAR(128) NOT NULL,
          lastname VARCHAR(128) NOT NULL,
          password VARCHAR(128) NOT NULL,
          type VARCHAR(128) NOT NULL,
          isadmin BOOLEAN NOT NULL
        );
  CREATE TABLE IF NOT EXISTS
        accounts(
        id SERIAL PRIMARY KEY,
        accountnumber INT NOT NULL,
        createdon DATE NOT NULL,
        owner VARCHAR(128) NOT NULL,
        type VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL,
        balance NUMERIC(25,2) NOT NULL
        );
  CREATE TABLE IF NOT EXISTS
  transactions(
    id SERIAL PRIMARY KEY,
    createdon DATE NOT NULL,
    type VARCHAR(128) NOT NULL,
    accountnumber INT(10) NOT NULL,
    cashier INT NOT NULL,
    amount NUMERIC(25,2) NOT NULL,
    oldbalance NUMERIC(25,2) NOT NULL,
    newbalance NUMERIC(25,2) NOT NULL,
  );`;

  pool.query(queryString)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

export default createTables;
