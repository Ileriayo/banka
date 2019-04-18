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

  it('View - Should view a specific account', () => {
    chai.request(app)
    // account exists
      .get('/api/v1/accounts/1121997288')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });
  });

  it('View - Should return 404 is account doesn\'t exist', () => {
    chai.request(app)
    // invalid account
      .get('/api/v1/accounts/11219947288')
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
