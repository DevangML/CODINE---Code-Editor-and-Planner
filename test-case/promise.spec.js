var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var Student = require('./controllers/studentCtrl');
var studentObj = new Student();
const userCtrl = require('./controllers/userCtrl');
const chaiaspromise = require('chai-as-promised');
chai.use(chaiaspromise);

describe('----------Promise----------', function () {
  it('check value function', function (done) {
    // expect(studentObj.dbData()).to.be.equal(10);
    // this.timeout(2000);
    this.timeout(0);
    studentObj.dbData().then((result) => {
      expect(result).to.be.equal(10);
      done();
    });
  });

  it('Normal value function', () => {
    // this.timeout(2000);
    this.timeout(0); // This makes long API calls possible
    return expect(studentObj.dbData()).to.eventually.equal(10);
  });

  it('OTP', () => {
    // this.timeout(2000);
    this.timeout(0); // This makes long API calls possible
    return expect(userCtrl.newsData()).to.eventually.have.deep.property('otp');
  });
});
