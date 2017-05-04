function Shield(p) {

	this.isUsing = false;

	this.icon = document.getElementById("shieldIcon");
	this.type = "Shield";

	this.isActive = false;

	this.timer=1000;
	this.max=1000;
	this.min=0;




	this.Use = function(gameObject) {


			var x = gameObject.transform.position.x;
			var y = gameObject.transform.position.y;

			Scene.addObject(new ShieldBubble(x, y, 64, 64, gameObject));

			this.isUsing = true;
			console.log("Shield timer: " + this.timer);
	
	}


	
	this.Update = function(gameObject) {

	}

	this.Reset = function(gameObject) {
		this.isUsing = false;
	}


}
function Bomb() {

	this.isUsing = false;

	this.icon = document.getElementById("swordIcon");
	this.type = "Bomb";
	this.isActive = false;
	this.timer=1000;
	this.max=1000;
	this.min=0;

	this.Use = function(gameObject) 
	{
			console.log("bomb");
			Scene.addObject(new SwordSlash(gameObject.transform.position.x+16, gameObject.transform.position.y, 72, 72));
		
	}


	
	this.Update = function(gameObject)
	 {




		
	}

	this.Reset = function(gameObject) 
	{
		this.isUsing = false;
	}


}
function HealthPotion(p) {

	this.isUsing = false;

	this.icon = document.getElementById("swordIcon");
	this.type = "HealthPotion";

	this.isActive = false;

	this.Use = function(gameObject) {
			gameObject.playerHealth(p);
	}


	
	this.Update = function(gameObject) {

	}

	

	this.Reset = function(gameObject) {
		this.isUsing = false;
	}


}
function SpeedPotion(p) {

	this.isUsing = false;


	this.icon = document.getElementById("swordIcon");
	this.type = "HealthPotion";

	this.isActive = false;
	this.oldSpeed = null;


	this.Use = function(gameObject) {
			this.oldSpeed = gameObject.speed;
			gameObject.playerSpeed(p);

			

			setTimeout(function() {
				gameObject.speed = this.oldSpeed;

			}, 10000);
	}


	
	this.Update = function(gameObject) {

	}

	

	this.Reset = function(gameObject) {
		
	}


}
function DefensePotion(p) {

	this.isUsing = false;

	this.icon = document.getElementById("swordIcon");
	this.type = "AttackPotion";

	this.isActive = false;

	this.Use = function(gameObject) {
			gameObject.playerHealth(p);
	}


	
	this.Update = function(gameObject) {

	}

	

	this.Reset = function(gameObject) {
		this.isUsing = false;
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