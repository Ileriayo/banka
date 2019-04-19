import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
chai.should();

const validAccount = {
  id: 3,
  accountNumber: 5642113288,
  createdOn: '23-04-2018',
  owner: 1,
  type: null,
  status: 'dormant',
  balance: 20000.00,
};

describe('ACCOUNTS', () => {
  it('Should get all user accounts', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should create a new bank account', () => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(validAccount)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
      });
  });

  it('View - Should view a specific account', () => {
    const account = validAccount.accountNumber;
    chai.request(app)
    // account exists
      .get(`/api/v1/accounts/${account}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });
  });

  it('View - Should return 404 if account doesn\'t exist', () => {
    chai.request(app)
    // invalid account
      .get('/api/v1/accounts/11219972882')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
      });
  });

  it('Delete - Should delete a single account', () => {
    chai.request(app)
      .delete('/api/v1/accounts/1121997288')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });
  });

  it('Delete - Should return 404 when account does not exist', () => {
    chai.request(app)
    // invalid account
      .delete('/api/v1/accounts/11219947288')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
      });
  });
});
