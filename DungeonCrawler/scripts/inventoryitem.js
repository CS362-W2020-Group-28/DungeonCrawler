function IronSword() {

	this.isUsing = false;

	this.icon = document.getElementById("swordIcon");
	this.type = "IronSword";

	this.Use = function(gameObject) {

		if(!this.isUsing) {
			console.log("Using sword...");

			this.isUsing = true;
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

	this.Reset = function() {

	}

}