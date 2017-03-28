function IronSword() {

	this.isUsing = false;

	this.icon = document.getElementById("swordIcon");
	this.type = "IronSword";

	this.isActive = false;

	this.Use = function(gameObject) {

		if(!this.isUsing) {
			console.log("Using sword...");
			gameObject.frameOffset = 2;




			this.isUsing = true;
			this.isActive = true;
		}

		


	}

	this.Update = function(gameObject) {

		if(this.isActive) {
			gameObject.frameOffset+= 0.33;

			if(gameObject.frameOffset > 5) {

				gameObject.frameOffset = 0;
				gameObject.sourceOffsetHeight = 0;
				this.isActive = false;
			}

		}


	}

	this.Reset = function(gameObject) {

		if(!this.isActive) {
			gameObject.frameOffset = 0;
			this.isActive = false;
			this.isUsing = false;
			gameObject.sourceOffsetHeight = 0;


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