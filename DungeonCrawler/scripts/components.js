function SpriteRenderer() {


    this.Start = function() {


    }

    this.Update = function() {



    }

    this.Draw = function() {


    }
}


function BoxCollider(width, height, parent) {

	this.offset = new Vector2();
	this.parent = parent;
	this.width = width;
	this.height = height;
    this.isTrigger = false; //if true collider only triggers onCollide() functions. Doesn't return
    this.ignorePlayer = false;

	this.checkCollision = function(scene, position) {
        if(!this.isTrigger) {
    		//Get tile id
    		var tileID;

    		for(var i = 0; i < scene.tileRenderer.map.layers.length; i++) {

    			if(scene.tileRenderer.map.layers[i].properties && scene.tileRenderer.map.layers[i].properties.abovePlayer == true) {
    				continue;
    			}

    			if(scene.tileRenderer.map.layers[i].type == "tilelayer") {
    				tileID = scene.tileRenderer.map.layers[i].data[Math.floor(position.x/16) + scene.tileRenderer.map.width*Math.floor((position.y - 16)/16)] - 1;

    				if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()]) {
    					if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
    						return true;
    					}
    				} 

    				tileID = scene.tileRenderer.map.layers[i].data[Math.floor((position.x + this.width)/16) + scene.tileRenderer.map.width*Math.floor((position.y - 16)/16)] - 1;

    				if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()]) {
    					if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
    						return true;
    					}
    				}

    				tileID = scene.tileRenderer.map.layers[i].data[Math.floor((position.x + this.width)/16) + scene.tileRenderer.map.width*Math.floor((position.y + this.height - 16)/16)] - 1;

    				if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()]) {
    					if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
    						return true;
    					}
    				}

    				tileID = scene.tileRenderer.map.layers[i].data[Math.floor(position.x/16) + scene.tileRenderer.map.width*Math.floor((position.y + this.height - 16)/16)] - 1;

    				if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()]) {
    					if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
    						return true;
    					}
    				}

    			}

    		}
		}

		for(var i = 0; i < scene.GameObjects.length; i++) {


			//Does the object have a box collider?
			if(scene.GameObjects[i].boxCollider) {

				if(scene.GameObjects[i].boxCollider != this) {
                    if(scene.GameObjects[i].hasOwnProperty("type") && scene.GameObjects[i].type == "Player" && this.ignorePlayer) {

                    }
                    else {
                        if (position.x < scene.GameObjects[i].transform.position.x + scene.GameObjects[i].boxCollider.width &&
                       position.x + this.width > scene.GameObjects[i].transform.position.x &&
                       position.y < scene.GameObjects[i].transform.position.y + scene.GameObjects[i].boxCollider.height &&
                       this.height + position.y > scene.GameObjects[i].transform.position.y) {
                            

                        if(this.parent.onCollide) {
                            if(this.isTrigger) {
                                this.parent.onCollide(scene, scene.GameObjects[i]);
                            }
                            else {
                            return this.parent.onCollide(scene, scene.GameObjects[i]);}

                        }

                        else return true;

                        }
                    }
					

					
				}





			}

		}

		return false;

	}
}