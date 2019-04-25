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
  id: 1,
  accountNumber: 1121997288,
  createdOn: '23-04-2018',
  owner: 1,
  type: 'savings',
  status: 'active',
  balance: 10000.00,
};

describe('GET /accounts/', () => {
  it('Should get all user accounts', (done) => {
    chai.request(app)
      .get('/')
      .set('Authorization', `Bearer ${staffToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('POST /accounts', () => {
  it('Should create a new bank account', () => {
    chai.request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${staffToken}`)
      .send(validAccount)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
      });
  });
});

describe('GET /accounts/:accountNumber', () => {
  it('Should view a specific account', () => {
    const account = validAccount.accountNumber;
    chai.request(app)
    // account exists
      .get(`/api/v1/accounts/${account}`)
      .set('Authorization', `Bearer ${staffToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });
  });

  describe('PATCH /account/<account-number>', () => {
    it('Should view a specific account', () => {
      const account = validAccount.accountNumber;
      chai.request(app)
      // account exists
        .patch(`/api/v1/accounts/${account}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .send({ validAccount })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
        });
    });

    it('Should return 404 if account doesn\'t exist', () => {
      chai.request(app)
      // invalid account
        .get('/api/v1/accounts/11219972882')
        .set('Authorization', `Bearer ${clientToken}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
        });
    });
  });

  describe('DELETE /accounts/:accountNumber', () => {
    it('Should delete a single account', () => {
      chai.request(app)
        .delete(`/api/v1/accounts/${validAccount.accountNumber}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
        });
    });

    it('Should return 404 when account does not exist', () => {
      chai.request(app)
      // invalid account
        .delete('/api/v1/accounts/11219947288')
        .set('Authorization', `Bearer ${staffToken}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
        });
    });
  });
});
