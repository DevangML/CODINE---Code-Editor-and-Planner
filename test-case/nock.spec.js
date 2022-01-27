var chai = require('chai');
var expect = chai.expect;
var Student = require('./controllers/studentCtrl');
var studentObj = new Student();
const userCtrl = require('./controllers/userCtrl');
const nock = require('nock');

describe('----------Nock----------', function () {
  it('api test', (done) => {
    var obj = { status: 'ok', statusCode: 200, data: [] };

    const apiHit = nock('http://localhost/api').get('/article-list').reply(200, obj);

    studentObj
      .thirdPartApi()
      .then((record) => {
        expect(record).to.be.eql(obj);
        done();
      })
      .catch((err) => {
        done(new Error('error:-' + err));
      });
  });
});
