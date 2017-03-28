function IronSword() {

	this.isUsing = false;

	this.icon = document.getElementById("swordIcon");
	this.type = "IronSword";

	this.isActive = false;

	this.frame = 0;

	this.Use = function(gameObject) {

		if(!this.isUsing) {
			console.log("Using sword...");
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