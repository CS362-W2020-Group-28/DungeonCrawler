function SpriteRenderer() {


    this.Start = function() {


    }

    this.Update = function() {



    }

    this.Draw = function() {


    }
}

function Pathfinder() {

    this.easyStar = new EasyStar.js();

    this.Start = function() {

        this.easyStar.findPath(this.transform.position.x, this.transform.position.y, Scene.player.transform.position.x, Scene.player.transform.position.y, function( path ) {
            if (path === null) {
                console.log("Path was not found.");
            } else {
                console.log("Path was found. The first Point is " + path[0].x + " " + path[0].y);
            }
        });

    }

    this.Update = function(scene) {

    }

    this.Draw = function(scene) {



    }


}


function BoxCollider(width, height, parent) {


    this.type = "BoxCollider";
    this.offset = new Vector2();
    this.parent = parent;
    this.width = width;
    this.height = height;
    this.ignorePlayer = false;
    this.isTrigger = false;
    this.phase = 0;


    this.Start = function() {


    }

    this.Update = function(scene) {
    	//this.checkCollision(scene, this.parent.transform.position);

    }


    this.Draw = function(scene) {


    }

    this.checkCollision = function(scene, position) {
    		//Get tile id
    		var tileID;

    		for(var i = 0; i < scene.tileRenderer.map.layers.length; i++) {

    			if(scene.tileRenderer.map.layers[i].properties && scene.tileRenderer.map.layers[i].properties.abovePlayer == true) {
    				continue;
    			}

    			if(scene.tileRenderer.map.tilesets[0].tileproperties && scene.tileRenderer.map.layers[i].type == "tilelayer") {
                    //Top left
                    tileID = scene.tileRenderer.map.layers[i].data[Math.floor((position.x - (this.width/2))/16) + scene.tileRenderer.map.width*Math.floor((position.y - (this.height/2))/16)] - 1;

                    if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()]) {
                       if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
                          return true;
                      }
                  } 

                    //Top right
                    tileID = scene.tileRenderer.map.layers[i].data[Math.floor((position.x + (this.width/2))/16) + scene.tileRenderer.map.width*Math.floor((position.y - (this.height/2))/16)] - 1;

                    if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()]) {
                       if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
                          return true;
                      }
                  }

                    //Bottom left
                    tileID = scene.tileRenderer.map.layers[i].data[Math.floor((position.x - (this.width/2))/16) + scene.tileRenderer.map.width*Math.floor((position.y + (this.height/2))/16)] - 1;

                    if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()]) {
                       if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
                          return true;
                      }
                  }

                    //Bottom right
                    tileID = scene.tileRenderer.map.layers[i].data[Math.floor((position.x + (this.width/2))/16) + scene.tileRenderer.map.width*Math.floor((position.y + (this.height/2))/16)] - 1;

                    if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()]) {
                       if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
                          return true;
                      }
                  }

              }

          }

          var collision = false;

          for(var i = 0; i < scene.GameObjects.length; i++) {


			//Does the object have a box collider?
			if(scene.GameObjects[i].components.boxCollider) {

				if(scene.GameObjects[i].components.boxCollider != this) {

                    /*

                    if(scene.GameObjects[i].components.boxCollider && this.parent == Scene.player) {
                        continue;
                    }

                    */

                    if (position.x - (this.width/2) < scene.GameObjects[i].transform.position.x + scene.GameObjects[i].components.boxCollider.width &&
                     position.x + (this.width/2) > scene.GameObjects[i].transform.position.x &&
                     position.y - (this.height/2) < scene.GameObjects[i].transform.position.y + scene.GameObjects[i].components.boxCollider.height &&
                     (this.height/2) + position.y > scene.GameObjects[i].transform.position.y) {


                        if(scene.GameObjects[i].onCollide) {
                            if(scene.GameObjects[i].components.boxCollider.isTrigger) {
                                //console.log("Triggered!");
                                scene.GameObjects[i].onCollide(scene, this);
                            }
                            else {
                                //console.log("Collision at " + scene.GameObjects[i].type + "!");
                                scene.GameObjects[i].onCollide(scene, this);
                                collision = true;
                            }

                        }

                        //else return true;

                    }
                }
            }


        }



        return collision;

    }

}