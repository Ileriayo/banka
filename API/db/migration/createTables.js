import pool from '../db';

//   DROP TABLE IF EXISTS users;
//   DROP TABLE IF EXISTS transactions;
//   DROP TABLE IF EXISTS accounts;
// const createTables = () => {

const createUserTable = `
  CREATE TABLE IF NOT EXISTS
        users(
          id SERIAL PRIMARY KEY,
          email VARCHAR(128) NOT NULL,
          firstname VARCHAR(128) NOT NULL,
          lastname VARCHAR(128) NOT NULL,
          password VARCHAR(128) NOT NULL,
          type VARCHAR(128) NOT NULL,
          isadmin BOOLEAN NOT NULL
        )`;

const createAccountsTable = `
    CREATE TABLE IF NOT EXISTS
        accounts(
        id SERIAL PRIMARY KEY,
        accountnumber INT NOT NULL,
        createdon DATE NOT NULL,
        owner INT NOT NULL,
        type VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL,
        balance NUMERIC(25,2) NOT NULL
        )`;

const createTransactionsTable = `
  CREATE TABLE IF NOT EXISTS
    transactions(
        id SERIAL PRIMARY KEY,
        createdon DATE NOT NULL,
        type VARCHAR(128) NOT NULL,
        accountnumber INT NOT NULL,
        cashier INT NOT NULL,
        amount FLOAT(2) NOT NULL,
        oldbalance FLOAT(2) NOT NULL,
        newbalance FLOAT(2) NOT NULL
    );`;

pool.query(createUserTable)
  .then((res) => {
    pool.query(createAccountsTable)
      .then((res) => {
        pool.query(createTransactionsTable)
          .then(res => console.log(res.rows))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));

pool.on('remove', () => {
  console.log('Client Destroyed!');
  process.exit(0);
});
