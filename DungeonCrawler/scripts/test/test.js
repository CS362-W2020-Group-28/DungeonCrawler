var assert = chai.assert;

function startGame() {
  Scene = new Scene();
  Scene.Start();
}

describe('Slime', function() {
  // Checks if slime is being read properly by test file
  it('should be of type slime', function() {
    var slime = new Slime(12,12);
    assert.equal(slime.type, "Slime");
  })

  it('should have transform positions initialized properly', function() {
    var slime = new Slime(12*16,12*16);
    assert.equal(slime.transform.position.x, 12*16);
    assert.equal(slime.transform.position.y, 12*16);
  });

  it('should have doDamage() working properly', function() {
    var slime = new Slime(12,12);
    slime.doDamage();
    assert.equal(slime.alive, false);
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


  it('should have Start() working properly', function() {
    var player = new Player();

    player.Start(Scene);

    assert.equal(player.transform.position.x, 496);
    assert.equal(player.transform.position.y, 576);
  });

});
