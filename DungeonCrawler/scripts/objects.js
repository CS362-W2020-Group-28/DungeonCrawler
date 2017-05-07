function ArrowProjectile() {
	this.transform = new Transform(this);

	this.Start = function(scene) {


	}

	this.Update = function(scene) {

	}

	this.Draw = function(scene) {

	}

}
function HPotion(x, y, width, height, parent) {

	this.transform = new Transform(this);
	this.parent = parent;
	this.type = "HPotion";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.components = {};

    this.timer = 2000;

  	this.img = document.getElementById("playerShield");

  	this.delete = false;
  	this.ignoreOnLoad = false;


    this.onCollide = function(scene, collider) {


    	return true;
    }

	this.Start = function(scene) {


	}

	this.Update = function(scene) {

		this.transform.position.x = this.parent.transform.position.x;
		this.transform.position.y = this.parent.transform.position.y;




		this.timer -= scene.deltaTime;

		if(this.timer <= 0) {
			this.delete = true;
		}
	}

	this.Draw = function(scene) {
    	ctx.drawImage(this.img,0, 0, 32,32, this.transform.position.x - (width/2),this.transform.position.y - (height/2), width, height);
	}

}
function SPotion(x, y, width, height, parent) {

	this.transform = new Transform(this);
	this.parent = parent;
	this.type = "SPotion";
    this.transform.position.x = x;
    this.transform.position.y = y;

   this.parent.playerSpeed(0.2);

    this.components = {};

    this.timer = 10000;

  	this.img = document.getElementById("playerShield");

  	this.delete = false;
  	this.ignoreOnLoad = false;


    this.onCollide = function(scene, collider) {


    	return true;
    }

	this.Start = function(scene) {


	}

	this.Update = function(scene) {

		this.transform.position.x = this.parent.transform.position.x;
		this.transform.position.y = this.parent.transform.position.y;
		


		this.timer -= scene.deltaTime;
		//console.log(this.timer);

		if(this.timer <= 0) {
			this.delete = true;
			this.parent.playerSpeed(0.1);
		}
	}

	this.Draw = function(scene) {
    	ctx.drawImage(this.img,0, 0, 32,32, this.transform.position.x - (width/2),this.transform.position.y - (height/2), width, height);
	}

}

function BombFunction(x, y, width, height) {

	this.transform = new Transform(this);
	this.parent = parent;
	this.type = "Bomb";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.components = {};

    this.timer = 3000;

  	this.img = document.getElementById("BombIcon");

  	this.delete = false;
  	this.ignoreOnLoad = false;


    this.onCollide = function(scene, collider) {


    	return true;
    }

	this.Start = function(scene) {

		this.components.boxCollider = new BoxCollider(width, height, this);
		this.components.boxCollider.isTrigger = true;
		this.components.boxCollider.ignorePlayer = true;
		this.transform = new Transform(this);
        this.transform.position.x = x;
        this.transform.position.y = y;

	}

	this.Update = function(scene) {
		this.timer -= Scene.deltaTime;

		if(this.timer <= 0) {
			this.delete = true;
			Scene.addObject(new BombExplosion(this.transform.position.x, this.transform.position.y, 32, 32));
		}
		
	}

	this.Draw = function(scene) {
    	ctx.drawImage(this.img,0, 0, 16,16, this.transform.position.x - (this.components.boxCollider.width/2),this.transform.position.y - (this.components.boxCollider.height/2), this.components.boxCollider.width, this.components.boxCollider.height);
	}

}
function BombExplosion(x, y, width, height) {

	this.transform = new Transform(this);
	this.velocity = new Vector2(0, 0);
	this.type = "BombExplosion";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.components = {};

    this.timer = 100;

  	this.rect = document.getElementById("Bomb");

  	this.delete = false;
  	this.ignoreOnLoad = false;


    this.onCollide = function(scene, collider) {


    	try {
    	collider.parent.doDamage();
    	console.log("Doing damage on " + collider.parent.type);


    	} catch(ex) {

    	}


    	this.delete=true;
    	return true;
    }

	this.Start = function(scene) {

		this.components.boxCollider = new BoxCollider(width, height, this);
		this.components.boxCollider.isTrigger = true;
		this.components.lightRenderer = new LightRenderer(this, "#111111", 128);

		this.transform = new Transform(this);
        this.transform.position.x = x;
        this.transform.position.y = y;

	}

	this.Update = function(scene) {
		this.transform.Translate(0, 0, scene);

		this.timer -= scene.deltaTime;

		if(this.timer <= 0) {
			this.delete = true;
		}
	}

	this.Draw = function(scene) {
    	ctx.drawImage(this.rect,16*5, 0, 16,16, this.transform.position.x - (this.components.boxCollider.width/2),this.transform.position.y - (this.components.boxCollider.height/2), this.components.boxCollider.width, this.components.boxCollider.height);
	}

}
function ShieldBubble(x, y, width, height, parent) {

	this.transform = new Transform(this);
	this.parent = parent;
	this.type = "ShieldBubble";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.components = {};

    this.timer = 5000;

  	this.img = document.getElementById("playerShield");

  	this.delete = false;
  	this.ignoreOnLoad = true;


    this.onCollide = function(scene, collider) {


    	return true;
    }

	this.Start = function(scene) {

		this.components.boxCollider = new BoxCollider(width, height, this);
		this.components.boxCollider.isTrigger = false;
		this.components.boxCollider.ignorePlayer = true;
		this.transform = new Transform(this);
        this.transform.position.x = x;
        this.transform.position.y = y;

	}

	this.Update = function(scene) {

		this.transform.position.x = this.parent.transform.position.x;
		this.transform.position.y = this.parent.transform.position.y;

		this.transform.Translate(0, 0, scene);




		this.timer -= scene.deltaTime;

		if(this.timer <= 0) {
			this.delete = true;
		}
	}

	this.Draw = function(scene) {
    	ctx.drawImage(this.img,0, 0, 32,32, this.transform.position.x - (this.components.boxCollider.width/2),this.transform.position.y - (this.components.boxCollider.height/2), this.components.boxCollider.width, this.components.boxCollider.height);
	}

}

