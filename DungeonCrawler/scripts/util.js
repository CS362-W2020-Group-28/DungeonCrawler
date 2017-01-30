
function mainLoop() {

    Scene.Update();
    if(draw) Scene.Draw();

    requestAnimationFrame(mainLoop);

}

var input = {
        w: false,
        s: false,
        a: false,
        d: false,
    // New key implementations for attacking
    space: false,
    arrowKeyUp: false,
    arrowKeyDown: false,
    arrowKeyLeft: false,
    arrowKeyRight: false
}


var width = 320;
var height = 240;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var Scene;
var startTime = new Date();
var endTime = new Date();
var draw = true;

var tileImage;

var draw = true;


document.addEventListener('keydown',doKeyDown,false);
document.addEventListener('keyup',doKeyRelease,false);

function doKeyDown(e) {

            var code = e.keyCode;

            if (code == 87) { // w
                input.w = true;
            } else if(code == 83) { // s
                input.s = true;
            } else if(code == 65) { // a
                input.a = true;
            } else if(code == 68) { // d
                input.d = true;
            }
      else if(code == 32) { // spacebar
          input.space = true;
      }
      else if(code == 37) { // arrowKeyLeft
          input.arrowKeyLeft = true;
      }
      else if(code == 38) { // arrowKeyUp
          input.arrowKeyUp = true;
      }
      else if(code == 39) { // arrowKeyRight
          input.arrowKeyRight = true;
      }
      else if(code == 40) { // arrowKeyDown
          input.arrowKeyDown = true;
      }
    }

    function doKeyRelease(e) {

        var code = e.keyCode;

            if (code == 87) { // w
                input.w = false;
            } else if(code == 83) { // s
                input.s = false;
            } else if(code == 65) { // a
                input.a = false;
            } else if(code == 68) { // d
                input.d = false;
            } else if(code == 32) { // spacebar
                input.space = false;
      }
      else if(code == 37) { // arrowKeyLeft
          input.arrowKeyLeft = false;
      }
      else if(code == 38) { // arrowKeyUp
          input.arrowKeyUp = false;
      }
      else if(code == 39) { // arrowKeyRight
          input.arrowKeyRight = false;
      }
      else if(code == 40) { // arrowKeyDown
          input.arrowKeyDown = false;
      }
    }


    function lerp2(a,b,t) {

        //x axis
        var x = a + t * (b - a);

        return x;
    }

    //a and b are Vector2 objects
    function lerp(a,b,t) {

        //x axis
        var x = a.x + t * (b.x - a.x);

        //y axis
        var y = a.y + t * (b.y - a.y);

        var ret = new Vector2();
        ret.x = x;
        ret.y = y;

        return ret;

    }


    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

//X & Y coordinates
function Vector2() {
	this.x = 0.0;
	this.y = 0.0;
}

