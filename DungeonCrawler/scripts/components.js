function SpriteRenderer() {


    this.Start = function() {


    }

    this.Update = function() {



    }

    this.Draw = function() {


    }
}
function MessageHandler() {

   this.messageQueue = [];

   this.showMessage = function(msg) {
       this.messageQueue.push(msg);

   }

   this.Update = function(scene) {
       if(this.messageQueue.length > 0) {
           var msg = this.messageQueue.pop();
           this.Draw(msg);
       }

   }

   this.Draw = function(scene) {
       ctx.font = "30px Arial";
       ctx.fillText("Hello World",10,50);   
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

            var collision = false;

    		for(var i = 0; i < scene.tileRenderer.map.layers.length; i++) {

    			if(scene.tileRenderer.map.layers[i].properties && scene.tileRenderer.map.layers[i].properties.abovePlayer == true) {
    				continue;
    			}

    			if(scene.tileRenderer.map.tilesets[0].tileproperties && scene.tileRenderer.map.layers[i].type == "tilelayer") {
                    //Top left
                    tileID = scene.tileRenderer.map.layers[i].data[Math.floor((position.x - (this.width/2))/16) + scene.tileRenderer.map.width*Math.floor((position.y - (this.height/2))/16)] - 1;

                    if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()]) {
                       if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
                          collision = true;
                      }
                  } 

                    //Top right
                    tileID = scene.tileRenderer.map.layers[i].data[Math.floor((position.x + (this.width/2))/16) + scene.tileRenderer.map.width*Math.floor((position.y - (this.height/2))/16)] - 1;

                    if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()]) {
                       if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
                          collision = true;
                      }
                  }

                    //Bottom left
                    tileID = scene.tileRenderer.map.layers[i].data[Math.floor((position.x - (this.width/2))/16) + scene.tileRenderer.map.width*Math.floor((position.y + (this.height/2))/16)] - 1;

                    if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()]) {
                       if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
                          collision = true;
                      }
                  }

                    //Bottom right
                    tileID = scene.tileRenderer.map.layers[i].data[Math.floor((position.x + (this.width/2))/16) + scene.tileRenderer.map.width*Math.floor((position.y + (this.height/2))/16)] - 1;

                    if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()]) {
                       if(scene.tileRenderer.map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
                          collision = true;
                      }
                  }

              }

          }

          

          for(var i = 0; i < scene.GameObjects.length; i++) {


			//Does the object have a box collider?
			if(scene.GameObjects[i].components.boxCollider) {

				if(scene.GameObjects[i] != this.parent) {

                    

                    

                    if (position.x - (this.width/2) < scene.GameObjects[i].transform.position.x + scene.GameObjects[i].components.boxCollider.width &&
                     position.x + (this.width/2) > scene.GameObjects[i].transform.position.x &&
                     position.y - (this.height/2) < scene.GameObjects[i].transform.position.y + scene.GameObjects[i].components.boxCollider.height &&
                     (this.height/2) + position.y > scene.GameObjects[i].transform.position.y) {


                        
                            if(scene.GameObjects[i].components.boxCollider.isTrigger) {

                                if(scene.GameObjects[i].onCollide)  {
                                    scene.GameObjects[i].onCollide(scene, this);

                                }


                            }
                            else {
                                if(scene.GameObjects[i].onCollide) {
                                    scene.GameObjects[i].onCollide(scene, this);
                                } 




                                collision = true;
                            }

                        

                        //else return true;

                    }
                }
            }


        }



        return collision;

    }

}