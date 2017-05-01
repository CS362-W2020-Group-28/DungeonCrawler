function ArrowProjectile() {
	this.transform = new Transform(this);

	this.Start = function(scene) {


	}

	this.Update = function(scene) {

	}

	this.Draw = function(scene) {

	}

}

function SwordSlash(x, y, width, height) {

	this.transform = new Transform(this);
	this.type = "SwordSlash";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.components = {};

  	this.rect = document.getElementById("rect");


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


	}

	this.Draw = function(scene) {
    	ctx.drawImage(this.rect,0, 0, 16,16, this.transform.position.x - (this.components.boxCollider.width/2),this.transform.position.y - (this.components.boxCollider.height/2), this.components.boxCollider.width, this.components.boxCollider.height);
	}

}