function Coin(x, y) {

	this.transform = new Transform(this);
	this.velocity = new Vector2(0, 0);
	this.type = "Coin";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.components = {};

  	this.img = document.getElementById("coin");

  	this.ignoreOnLoad = false;
  	this.delete = false;


  	this.frame = 0;

  	this.value = 1;

    this.onCollide = function(scene, collider) {	

    	try {
    		collider.parent.addCoin(this.value);
    		this.delete = true;

    		console.log("Picking up coin");


    	} catch(ex) {

    	}


    	return true;
    }

	this.Start = function(scene) {

		this.components.boxCollider = new BoxCollider(8, 8, this);
		this.components.boxCollider.isTrigger = true;
		this.components.lightRenderer = new LightRenderer(this, "#0F0F00", 32);
		this.transform = new Transform(this);
        this.transform.position.x = x;
        this.transform.position.y = y;

	}

	this.Update = function(scene) {
		this.transform.Translate(0, 0, scene);


		this.frame += scene.deltaTime*0.02;

		this.frame = this.frame % 4;

	}

	this.Draw = function(scene) {
    	ctx.drawImage(this.img,Math.floor(this.frame)*8, 0, 8,8, this.transform.position.x - (this.components.boxCollider.width/2),this.transform.position.y - (this.components.boxCollider.height/2), this.components.boxCollider.width, this.components.boxCollider.height);
	}

}


function SwordSlash(x, y, width, height) {

	this.transform = new Transform(this);
	this.velocity = new Vector2(0, 0);
	this.type = "SwordSlash";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.components = {};

    this.timer = 100;

  	this.rect = document.getElementById("rect");

  	this.delete = false;


    this.onCollide = function(scene, collider) {


    	try {
    	collider.parent.doDamage();
    	console.log("Doing damage on " + collider.parent.type);


    	} catch(ex) {

    	}

    	try {
    	collider.parent.components.messageHandler.Pop();


    	} catch(ex) {

    	}

    	this.delete=true;
    	return true;
    }

	this.Start = function(scene) {

		this.components.boxCollider = new BoxCollider(width, height, this);
		this.components.boxCollider.isTrigger = true;
		this.transform = new Transform(this);
        this.transform.position.x = x;
        this.transform.position.y = y;

	}

	this.Update = function(scene) {
		this.transform.Translate(0, 0, scene);

		this.timer -= scene.deltaTime;

		if(this.timer <= 0) {
			this.delete = true;
		}
	}

	this.Draw = function(scene) {
    	ctx.drawImage(this.rect,0, 0, 16,16, this.transform.position.x - (this.components.boxCollider.width/2),this.transform.position.y - (this.components.boxCollider.height/2), this.components.boxCollider.width, this.components.boxCollider.height);
	}

}