function Shield(p,s) {

	this.isUsing = false;

	this.icon = document.getElementById("ShieldIcon");
	this.type = "Shield";
	this.oldSpeed=null;

	this.timer = 0;
	this.Use = function(gameObject) {

			if(this.timer <= 0) {
			this.timer = 5500;
			var x = gameObject.transform.position.x;
			var y = gameObject.transform.position.y;

			Scene.addObject(new ShieldBubble(x, y, 32, 32, gameObject));

			}
			
	}


	
	this.Update = function(gameObject) {
		this.timer -= Scene.deltaTime;

		if(this.timer <= 0) {
			this.timer = 0;
		}

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

	this.icon = document.getElementById("BombIcon");
	this.type = "Bomb";
	this.isActive = false;
	this.timer=1000;
	this.max=1000;
	this.min=0;

	this.Use = function(gameObject) 
	{
		if(!this.isUsing) {
			this.isUsing = true;
			Scene.playSound("bombSet");

			var x = gameObject.transform.position.x;
			var y = gameObject.transform.position.y;



			if(gameObject.facing == UP) {
				y -= 16;
			}

			else if(gameObject.facing == DOWN) {
				y += 16;
			}

			else if(gameObject.facing == LEFT) {
				x -= 16;
			}

			else if(gameObject.facing == RIGHT) {
				x += 16;
			}

			Scene.addObject(new BombFunction(x, y, 16, 16));

		}
			

			
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

	this.icon = document.getElementById("HealthIcon");
	this.type = "HealthPotion";

	this.isActive = false;

	this.Use = function(gameObject) {
		if(!this.isUsing) {
			gameObject.playerHealth(p);
			this.isUsing=true;
			var x = gameObject.transform.position.x;
			var y = gameObject.transform.position.y;
			Scene.addObject(new HPotion(x, y, 20, 20, gameObject));
			console.log(gameObject.health);
			}
	}


	
	this.Update = function(gameObject) {

	}

	

	this.Reset = function(gameObject) {
		this.isUsing = false;
	}


}
function SpeedPotion(p) {

	this.isUsing = false;


	this.icon = document.getElementById("BootsIcon");
	this.type = "SpeedPotion";

	this.isActive = false;
	this.oldSpeed = null;


	this.Use = function(gameObject) {
			var oldSpeed = 0.1;
			if(!this.isUsing) {
			gameObject.playerSpeed(p);

			console.log("SpeedPotion");

			var x = gameObject.transform.position.x;
			var y = gameObject.transform.position.y;
			Scene.addObject(new SPotion(x, y, 20, 20, gameObject));
			

			/*setTimeout(function() {
				gameObject.speed = oldSpeed;

			}, 10000);*/
		}
	}


	
	this.Update = function(gameObject) {

	}

	

	this.Reset = function(gameObject) {
		
	}


}
function Cheat(p) {

	this.isUsing = false;

	this.icon = document.getElementById("Cheat");
	this.type = "Cheat";

	this.isActive = false;

	this.Use = function(gameObject) {
		if(!this.isUsing) {
			gameObject.playerHealth(p);
			this.isUsing=true;
			var x = gameObject.transform.position.x;
			var y = gameObject.transform.position.y;
			Scene.addObject(new HPotion(x, y, 20, 20, gameObject));
			console.log(gameObject.health);
			}
	}


	
	this.Update = function(gameObject) {

	}

	

	this.Reset = function(gameObject) {
		this.isUsing = false;
	}


}
function SpeedPotion(p) {

	this.isUsing = false;


	this.icon = document.getElementById("BootsIcon");
	this.type = "SpeedPotion";

	this.isActive = false;
	this.oldSpeed = null;


	this.Use = function(gameObject) {
			var oldSpeed = 0.1;
			if(!this.isUsing) {
			gameObject.playerSpeed(p);

			console.log("SpeedPotion");

			var x = gameObject.transform.position.x;
			var y = gameObject.transform.position.y;
			Scene.addObject(new SPotion(x, y, 20, 20, gameObject));
			

			/*setTimeout(function() {
				gameObject.speed = oldSpeed;

			}, 10000);*/
		}
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
			//console.log("defense on");


			setTimeout(function() {
				gameObject.playerHealth(-p);
				//console.log("defense off");
			}, 10000);
			
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

			
			//var x = gameObject.transform.position.x;
			//var y = gameObject.transform.position.y;
			//Scene.addObject(new ShieldBubble(x, y, 20, 20, gameObject));
			
			
			setTimeout(function() {
			

			}, 3000);
	
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

			Scene.playSound("swingSound");

			var x = gameObject.transform.position.x;
			var y = gameObject.transform.position.y;
			var width = 28;
			var height = 28;
			var v = new Vector2(0, 0);

			if(gameObject.facing == UP) {
				y -= 14;
				v.y = -5;
			}

			else if(gameObject.facing == DOWN) {
				y += 14;
				v.y = 5;
			}

			else if(gameObject.facing == LEFT) {
				x -= 14;
				v.x = -5;
			}

			else if(gameObject.facing == RIGHT) {
				x += 14;
				v.x = 5;
			}

			Scene.addObject(new SwordSlash(x, y, width, height, v));
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

function Key() {


	this.icon = document.getElementById("keyIcon");
	this.type = "Key";



	this.Use = function(gameObject) {



	}

	this.Update = function(gameObject) {



	}

	this.Reset = function() {
		
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