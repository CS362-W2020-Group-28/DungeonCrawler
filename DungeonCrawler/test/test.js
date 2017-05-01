var assert = chai.assert;

// Tests if the testing framework is working properly or not.
describe('Initial', function(){
  it('Array should return first element of array', function() {
    var x = [1];
    assert.equal(x[0],1);
  });
});

describe('Slime', function() {
  // Checks if slime is being read properly by test file
  it('should be of type slime', function() {
    var testSlime = new Slime(12,12);
    assert.equal(testSlime.type, "Slime");
  });
});

describe('Player', function() {
  // Checks if slime is being read properly by test file
  it('should be of type player', function() {
    var player = new Player();
    assert.equal(player.type, "Player");
  });

  it('should be facing down during initialization', function() {
    var player = new Player();
    assert.equal(player.facing, 0);
  });

  it('should have menuGoLeft working properly', function() {
    var player = new Player();
    player.menuGoRight();
    player.menuGoRight();
    player.menuGoLeft();
    assert.equal(player.menuIndex, 1);
  });

  it('should have menuGoLeft hit 0 when at 0', function() {
    var player = new Player();
    player.menuGoLeft();
    assert.equal(player.menuIndex, 0);
  });

  it('should have menuGoRight working properly', function() {
    var player = new Player();
    player.menuGoRight();
    assert.equal(player.menuIndex, 1);
  });

	
  it('should have setPosition working properly', function() {
    var player = new Player();
		var Scene = new Scene();

		Scene.Start();
		requestAnimationFrame(mainLoop);

		var scenePosition = Scene.Camera.transform.position;

		player.setPosition(16,16);

    assert.equal(16, scenePosition.y);
  });

});
