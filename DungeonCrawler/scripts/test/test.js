var assert = chai.assert;

function testCode() {
	var message = new MessageHandler();
	message.timer = 0;
	message.Update();
	console.log(message);
}

// returns ctx
function createCanvas() {
	var canvas = document.createElement("canvas");
	var testDiv = document.getElementById("test-div");
  var ctx = canvas.getContext("2d");
	return ctx;
}

testCode();

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

	// Example of Blackbox testing
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

describe('Harambe', function() {
	it('should initialize properly', function() {
		var harambe = new Harambe(12*16, 12*16);
		assert.equal(harambe.type, "NPC");
    assert.equal(harambe.transform.position.x, 12*16);
    assert.equal(harambe.transform.position.y, 12*16);
    assert.equal(harambe.alive, true);
    assert.equal(harambe.ignoreOnLoad, false);
    assert.equal(harambe.delete, false);
		assert.equal(harambe.timer, 1000);
	});

	it('should return have onCollide return true', function() {
		var harambe = new Harambe(12*16, 12*16);
		assert.equal(harambe.onCollide(), true);
	});

	it('should have Start() working properly', function() {
		var harambe = new Harambe(12*16, 12*16);
		harambe.Start();
		assert.equal(harambe.transform.position.x, 12*16);
		assert.equal(harambe.transform.position.y, 12*16);
	});

	it('should have Update() working properly', function () {
		var harambe = new Harambe(12*16, 12*16);
		harambe.Start();
		harambe.timer = 0;
		harambe.Update(Scene);
		assert.equal(harambe.timer, 10000);
	});

	// it('should have Draw() working properly', function() {
	// 	var harambe = new Harambe(12*16, 12*16);
	// 	harambe.Start();
	// 	harambe.Draw();
	// });
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
		skull.doDamage(20);
		assert.equal(skull.health, 180);
	});

	it('should have onCollide() return true', function() {
		var skull = new Skull(12*16, 12*16);
    var swordSlash = new SwordSlash(200,200,28, 28, new Vector2(0, 0));
    var boxCollider = new BoxCollider(200,200, swordSlash);
		var result = skull.onCollide(Scene, boxCollider);
		assert.equal(result, true);
	});

	it('should have Start() working properly', function() {
		var skull = new Skull(12*16, 12*16);
		skull.Start();
		assert.equal(skull.transform.position.x, 12*16);
		assert.equal(skull.transform.position.y, 12*16);
	});

  it('should have Update() working properly', function() {
		var skull = new Skull(12*16, 12*16);
    skull.Start();
    skull.doDamage(200);
    skull.Update(Scene);
  });
});

describe('Bird', function() {
	it('should be of type Bird', function() {
		var bird = new Bird(12*16, 12*16);
		assert.equal(bird.type, "Bird");
	});

	it('should have transform positions initialized properly', function() {
		var bird = new Bird(12*16,12*16);
		assert.equal(bird.transform.position.x, 12*16);
		assert.equal(bird.transform.position.y, 12*16);
	});

	it('should have doDamage() working properly', function() {
    var bird = new Bird(12*16, 12*16);
		bird.doDamage(20);
		assert.equal(bird.health, 480);
	});

	it('should have onCollide() return true', function() {
		var bird = new Bird(12*16, 12*16);
    var swordSlash = new SwordSlash(200,200,28, 28, new Vector2(0, 0));
    var boxCollider = new BoxCollider(200,200, swordSlash);
		var result = bird.onCollide(Scene, boxCollider);
		assert.equal(result, true);
	});

	it('should have Start() working properly', function() {
		var bird = new Bird(12*16, 12*16);
		bird.Start();
		assert.equal(bird.transform.position.x, 12*16);
		assert.equal(bird.transform.position.y, 12*16);
	});

  it('should have Update() working properly', function() {
    var bird = new Bird(12*16, 12*16);
    bird.Start();
    bird.doDamage(500);
    bird.Update(Scene);
  });

});

