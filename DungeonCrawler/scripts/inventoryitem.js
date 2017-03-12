function IronSword() {

	this.isUsing = false;

	this.icon = document.getElementById("swordIcon");
	this.type = "IronSword";

	this.isActive = false;

	this.Use = function(gameObject) {

		if(!this.isUsing) {
			console.log("Using sword...");




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