function Shield(p,s) {

	this.isUsing = false;

	this.icon = document.getElementById("shieldIcon");
	this.type = "Shield";
	this.oldSpeed=null;
	this.Use = function(gameObject) {


			//var x = gameObject.transform.position.x;
			//var y = gameObject.transform.position.y;

			//Scene.addObject(new ShieldBubble(x, y, 20, 20, gameObject));
			var oldSpeed = 0.1;
			console.log(oldSpeed);
			var oldHealth= gameObject.health;
			gameObject.playerSpeed(s);
			gameObject.playerHealth(p);
			

			setTimeout(function() {
				console.log(oldSpeed);
				gameObject.playerSpeed(oldSpeed);
				gameObject.playerHealth(-p);
				console.log("Shield");
			}, 3000);
	
	}


	
	this.Update = function(gameObject) {

	}

	this.Reset = function(gameObject) {
		this.isUsing = false;
	}


}
function Decoy() {

	this.isUsing = false;

	this.icon = document.getElementById("shieldIcon");
	this.type = "Decoy";

	this.Use = function(gameObject) {

			/*Draw the decoy*/
			//var x = gameObject.transform.position.x;
			//var y = gameObject.transform.position.y;
			//Scene.addObject(new ShieldBubble(x, y, 20, 20, gameObject));
			
			/* Set down the decoy*/
			
			/* Take down the decoy*/
			setTimeout(function() {
			

			}, 3000);
	
	}


	
	this.Update = function(gameObject) {

	}

	this.Reset = function(gameObject) {
		this.isUsing = false;
	}


}
function FlameThrower() {

	this.isUsing = false;

	this.icon = document.getElementById("shieldIcon");
	this.type = "FlameThrower";

	this.Use = function(gameObject) {

			//Scene.addObject(new SwordSlash(gameObject.transform.position.x, gameObject.transform.position.y, 50, 50));

			setTimeout(function() {
			Scene.addObject(new SwordSlash(gameObject.transform.position.x, gameObject.transform.position.y, 50, 50));

			console.log("FlameThrower");
			}, 10000);
	
	}


	
	this.Update = function(gameObject) {

	}

	this.Reset = function(gameObject) {
		this.isUsing = false;
	}


}
function Bomb(a,b,d) {

	this.isUsing = false;

	this.icon = document.getElementById("swordIcon");
	this.type = "Bomb";
	this.isActive = false;
	this.timer=1000;
	this.max=1000;
	this.min=0;

	this.Use = function(gameObject) 
	{
			var x = gameObject.transform.position.x+d;
			var y = gameObject.transform.position.y;

			setTimeout(function() {

			console.log("bomb");
			Scene.addObject(new SwordSlash(x, y, a, b));
			}, 3000);
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

	this.icon = document.getElementById("crossbowIcon");
	this.type = "HealthPotion";

	this.isActive = false;

	this.Use = function(gameObject) {
			gameObject.playerHealth(p);
			console.log("healthPotion");
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
	this.type = "SpeedPotion";

	this.isActive = false;
	this.oldSpeed = null;


	this.Use = function(gameObject) {
			var oldSpeed = 0.1;
			gameObject.playerSpeed(p);
			console.log("SpeedPotion");
			

			setTimeout(function() {
				gameObject.speed = oldSpeed;

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
			var oldHealth = 100;
			gameObject.playerHealth(p);

			

			setTimeout(function() {
				gameObject.playerHealth(-p);

			}, 10000);
			
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