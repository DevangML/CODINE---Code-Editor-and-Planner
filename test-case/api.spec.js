var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expressApp = require('../codine.app');

describe.skip('Testing an api', () => {
  it('get user', (done) => {
    chai
      .request(expressApp)
      .get('/api')
      .end((err, response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.have.all.keys('data', 'status', 'test');
        done();
      });
  });
});
