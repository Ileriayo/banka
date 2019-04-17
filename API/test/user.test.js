// /* eslint-disable no-undef */
// // import { expect, should } from 'mocha';
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// // import userController from '../controllers/user.controller';

// import server from '../index';

// // let { signIn, signUp } = userController;
// const should = chai.should();
// chai.use(chaiHttp);

// // describe('User', () => {
// //   describe('Sign In', () => {
// //     it('Email and Password should match', () => {
// //         userController.signIn.
// //     });
// //   });

// //   describe('View Transactions', () => {
// //     it('Should return all transactions', () => {
// //       return transactionData;
// //     })
// //   })

// // });

// describe('signup', () => {
//   const correctUser = {
//     firstName: 'a',
//     lastName: 'b',
//     email: 'a@gmail.com',
//     password: 'awer',
//     type: 'client',
//     isAdmin: false,
//   };
//   it('should signup user', (done) => {
//     chai.request(server)
//       .post('/api/v1/auth/signup')
//       .send(correctUser)
//       .end((error, response) => {
//         response.should.have.status(201);
//         done();
//       });
//   });
//   const correctUser1 = {
//     firstName: 'a',
//     lastName: 'b',
//     email: 'a@gmail.com',
//     password: 'awer',
//     type: 'client',
//     isAdmin: false,
//   };
//   const correctUser2 = {
//     firstName: 'a',
//     lastName: 'b',
//     email: 'a@gmail.com',
//     password: 'awer',
//     type: 'client',
//     isAdmin: false,
//   };
//   it('duplicate email not allowed', (done) => {
//     chai.request(server)
//       .post('/api/v1/auth/signup')
//       .send(correctUser1)
//       .send(correctUser2)
//       .end((error, response) => {
//         response.should.have.status(400);
//         done();
//       });
//   });
// });
