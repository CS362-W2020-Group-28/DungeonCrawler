
function Player() {
  this.transform = null;
  this.type = "Player";
  //this.boxCollider = new BoxCollider(14, 14, this);

  this.health = 100;
  this.img = document.getElementById("characters");
  this.facing = 0; //0 - down; 1 - left; 2 - right; 3 - up
	this.frame = 0;

	this.prevX = 0;
	this.prevY = 0;

  this.alive = true;
  this.speed = 0.1;


  this.components = {};

  this.destroyOnLoad = false;

  this.setPosition = function(x, y) {
    this.transform.position.x = x;
    this.transform.position.y = y;
    this.prevX = x;
    this.prevY = y;

    Scene.Camera.transform.position.x = x;
    Scene.Camera.transform.position.y = y;
  }


this.Start = function(scene) {

    this.components.boxCollider = new BoxCollider(14, 14, this);
    this.transform = new Transform(this);
    this.transform.position.x = 31*16;
    this.transform.position.y = 36*16;

}

this.Update = function(scene) {
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
                        this.transform.Translate(0, -(scene.deltaTime * this.speed), scene);
                        this.facing = 3; //Up
                      }

                      if(input.s) {
                        this.transform.Translate(0, (scene.deltaTime * this.speed), scene);
                        this.facing = 0; //Down
                      }
                   }
                   if(input.a || input.d) {
                    if(input.a) {
                        this.transform.Translate(-(scene.deltaTime * this.speed), 0, scene);
                        this.facing = 1; //Left
                      }

                      if(input.d) {
                        this.transform.Translate((scene.deltaTime * this.speed), 0, scene);
                        this.facing = 2; //Right

                      }
                    }

              }

            }

              this.Draw = function(scene) {
                ctx.drawImage(this.img, (Math.floor(this.frame)*16), this.facing*16, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
          }

        }