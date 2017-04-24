var assert = require('chai').assert;

describe('Slime', function() {

  it('should return slime', function() {
    var testSlime = new Slime(12,12);
    assert.equal(testSlime, new Slime(12,12));
  });

  it('should be of type slime', function() {
    var testSlime = new Slime(12,12);
    assert.equal(testSlime.type, "Slime");
  });
});
