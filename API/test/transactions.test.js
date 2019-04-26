/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
chai.should();

const staffDetails = {};
const newStaff = {
  email: 'newstaff2@gmail.com', firstName: 'user', lastName: 'user', password: 'password', type: 'staff', isAdmin: false,
};

const validAccount = {
  id: 2,
  accountNumber: 738999234,
  createdOn: '23-04-2018',
  owner: 1,
  type: 'current',
  status: 'active',
  balance: 5000.00,
};

describe('GET /api/v1/transactions', () => {
  it('Should create a new staff for test', (done) => {
    chai.request(app)
      .post('/api/v1/auth/staff')
      .type('form')
      .send(newStaff)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        staffDetails.token = res.body.data.token;
        done();
      });
  });
  it('Should get all transactions', (done) => {
    chai.request(app)
      .get('/api/v1/transactions')
      .set('Authorization', `Bearer ${staffDetails.token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
describe('POST /api/v1/transactions/<account-number>/debit', () => {
  const data = {
    transactionType: 'debit',
    debitAmount: 100,
  };
  it('Should debit an account', (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${validAccount.accountNumber}/debit`)
      .send(data)
      .set('Authorization', `Bearer ${staffDetails.token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('POST /api/v1/transactions/<account-number>/credit', () => {
  const data = {
    transactionType: 'credit',
    debitAmount: 100,
  };
  it('Should debit an account', (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${validAccount.accountNumber}/credit`)
      .send(data)
      .set('Authorization', `Bearer ${staffDetails.token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