function Transform() {
	this.position = new Vector2();
	this.rotation = new Vector2();
	this.scale = new Vector2();
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








		/*

		if(Scene.tiles[Math.floor((position.y)/16)][Math.floor((position.x)/16)]) {
				if(Scene.tiles[Math.floor((position.y)/16)][Math.floor((position.x)/16)] == 2) {
					return true;

				}
		}

		if(Scene.tiles[Math.floor((position.y + this.height)/16)][Math.floor((position.x)/16)]) {
				if(Scene.tiles[Math.floor((position.y + this.height)/16)][Math.floor((position.x)/16)] == 2) {
					return true;

				}
		}

		if(Scene.tiles[Math.floor((position.y)/16)][Math.floor((position.x + this.width)/16)]) {
				if(Scene.tiles[Math.floor((position.y)/16)][Math.floor((position.x + this.width)/16)] == 2) {
					return true;

				}
		}

		if(Scene.tiles[Math.floor((position.y + this.height)/16)][Math.floor((position.x + this.width)/16)]) {
				if(Scene.tiles[Math.floor((position.y + this.height)/16)][Math.floor((position.x + this.width)/16)] == 2) {
					return true;

				}
		}

		*/


		//To-do: check for other box colliders

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

                        /*if(scene.GameObjects[i].onCollide) {

                            scene.GameObjects[i].onCollide();

                        }*/

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

//These objects will be used later on.
function GameObject() {
    this.transform = new Transform();

    this.Start = function(scene) {

        
    }

    this.Update = function(scene) {



    }

    this.Draw = function(scene) {


    }

}

function Key() {
    this.type = "Key";

}

function DeadObject(pos,imgPosX,imgPosY) {
    this.transform = new Transform();
    this.transform.position.x = pos.x;
    this.transform.position.y = pos.y;
    this.img = document.getElementById("dead");
    this.Start = function(scene) {

    }
    this.Update = function(scene) {

    }
    this.Draw = function(scene) {
        ctx.drawImage(this.img, imgPosX, imgPosY, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
    }
}

function StaticProp(buffer, x, y) {
    this.transform = new Transform();
    this.type = "StaticProp";
    this.boxCollider = new BoxCollider(16, 16, this);
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.offset = new Vector2();
    this.offset.x = 0;
    this.offset.y = -16;
    this.img = buffer;

    this.onCollide = function(scene, collider) {

        return true;
    }

    this.Start = function(scene) {


    }

    this.Update = function(scene) {


    }

    this.Draw = function(scene) {
        ctx.drawImage(this.img, 0, 0, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);


    }


}

function Chest(x, y) {
    this.type = "Chest";
    this.transform = new Transform();
    this.boxCollider = new BoxCollider(16, 16, this);
    this.transform.position.x = x;
    this.transform.position.y = y;
    this.img = document.getElementById("chest");

    this.Inventory = [];

    this.isOpen = 0;

    this.onCollide = function(scene, collider) {
        //this.isOpen = 1;

    }

    this.Start = function(scene) {


    }

    this.Update = function(scene) {


    }

    this.Draw = function(scene) {


        /*
        ctx.fillRect(Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x - (16/2)),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y - (16/2)),16,16);
        */


        ctx.drawImage(this.img, this.isOpen * 16, 0, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);


    }


}

function Door(x, y) {
    this.type = "Door";

}


function Tile(x, y, cost) {
    this.getTile = function(n) {
        return Math.floor(n/16);
    }
    this.getCost = function(s, end, mcost) {
        this.g = this.parent.g + mcost;
        this.h = Math.abs(end.tile.x - this.tile.x) + Math.abs(end.tile.y - this.tile.y)
        return this.g + this.h;
    }

    this.tile = new Vector2();
    this.tile.x = this.getTile(x);
    this.tile.y = this.getTile(y);
    this.parent;
    this.g = 0;
    this.h = 0;
    this.cost = cost;
}

function inList(t, cl) {
    for(var i = 0; i < cl.length; i++) {
        if(t.tile.x == cl[i].tile.x && t.tile.y == cl[i].tile.y) return true;
    }
    return false;
}

function findObjects(scene, type) {
    var objList = [];

    for (var i = 0; i < scene.GameObjects.length; i++) {
        if(Array.isArray(type)) {
            for(var j = 0; j < type.length; j++) {
                if(scene.GameObjects[i].type == type[j]) {
                    objList.push(new Tile(scene.GameObjects[i].transform.position.x, scene.GameObjects[i].transform.position.y, 0));
                }
            }
        }
        else {
            if(scene.GameObjects[i].type == type) {
            objList.push(new Tile(scene.GameObjects[i].transform.position.x, scene.GameObjects[i].transform.position.y, 0));
        }
        }
        
    }

    return objList;
}

function createPath(a , b, scene) {
    var tO = 8;
    var map = new Array();
    map = scene.tileRenderer.map;
    var openList = new Array();
    var closedList = new Array();
    var start = new Tile(a.transform.position.x,a.transform.position.y, 0);
    var curr = start;
    var target = new Tile(b.transform.position.x+tO, b.transform.position.y+tO);
    var tempTile = new Tile(0,0,0);
    var objList = findObjects(scene, ["Chest", "Enemy"]);

    this.checkTile = function(x,y) {
        var tileID = map.layers[0].data[x + map.width*(y-1)]-1;
        if(!map.tilesets[0].tileproperties[tileID.toString()] || !map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
            if(map.layers[1].data[x + map.width*(y-1)]-1) tileID = map.layers[1].data[x + map.width*(y-1)]-1;
            if (!map.tilesets[0].tileproperties[tileID.toString()] || !map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
                return false;
            }
            
        }
        return true;
    }


    this.addAdjTile = function(x,y,mcost) {
        var tileID = map.layers[0].data[x + map.width*(y-1)]-1;
        if(!map.tilesets[0].tileproperties[tileID.toString()] || !map.tilesets[0].tileproperties[tileID.toString()].isSolid) {
            tempTile = new Tile(0,0,0);
            tempTile.tile.x = x;
            tempTile.tile.y = y;
            tempTile.parent = curr;
            tempTile.cost = tempTile.getCost(start,target,mcost);
            if(map.layers[1].data[x + map.width*(y-1)]-1) tileID = map.layers[1].data[x + map.width*(y-1)]-1;
            if(!inList(tempTile, closedList) && (!map.tilesets[0].tileproperties[tileID.toString()] || !map.tilesets[0].tileproperties[tileID.toString()].isSolid)) {
                if(inList(tempTile, openList)) {
                    /*var i = 0;
                    for(i = 0; i < openList.length-1;i++) {
                        if(tempTile.tile.x == openList[i].tile.x && tempTile.tile.y == openList[i].tile.y) {

                        }
                    }*/
                }
                else {
                    openList.push(tempTile);
                } 
                
            } 
        }
    }

    do {
    //for(var ind = 0; ind < 7; ind++) {
        closedList.push(curr);
        //left tile
        this.addAdjTile(curr.tile.x-1,curr.tile.y,10);
        //right tile
        this.addAdjTile(curr.tile.x+1,curr.tile.y,10);
        //top tile
        this.addAdjTile(curr.tile.x,curr.tile.y-1,10);
        //bottom tile
        this.addAdjTile(curr.tile.x,curr.tile.y+1,10);
        //Top left
        if(!this.checkTile(curr.tile.x-1,curr.tile.y) && !this.checkTile(curr.tile.x,curr.tile.y-1))
            this.addAdjTile(curr.tile.x-1,curr.tile.y-1,14);
        //Top right
        if(!this.checkTile(curr.tile.x+1,curr.tile.y) && !this.checkTile(curr.tile.x,curr.tile.y-1))
            this.addAdjTile(curr.tile.x+1,curr.tile.y-1,14);
        //Bot left
        if(!this.checkTile(curr.tile.x-1,curr.tile.y) && !this.checkTile(curr.tile.x,curr.tile.y+1))
            this.addAdjTile(curr.tile.x-1,curr.tile.y+1,14);
        //Bot right
        if(!this.checkTile(curr.tile.x+1,curr.tile.y) && !this.checkTile(curr.tile.x,curr.tile.y+1))
            this.addAdjTile(curr.tile.x+1,curr.tile.y+1,14);
        tempTile = new Tile(0,0,0);
        var index = openList.length-1;
        tempTile = openList[index];
        for(var i = openList.length-1; i >= 0; i--) {
            if(openList[i].tile.x == target.tile.x && openList[i].tile.y == target.tile.y) {
                tempTile = openList[i];
                index = i;
                break;
            }
            else if(tempTile.cost > openList[i].cost) {
                tempTile = openList[i];
                index = i;
            }
        }
        openList.splice(index,1);
        curr = new Tile(0,0,0);
        curr = tempTile;
    } while((closedList[closedList.length-1].tile.x != target.tile.x || closedList[closedList.length-1].tile.y != target.tile.y) && curr != null);

    var list = new Array();
    var c = new Tile();
    var c = closedList[closedList.length-1];
    while (c != null) {
        list.push(c);
        c = new Tile();
        c = list[list.length-1].parent;
    }
    //list.reverse();
    var path = new Array();
    for(var i = list.length-1; i >= 0; i--) {
        path.push(list[i]);
        if(i > 0 && list[i].tile.x != list[i-1].tile.x && list[i].tile.y != list[i-1].tile.y) {
            //right side
            if(list[i-1].tile.x - list[i].tile.x > 0) {
                //right down
                if(list[i-1].tile.y - list[i].tile.y >= 0) {
                    if(this.checkTile(list[i].tile.x+1,list[i].tile.y)) {
                        path.push(new Tile((list[i].tile.x)*16, (list[i].tile.y+1)*16, 0));
                    }
                    else if(this.checkTile(list[i].tile.x,list[i].tile.y+1)) {
                        path.push(new Tile((list[i].tile.x+1)*16, (list[i].tile.y)*16, 0));
                    }
                }
                //right up
                else {
                    if(this.checkTile(list[i].tile.x+1,list[i].tile.y)) {
                        path.push(new Tile((list[i].tile.x)*16, (list[i].tile.y-1)*16, 0));
                    }
                    else if(this.checkTile(list[i].tile.x,list[i].tile.y-1)) {
                        path.push(new Tile((list[i].tile.x+1)*16, (list[i].tile.y)*16, 0));
                    }
                }
            }
            //left side
            else {
                //left down
                if(list[i-1].tile.y - list[i].tile.y > 0) {
                    if(this.checkTile(list[i].tile.x-1,list[i].tile.y)) {
                        path.push(new Tile((list[i].tile.x)*16, (list[i].tile.y+1)*16, 0));
                    }
                    else if(this.checkTile(list[i].tile.x,list[i].tile.y+1)) {
                        path.push(new Tile((list[i].tile.x-1)*16, (list[i].tile.y)*16, 0));
                    }
                }
                //left up
                else {
                    if(this.checkTile(list[i].tile.x-1,list[i].tile.y)) {
                        path.push(new Tile((list[i].tile.x)*16, (list[i].tile.y-1)*16, 0));
                    }
                    else if(this.checkTile(list[i].tile.x,list[i].tile.y-1)) {
                        path.push(new Tile((list[i].tile.x-1)*16, (list[i].tile.y)*16, 0));
                    }
                }
            }
        }
    }

    return path;
}

function rayCast(scene, a, b) {
    this.transform = new Transform();
    this.transform.position.x = a.transform.position.x;
    this.transform.position.y = a.transform.position.y;
    this.target = new Transform();
    this.target.position.x = b.transform.position.x;
    this.target.position.y = b.transform.position.y;
    this.boxCollider = new BoxCollider(16,16,this);
    this.hit = false;
    this.clear = false;

    this.onCollide = function(scene, collider) {
        if(collider == b) {
            this.clear = true;
        }
        if(collider.type == "Enemy" || collider.type == "Attack") return false;
        else if(collider != a) {
            return true;
        }
        
        
    }
    while(Math.abs(this.transform.position.x - (this.target.position.x)) >= 1 || Math.abs(this.transform.position.y - (this.target.position.y)) >= 1) {
        ctx.fillRect(Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x - (1/2)),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y - (1/2)),1,1);
        this.transform.position = lerp(this.transform.position, this.target.position,0.1);
        if(this.boxCollider.checkCollision(scene, this.transform.position)) {
            if(this.clear) return true;
            break;
        }


    }
    return false;

}