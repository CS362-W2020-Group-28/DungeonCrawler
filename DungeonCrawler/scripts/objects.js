function ArrowProjectile() {
	this.transform = new Transform(this);

	this.Start = function(scene) {


	}

	this.Update = function(scene) {

	}

	this.Draw = function(scene) {

	}

}

function ShieldBubble(x, y, width, height, parent) {

	this.transform = new Transform(this);
	this.parent = parent;
	this.type = "ShieldBubble";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.components = {};

    this.timer = 100;

  	this.img = document.getElementById("playerShield");

  	this.delete = false;


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
			//this.delete = true;
		}
	}

	this.Draw = function(scene) {
    	ctx.drawImage(this.img,0, 0, 32,32, this.transform.position.x - (this.components.boxCollider.width/2),this.transform.position.y - (this.components.boxCollider.height/2), this.components.boxCollider.width, this.components.boxCollider.height);
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