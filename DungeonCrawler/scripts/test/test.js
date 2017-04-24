var assert = chai.assert;

// Tests if the testing framework is working properly or not.
describe('Initial', function(){
  it('Array should return first element of array', function() {
    var x = [1];
    assert.equal(x[0],1);
  });
});

describe('Slime', function() {

  it('should return slime', function() {
    var testSlime = new Slime(12,12);
    // assert.equal(testSlime, new Slime(12,12));
  });

  it('should be of type slime', function() {
    var testSlime = new Slime(12,12);
    assert.equal(testSlime.type, "Slime");
  });
});
