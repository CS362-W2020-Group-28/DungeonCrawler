var assert = chai.assert;

function testCode() {
}

describe('NPC', function() {
  // Checks if slime is being read properly by test file
  it('should be of type NPC', function() {
    var npc = new NPC(12*16, 12*16);
    assert.equal(npc.type, "NPC");
  })

  it('should have transform positions initialized properly', function() {
    var npc = new NPC(12*16,12*16);
    assert.equal(npc.transform.position.x, 12*16);
    assert.equal(npc.transform.position.y, 12*16);
  });

  it('should have onCollide return true', function() {
    var npc = new NPC(12*16,12*16);
    assert.equal(npc.onCollide(), true);
  });

  it('should have the transform properties set properly when Start() is called', function() {
    var npc = new NPC(14*16,14*16);
    npc.Start();
    assert.equal(npc.transform.position.x, 14*16);
    assert.equal(npc.transform.position.y, 14*16);
  });
});

describe('Skull', function() {
  it('should be of type Skull', function() {
    var skull = new Skull(12*16, 12*16);
    assert.equal(skull.type, "Skull");
  });

  it('should have transform positions initialized properly', function() {
    var skull = new Skull(12*16,12*16);
    assert.equal(skull.transform.position.x, 12*16);
    assert.equal(skull.transform.position.y, 12*16);
  });

  it('should have doDamage() working properly', function() {
    var skull = new Skull(12*16, 12*16);
    skull.doDamage();
    assert.equal(skull.alive, false);
    assert.equal(skull.delete, true);
  });

  it('should have onCollide() return true', function() {
    var skull = new Skull(12*16, 12*16);
    assert.equal(skull.onCollide(), true);
  });

  it('should have Start() working properly', function() {
    var skull = new Skull(12*16, 12*16);
    skull.Start();
    assert.equal(skull.transform.position.x, 12*16);
    assert.equal(skull.transform.position.y, 12*16);
  });
});

describe('Bird', function() {
  it('should be of type Bird', function() {
    var bird = new Bird(12*16, 12*16);
    assert.equal(bird.type, "Bird");
  });

  it('should have transform positions initialized properly', function() {
    var bird = new Skull(12*16,12*16);
    assert.equal(bird.transform.position.x, 12*16);
    assert.equal(bird.transform.position.y, 12*16);
  });

  it('should have doDamage() working properly', function() {
    var bird = new Skull(12*16, 12*16);
    bird.doDamage();
    assert.equal(bird.alive, false);
    assert.equal(bird.delete, true);
  });

  it('should have onCollide() return true', function() {
    var bird = new Skull(12*16, 12*16);
    assert.equal(bird.onCollide(), true);
  });

  it('should have Start() working properly', function() {
    var bird = new Skull(12*16, 12*16);
    bird.Start();
    assert.equal(bird.transform.position.x, 12*16);
    assert.equal(bird.transform.position.y, 12*16);
  });
});

describe('Slime', function() {
  it('should be of type Slime', function() {
    var slime = new Slime(12*16, 12*16);
    assert.equal(slime.type, "Slime");
  });

  it('should have transform positions initialized properly', function() {
    var slime = new Slime(12*16,12*16);
    assert.equal(slime.transform.position.x, 12*16);
    assert.equal(slime.transform.position.y, 12*16);
  });

  it('should have doDamage() working properly', function() {
    var slime = new Slime(12*16, 12*16);
    slime.doDamage();
    assert.equal(slime.alive, false);
    assert.equal(slime.delete, true);
  });

  it('should have onCollide() return true', function() {
    var slime = new Slime(12*16, 12*16);
    assert.equal(slime.onCollide(), true);
  });

  it('should have Start() working properly', function() {
    var slime = new Slime(12*16, 12*16);
    slime.Start();
    assert.equal(slime.transform.position.x, 12*16);
    assert.equal(slime.transform.position.y, 12*16);
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
