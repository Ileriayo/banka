import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('GET /api/v1/auth/transactions', () => {
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
describe('POST /api/v1/auth/transactions/738999234/debit', () => {
  const data = {
    transactionType: 'debit',
    debitAmount: 100,
  };
  it('Should debit an account', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/738999234/debit')
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('POST /api/v1/auth/transactions/738999234/credit', () => {
  it('Should credit an account', (done) => {
    const data = {
      transactionType: 'credit',
      debitAmount: Number(100),
    };
    chai.request(app)
      .post('/api/v1/transactions/738999234/credit')
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
