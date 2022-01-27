var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

describe('Heading 1', () => {
  before(() => {
    console.log(`========================First========================`);
  });

  beforeEach(() => {
    console.log(`========================Before every test case========================`);
    sinon.restore();
  });

  afterEach(() => {
    console.log(`========================After every test case========================`);
  });
  after(() => {
    console.log(`========================Last========================`);
  });

  let data = 'code';

  it('check string', () => {
    expect(data).to.be.a('string');
  });

  it('value', () => {
    expect(data).to.be.equal('code');
  });

  it.skip('value2', () => {
    expect(data).to.be.equal('codes');
  });
});

describe.skip('Heading 2', () => {
  let data = 'code';

  it('check string 2', () => {
    expect(data).to.be.a('string');
  });

  it('value', () => {
    expect(data).to.be.equal('code');
  });
});
