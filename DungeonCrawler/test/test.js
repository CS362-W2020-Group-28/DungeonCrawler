var assert = chai.assert;

describe('Slime', function() {

  it('should return slime', function() {
    var testSlime = new Slime(12,12);
    assertEquals(testSlime, new Slime(12,12));
  });

  it('should be of type slime', function() {
    var testSlime = new Slime(12,12);
    assertEquals(testSlime.type, "Slime");
  });
});
