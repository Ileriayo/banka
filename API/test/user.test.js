import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('POST /api/v1/auth/signin', () => {
  const user = {
    email: 'ileriayo@gmail.com',
    password: 'password',
  };
  it('Should sign the user in', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .type('form')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

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
