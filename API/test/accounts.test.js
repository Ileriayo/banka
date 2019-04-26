/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
chai.should();

const staffDetails = {};
const newStaff = {
  email: 'newstaff@gmail.com', firstName: 'user', lastName: 'user', password: 'password', type: 'staff', isAdmin: false,
};

const userDetails = {};
const newcClient = {
  id: 200, email: 'newuser@gmail.com', firstName: 'user', lastName: 'staff', type: 'client', isAdmin: false,
};

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

  it('Should get all user accounts', (done) => {
    chai.request(app)
      .get('/api/v1/accounts')
      .set('Authorization', `Bearer ${staffDetails.token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('POST /accounts', () => {
  it('Should create a new bank account', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${staffDetails.token}`)
      .send(validAccount)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should not create bank account without a type', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${staffDetails.token}`)
      .send({
        id: 1,
        accountNumber: 1121997288,
        createdOn: '23-04-2018',
        owner: 1,
        type: null,
        status: 'active',
        balance: 10000.00,
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('GET /accounts/:accountNumber', () => {
  it('Should view a specific account', (done) => {
    const account = validAccount.accountNumber;
    chai.request(app)
    // account exists
      .get(`/api/v1/accounts/${account}`)
      .set('Authorization', `Bearer ${staffDetails.token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  describe('PATCH /account/<account-number>', () => {
    it('Should change account status', (done) => {
      const account = validAccount.accountNumber;
      chai.request(app)
      // account exists
        .patch(`/api/v1/accounts/${account}`)
        .set('Authorization', `Bearer ${staffDetails.token}`)
        .send({ validAccount })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    //   it('Should change account status from dormant to active', (done) => {
    //     const testAccount = {
    //       id: 1,
    //       accountNumber: 1121997288,
    //       createdOn: '23-04-2018',
    //       owner: 1,
    //       type: 'savings',
    //       balance: 10000.00,
    //     };
    //     // tes
    //     const account = testAccount.accountNumber;
    //     chai.request(app)
    //       .patch(`api/v1/accounts/${account}`)
    //       .set('Authorization', `Bearer ${staffDetails.token}`)
    //       .send({ testAccount })
    //       .end((err, res) => {
    //         console.log(res, staffDetails.token);
    //         res.body.should.have.status(200);
    //         res.body.should.be.a('object');
    //         done();
    //       });
    //   });
    // });

    //   it('Should return 404 if account doesn\'t exist', (done) => {
    //     const invalidAccount = {
    //       id: 1,
    //       accountNumber: 1010101010,
    //       createdOn: '23-04-2018',
    //       owner: 1,
    //       type: 'savings',
    //       status: 'dormant',
    //       balance: 10000.00,
    //     };
    //     const account = invalidAccount.accountNumber;
    //     chai.request(app)
    //     // invalid account
    //       .patch('api/v1/accounts/account}')
    //       .set('Authorization', `Bearer ${staffDetails.token}`)
    //       .end((err, res) => {
    //         res.body.should.have.status(404);
    //         res.body.should.be.a('object');
    //         done();
    //       });
    //   });
    // });

    describe('DELETE /accounts/:accountNumber', () => {
      it('Should delete a single account', (done) => {
        chai.request(app)
          .delete(`/api/v1/accounts/${validAccount.accountNumber}`)
          .set('Authorization', `Bearer ${staffDetails.token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });

      it('Should return 404 when account does not exist', (done) => {
        chai.request(app)
        // invalid account
          .delete('/api/v1/accounts/11219947288')
          .set('Authorization', `Bearer ${staffDetails.token}`)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
          });
      });
    });
  });
});