describe('Wizerd', function() {
	it('should be of type Wizerd', function() {
		var wizerd = new Wizerd(12*16, 12*16);
		assert.equal(wizerd.type, "Wizerd");
	});

	it('should have transform positions initialized properly', function() {
		var wizerd = new Wizerd(12*16,12*16);
		assert.equal(wizerd.transform.position.x, 12*16);
		assert.equal(wizerd.transform.position.y, 12*16);
	});

	it('should have doDamage() working properly', function() {
    var wizerd = new Wizerd(12*16, 12*16);
		wizerd.doDamage(20);
		assert.equal(wizerd.health, 30);
	});

	it('should have onCollide() return true', function() {
		var wizerd = new Wizerd(12*16, 12*16);
    var swordSlash = new SwordSlash(200,200,28, 28, new Vector2(0, 0));
    var boxCollider = new BoxCollider(200,200, swordSlash);
		var result = wizerd.onCollide(Scene, boxCollider);
		assert.equal(result, true);
	});

	it('should have Start() working properly', function() {
		var wizerd = new Wizerd(12*16, 12*16);
		wizerd.Start();
		assert.equal(wizerd.transform.position.x, 12*16);
		assert.equal(wizerd.transform.position.y, 12*16);
	});

  it('should have Update() working properly', function() {
    var wizerd = new Wizerd(12*16, 12*16);
    wizerd.Start();
    wizerd.doDamage(500);
    wizerd.Update(Scene);
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
		slime.doDamage(20);
		assert.equal(slime.health, 80);
	});

	it('should have onCollide() return true', function() {
		var slime = new Slime(12*16, 12*16);
    var swordSlash = new SwordSlash(200,200,28, 28, new Vector2(0, 0));
    var boxCollider = new BoxCollider(200,200, swordSlash);
		var result = slime.onCollide(Scene, boxCollider);
		assert.equal(result, true);
	});

	it('should have Start() working properly', function() {
		var slime = new Slime(12*16, 12*16);
		slime.Start();
		assert.equal(slime.transform.position.x, 12*16);
		assert.equal(slime.transform.position.y, 12*16);
	});

  it('should have Update() working properly', function() {
    var slime = new Slime(12*16, 12*16);
    slime.Start();
    slime.doDamage(500);
    slime.Update(Scene);
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

	it('should have menuAssigns working properly', function() {
		var player = new Player();
		// player.Start();
		player.menuAssignX();
		assert.equal(player.inventory[0].type, "IronSword");
		player.menuAssignZ();
		assert.equal(player.inventory[0].type, "Empty");
	});

	it('should have Start() working properly', function() {
		var player = new Player();

		player.Start(Scene);

		assert.equal(player.transform.position.x, 496);
		assert.equal(player.transform.position.y, 576);
		assert.equal(player.inventory[0].type, "Shield");
	});

  it('should have setPosition() working properly', function() {
		var player = new Player();

		player.Start(Scene);

    player.setPosition(500,500);

    assert.equal(player.transform.position.x, 500);
    assert.equal(player.transform.position.y, 500);
    assert.equal(player.prevX, 500);
    assert.equal(player.prevY, 500);
  });

  it('should have addCoin() working properly', function() {
		var player = new Player();

		player.Start(Scene);
    player.addCoin(20);

    assert.equal(player.coin, 20);
  });

  it('should have doDamage() working properly', function() {
		var player = new Player();

		player.Start(Scene);
    player.doDamage(20);

    assert.equal(player.health, 80);
  });

  it('should have onCollide() working properly', function() {
    var player = new Player();
    var slime = new Slime();
    var skull =  new Skull();
    var wizerd = new Wizerd();
    var bird = new Bird();
    var boxCollider = new BoxCollider(200,200, slime);

    player.Start(Scene);
    var result = player.onCollide(Scene, boxCollider);

    assert.equal(player.health, 95);
    assert.equal(result, true);

    boxCollider = new BoxCollider(200,200, skull);
    player.onCollide(Scene, boxCollider);
    assert.equal(player.health, 70);

    boxCollider = new BoxCollider(200,200, wizerd);
    player.onCollide(Scene, boxCollider);
    assert.equal(player.health, 35);

    boxCollider = new BoxCollider(200,200, bird);
    player.onCollide(Scene, boxCollider);
    assert.equal(player.health, -10);
  });

  it('should have Update() cover input.arrowKeyUp', function() {
    var player = new Player();

    player.Start(Scene);
    var tempFrame = player.frame;

    input.arrowKeyUp = true;

    player.Update(Scene);
    tempFrame += Scene.deltaTime*0.01;
    tempFrame = tempFrame % 3;
    assert.equal(player.frame, tempFrame);
  });

  it('should have shift key working', function() {
    var player = new Player();

    player.Start(Scene);

    input.arrowKeyUp = true;
    input.arrowKeyLeft = true;
    input.shift = true;

    player.Update(Scene);

    assert.equal(player.speed, 0.1);
  });

  it('should face left when arrowKeyLeft is true', function() {
    var player = new Player();

    player.Start(Scene);

    input.arrowKeyUp = true;
    input.arrowKeyLeft = true;

    player.Update(Scene);

    assert.equal(player.facing, 1);
  });

  it('should face right when arrowKeyRight is true', function() {
    var player = new Player();

    player.Start(Scene);

    input.arrowKeyUp = true;
    input.arrowKeyRight = true;

    player.Update(Scene);

    assert.equal(player.facing, 2);
  });

  it('should face down when arrowKeyDown is true', function() {
    var player = new Player();

    player.Start(Scene);

    input.arrowKeyUp = true;
    input.arrowKeyDown = true;

    player.Update(Scene);

    assert.equal(player.facing, 2);
  });

  it('should cover more when Draw() is called', function(){
    var player = new Player();

    player.Start(Scene);
    player.Draw(Scene);
  });

  it('should cover more when Draw() is called and there is item', function(){
    var player = new Player();

    player.Start(Scene);
    player.Draw(Scene);
    player.menuAssignZ;

  });
});

describe('LightRenderer', function() {
	it('should have initialization properties working properly', function() {
		var slime = new Slime(23*16, 23*16);
		var lightRenderer = new LightRenderer(slime, "#444444", 23);

		assert.equal(lightRenderer.parent, slime);
		assert.equal(lightRenderer.color, "#444444");
		assert.equal(lightRenderer.radius, 23);
	});

	it('should have Draw() working properly', function() {
		var slime = new Slime(23*16, 23*16);
		var lightRenderer = new LightRenderer(slime, "#444444", 23);
		lightRenderer.Draw();

		assert.equal(Scene.tileRenderer.lightContext.globalCompositeOperation, "lighter");
		assert.equal(Scene.tileRenderer.lightContext.globalCompositeOperation, "source-over");
	});
});

describe('MessageHandler', function() {
	it('should have initialization properties working properly', function() {
		var slime = new Slime();
		var message = new MessageHandler(slime);

		assert.equal(message.parent, slime);
		assert.equal(message.currentMessage, "");
		assert.equal(message.timer, 5000);
	});

	it('should have Push() working properly', function() {
		var messageToPush = "This is a test.";
		var message = new MessageHandler();
		message.Push(messageToPush);

		assert.equal(message.messageQueue[0], messageToPush);
	});

	it('should have Update() working properly', function() {
		var message = new MessageHandler();
		message.timer = 0;
		message.Update();

		assert.deepEqual(message.timer, NaN);
	});

	it('should have Draw() working properly', function() {
		var message = new MessageHandler();
		var ctx = createCanvas();

		message.timer = 0;

		message.Draw();

		assert.equal(ctx.textAlign, "center");
		assert.equal(ctx.font, "8px Pixel");
		assert.equal(ctx.fillStyle,"#FFFFFF");
	});
});
