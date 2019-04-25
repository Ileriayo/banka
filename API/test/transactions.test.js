/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
chai.should();

let staffToken;
let clientToken;
before(() => {
  chai.request(app)
    .post('/api/v1/auth/staff')
    .send({
      email: 'newStaff@gmail.com',
      password: 'password',
      firstName: 'New',
      lastName: 'User',
      isAdmin: true,
    })
    .end((err, res) => {
      const { token } = res.body.data;
      staffToken = token;
    });
});
before(() => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'newClient@gmail.com',
      password: 'password',
      firstName: 'New',
      lastName: 'Client',
    })
    .end((err, res) => {
      const { token } = res.body.data;
      clientToken = token;
    });
});

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
  it('Should get all transactions', (done) => {
    chai.request(app)
      .get('/')
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
      .set('Authorization', `Bearer ${staffToken}`)
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
      .set('Authorization', `Bearer ${staffToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
