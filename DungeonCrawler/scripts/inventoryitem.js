function Shield() {

	this.isUsing = false;

	this.icon = document.getElementById("swordIcon");
	this.type = "Shield";

	this.isActive = false;
	this.timer=100;


	this.Use = function(gameObject) {

		if(this.timer>0){

			this.isUsing = true;
			console.log("Shield timer: " + this.timer);
			gameObject.health=1000;
			this.timer -= Scene.deltaTime;
			gameObject.speed= 0;

		}
	}


	
	this.Update = function(gameObject) {



		if(this.isUsing) {


			if(this.timer <= 0) {
				this.timer = 0;
			}

			if(this.timer >= 100) {
				this.timer = 100;
			}



		} else {
			this.timer+=Scene.deltaTime * 0.5;
		}




	}

	this.Reset = function(gameObject) {
		this.isUsing = false;
		gameObject.speed= 0.1;
		gameObject.health=100;
	}


}


function IronSword() {

	this.isUsing = false;

	this.icon = document.getElementById("swordIcon");
	this.type = "IronSword";

	this.isActive = false;

	this.frame = 0;


	this.Use = function(gameObject) {

		if(!this.isUsing) {
			console.log("Using sword...");

			var x = gameObject.transform.position.x;
			var y = gameObject.transform.position.y;
			var width = 24;
			var height = 24;

			if(gameObject.facing == UP) {
				y -= 24;
			}

			else if(gameObject.facing == DOWN) {
				y += 24;
			}

			else if(gameObject.facing == LEFT) {
				x -= 24;
			}

			else if(gameObject.facing == RIGHT) {
				x += 24;
			}

			Scene.addObject(new SwordSlash(x, y, width, height));
			this.frame = 3;


			this.isUsing = true;
			this.isActive = true;
		}
		


	}

	this.Update = function(gameObject) {

		if(this.isActive) {
			this.frame+= 0.33;
			gameObject.frame = this.frame;

			if(this.frame > 5) {

				this.frame = 0;
				this.isActive = false;
			}

		}


	}

	this.Reset = function(gameObject) {

		if(!this.isActive) {
			this.isActive = false;
			this.isUsing = false;


		}
		
		
	}


}

function CrossBow() {

	this.isUsing = false;

	this.icon = document.getElementById("crossbowIcon");
	this.type = "CrossBow";

	this.isActive = false;

	this.Use = function(gameObject) {

		if(!this.isUsing) {
			console.log("Using crossbow...");




			this.isUsing = true;
		}

		


	}

	this.Update = function(gameObject) {

		if(this.isActive) {
			

		}


	}

	this.Reset = function() {
		this.isUsing = false;
	}


}



function InventoryItem() {

	this.icon = null;
	this.type = "Empty";


	this.Use = function(gameObject) {
		console.log("Empty item!");

	}

	this.Update = function(gameObject) {

	}

	this.Reset = function() {

	}

}