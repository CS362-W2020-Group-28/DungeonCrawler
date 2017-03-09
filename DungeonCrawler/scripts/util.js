
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

        if(this.collider) {
            if(this.collider.checkCollision(scene, this.position)) {
                this.position.x = this.prevPosition.x;
            }

        }

        this.position.y += y;

        if(this.collider) {
            if(this.collider.checkCollision(scene, this.position)) {
                this.position.y = this.prevPosition.y;
            }

        }



    }
}




//These objects will be used later on.
function GameObject() {
    this.transform = new Transform();
    this.components = [];


    this.Start = function(scene) {


    }

    this.Update = function(scene) {



    }

}

function StaticProp(buffer, x, y) {
    this.transform = new Transform(this);
    this.type = "StaticProp";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.offset = new Vector2();
    this.offset.x = 16;
    this.offset.y = -16;
    this.img = buffer;

    this.components = {}; //making this a hash table (so we don't have to do searches)

    this.onCollide = function(scene, collider) {

        return true;
    }

    this.Start = function(scene) {
      this.components.boxCollider = new BoxCollider(16, 16, this);

    }

    this.Update = function(scene) {
      

    }

    this.Draw = function(scene) {
        ctx.drawImage(this.img, 0, 0, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
    }


}

