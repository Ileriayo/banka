import chai from 'chai';
import chaiHttp from 'chai-http';

import accounts from '../utils/accounts';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('Accounts', () => {
  it('Should get all user accounts', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete a specific account', () => {
    const account = {
      id: 1,
      accountNumber: 1121997288,
      createdOn: '23-04-2018',
      owner: 1,
      type: 'savings',
      status: 'active',
      balance: 10000.00,
    };
    chai.request(app)
      .delete('/:accountNumber')
      .send(account)
      .end((err, res) => {
        res.should.have.status(404);
      });
  });
});
