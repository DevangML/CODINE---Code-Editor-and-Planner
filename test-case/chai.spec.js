var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

//########## ASSERT ###########//

describe('Aspect check', function () {
  let userName = 'code improve';

  let mylist = {
    item: [
      {
        id: 1,
        name: 'demo',
      },
    ],
    title: 'user list',
  };

  it('check string', function () {
    assert.typeOf(userName, 'String');
  });

  it('equal match', function () {
    assert.equal(userName, 'code improve');
  });

  it('length check', function () {
    assert.lengthOf(mylist.item, 1);
  });
});

//########## SHOULD ###########//

describe('should check', function () {
  let userName = 'code improve';

  let mylist = {
    item: [
      {
        id: 1,
        name: 'demo',
      },
    ],
    title: 'user list',
  };

  it('check string', function () {
    userName.should.be.a('string');
  });

  it('equal check', function () {
    userName.should.equal('code improve');
  });

  it('length check', function () {
    mylist.should.have.property('item').lengthOf(1);
  });
});

//########## EXPECT ###########//

describe('EXPECT check', function () {
  let userName = 'code improve';

  let mylist = {
    item: [
      {
        id: 1,
        name: 'demo',
      },
    ],
    title: 'user list',
    address: {
      country: 'India',
      phoneno: ['9874563215', '1234567896'],
    },
  };

  it('check string', function () {
    expect(userName).to.be.a('string');
  });

  it('equal check', function () {
    expect(userName).to.equal('code improve');
  });

  it('length check', function () {
    expect(userName).to.lengthOf(12);
  });

  it('length check for object', function () {
    expect(mylist).to.have.property('item').lengthOf(1);
  });

  it('api object match', function () {
    expect(mylist).to.have.all.keys('item', 'title', 'address');
  });

  it('api nested object match', function () {
    expect(mylist).to.have.nested.property('address.phoneno[0]');
  });

  it('api nested object country match', function () {
    expect(mylist).to.have.nested.include({ 'address.country': 'India' });
  });
});
