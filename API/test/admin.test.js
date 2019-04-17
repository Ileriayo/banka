import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('GET /api/v1/auth/accounts', () => {
    it('Should get all user accounts', (done) => {
        chai.request(app)
            .get('/')
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});