
function Player() {
  this.transform = new Transform();
  this.type = "Player";
  this.boxCollider = new BoxCollider(14, 14, this);

  this.health = 100;
  this.img = document.getElementById("characters");
  this.facing = 0; //0 - down; 1 - left; 2 - right; 3 - up
	this.frame = 0;

	this.prevX = 0;
	this.prevY = 0;

  this.alive = true;
  this.speed = 0.1;


  this.components = [];

  this.setPosition = function(x, y) {
    this.transform.position.x = x;
    this.transform.position.y = y;
    this.prevX = x;
    this.prevY = y;

    Scene.Camera.transform.position.x = x;
    Scene.Camera.transform.position.y = y;
  }


this.Start = function(scene) {
    this.transform.position.x = 7*16;
    this.transform.position.y = 26*16;

}

this.Update = function(scene) {
        //console.log("Player position: (" + this.transform.position.x + ", " + this.transform.position.y + ")");
        //console.log("Player tile: (" + Math.floor(this.transform.position.x/16) + ", " + Math.floor(this.transform.position.y/16) + ")");

        scene.Camera.transform.position = lerp(scene.Camera.transform.position, this.transform.position, scene.deltaTime*0.004);

        //Store previous values of X and Y (for collisions)
        this.prevX = this.transform.position.x;
        this.prevY = this.transform.position.y;
        
        if(this.alive) {

          if(input.w || input.s || input.a || input.d) {

            this.frame += scene.deltaTime*0.01;
            this.frame = this.frame % 3;

          }
          //Return to standing position if idle
          else {
            this.frame = 1;
          }


          if(input.w || input.s) {
            if(input.w) {
                        this.transform.position.y -= (scene.deltaTime * this.speed);
                        this.facing = 3; //Up
                      }

                      if(input.s) {
                        this.transform.position.y += (scene.deltaTime * this.speed);
                        this.facing = 0; //Down

                      }

                      /*
                      if(this.boxCollider.checkCollision(scene, this.transform.position)) {
                       this.transform.position.y = this.prevY;
                     }*/


                   }




                   if(input.a || input.d) {
                    if(input.a) {
                      this.transform.position.x -= (scene.deltaTime * this.speed);
                        this.facing = 1; //Left

                      }

                      if(input.d) {
                        this.transform.position.x += (scene.deltaTime * this.speed);
                        this.facing = 2; //Right

                      }
                      /*
                      if(this.boxCollider.checkCollision(scene, this.transform.position)) {
                        this.transform.position.x = this.prevX;
                      } */


                    }


                /*
                //idle collision check
                if(!input.w && !input.s && !input.a && !input.d) {
                  this.boxCollider.checkCollision(scene, this.transform.position);
                }
                */

              }

            }

              this.Draw = function(scene) {
                ctx.drawImage(this.img, (Math.floor(this.frame)*16), this.facing*16, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
          }

        }