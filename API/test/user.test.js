import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('POST /api/v1/auth/signup', () => {
  const newUser = {
    email: 'newUser@gmail.com',
    password: 'password',
    firstName: 'New',
    lastName: 'User',
    isAdmin: false,
  };
  it('Should check for required fields', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .type('form')
      .send()
      .end((err, res) => {
        res.should.not.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should sign up a new user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .type('form')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should not sign up with existing account', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .type('form')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('POST /api/v1/auth/signin', () => {
  const validUser = {
    email: 'ileriayo@gmail.com',
    password: 'password',
  };
  const invalidUser = {
    email: 'fake@gmail.com',
    password: 'passwords',
  };
  it('Should sign in existing', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .type('form')
      .send(validUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should not sign the wrong user in', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .type('form')
      .send(invalidUser)
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should check for email field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .type('form')
      .send({ password: 'password' })
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should check for password field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .type('form')
      .send({ email: 'ileriayo@gmail.com' })
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('POST /api/v1/auth/staff', () => {
  const newStaff = {
    email: 'newStaff@gmail.com',
    password: 'password',
    firstName: 'New',
    lastName: 'User',
  };
  it('Should check for required fields', (done) => {
    chai.request(app)
      .post('/api/v1/auth/staff')
      .end((err, res) => {
        res.body.should.not.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should sign up a new staff', (done) => {
    chai.request(app)
      .post('/api/v1/auth/staff')
      .type('form')
      .send(newStaff)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should not create duplicate staff', (done) => {
    chai.request(app)
      .post('/api/v1/auth/staff')
      .type('form')
      .send(newStaff)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});


// describe('GET /api/v1/auth/transactions', () => {
//   it('Should get all transactions', (done) => {
//     chai.request(app)
//       .get('/')
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         done();
//       });
//   });
// });
