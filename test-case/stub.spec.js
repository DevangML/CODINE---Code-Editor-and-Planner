var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var Student = require('./controllers/studentCtrl');
var studentObj = new Student();

describe('----------stub----------', function () {
  var stubObj = sinon.stub(studentObj, 'getExternal');
  it('test user function', function () {
    stubObj.withArgs(40).returns(5);
    expect(studentObj.finalMarks(40)).to.be.equal(90);
  });
});
