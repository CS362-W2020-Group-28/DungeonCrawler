
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
    arrowKeyRight: false,
    enter: false,
    z: false,
    x: false,
    shift: false
}


function normalize(val, max, min) 
{ return (val - min) / (max - min); }


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
        else if(code == 16) {
          input.shift = true;
        } //shift
      else if(code == 32) { // spacebar
          input.space = true;
      }
      else if(code == 37) { // arrowKeyLeft
        if(Scene.player.isMenu) {
          Scene.player.menuGoLeft();
        } else {
          input.arrowKeyLeft = true;

        }
      }
      else if(code == 38) { // arrowKeyUp
          input.arrowKeyUp = true;
      }
      else if(code == 39) { // arrowKeyRight
        if(Scene.player.isMenu) {
          Scene.player.menuGoRight();
        } else {
          input.arrowKeyRight = true;

        }

      }
      else if(code == 40) { // arrowKeyDown
          input.arrowKeyDown = true;
      } else if(code == 13) { //Enter
          Scene.player.isMenu = !Scene.player.isMenu;
      } else if(code == 90) { //Z
        if(Scene.player.isMenu) {
          Scene.player.menuAssignZ();
        } else {
          input.z = true;

        }


      } else if(code == 88) { //X
        if(Scene.player.isMenu) {
          Scene.player.menuAssignX();
        } else {
          input.x = true;

        }
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
    } else if(code == 16) {
          input.shift = false;
        } //shift

    else if(code == 32) { // spacebar
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
      } else if(code == 90) { //Z
        input.z = false;

      } else if(code == 88) { //X
        input.x = false;
      }
}


//Linear interpolation
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

  this.add = function(operand) {
    this.x += operand.x;
    this.y += operand.y;

    return this;
  }
}

function Transform(GameObject) {
	this.position = new Vector2();
    this.prevPosition = new Vector2();
    this.rotation = new Vector2();
    this.scale = new Vector2();
    this.gameObject = GameObject;
    this.collider = null;

    //Check if collider exists for gameobject

    if(this.gameObject.components && this.gameObject.components.boxCollider) {
        this.collider = this.gameObject.components.boxCollider;
    }

    this.Translate = function(x, y, scene) {

        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;

        
        

        this.position.x += x;
        

        // X-Axis collision check
        if(this.collider) {
            if(this.collider.checkCollision(scene, this.position)) {
                //this.position.x = this.prevPosition.x;
                //this.gameObject.velocity.x = 0;
                this.position.x = this.prevPosition.x;


            }
        }
        
        
        this.position.y += y;      

        // Y-Axis collision check
        if(this.collider) {
            if(this.collider.checkCollision(scene, this.position)) {
                //this.position.y = this.prevPosition.y;
                //this.gameObject.velocity.y = 0;

                this.position.y = this.prevPosition.y;
            }
        }

        

        if(this.collider.collision != null) {
              this.collider.collision.parent.onCollide(scene, this.collider);
        }

        this.collider.collision = null;
        
    }


    this.doCollisionCheck = function(scene) {

      


    }
}




//These objects will be used later on.
function GameObject() {
    this.transform = new Transform();
    this.components = [];


    this.delete = false;
    this.ignoreOnLoad = false;


    this.Start = function(scene) {


    }

    this.Update = function(scene) {



    }

}


function Light(x, y, radius, color) {

  this.transform = new Transform(this);
  this.type = "Light";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.components = {};

    this.ignoreOnLoad = false;
    this.delete = false;



    this.onCollide = function(scene, collider) {  

      

      return true;
    }

  this.Start = function(scene) {


    this.components.lightRenderer = new LightRenderer(this, color, radius);
    this.transform = new Transform(this);
        this.transform.position.x = x;
        this.transform.position.y = y;

  }

  this.Update = function(scene) {



  }

  this.Draw = function(scene) {

  }

}

function StaticProp(buffer, x, y, width, height) {
    this.transform = new Transform(this);
    this.transform.position.x = x;
    this.transform.position.y = y;
    this.velocity = new Vector2(0, 0);
    this.type = "StaticProp";


    this.offset = new Vector2();
    this.offset.x = 16;
    this.offset.y = -16;
    this.img = buffer;

    this.components = {}; //making this a hash table (so we don't have to do searches)

    this.ignoreOnLoad = false;
    this.delete = false;

    this.onCollide = function(scene, collider) {
        return true;
    }

    this.Start = function(scene) {
      this.components.boxCollider = new BoxCollider(16, 16, this);
      this.transform = new Transform(this);

      this.transform.position.x = x;
      this.transform.position.y = y;

    }

    this.Update = function(scene) {
      this.transform.Translate(0, 0, scene);

    }

    this.Draw = function(scene) {
        ctx.drawImage(this.img, 0, 0, 16, 16, Math.floor(this.transform.position.x - (this.components.boxCollider.width/2)),Math.floor(this.transform.position.y - (this.components.boxCollider.height/2)), 16, 16);
    }


}

