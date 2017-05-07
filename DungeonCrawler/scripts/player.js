var DOWN = 0;
var LEFT = 1;
var RIGHT = 2;
var UP = 3;


function Player() {
  this.transform = null;
  this.velocity = new Vector2(0,0);
  this.type = "Player";
  this.delete = false;
  //this.boxCollider = new BoxCollider(14, 14, this);

  this.health = 100;
  this.img = document.getElementById("playerSheet");
  this.button = document.getElementById("button");
  this.rect = document.getElementById("rect");
  this.coinIcon = document.getElementById("coinIcon");
  this.facing = 0; //0 - down; 1 - left; 2 - right; 3 - up
  this.frame = 0;
  this.frameOffset = 0;

  this.sourceOffsetX = 0;
  this.sourceOffsetY = 0;
  this.sourceOffsetWidth = 0;
  this.sourceOffsetHeight = 0;

  this.prevX = 0;
  this.prevY = 0;

  this.alive = true;
  this.speed = 0.1;

  this.components = {};

  this.destroyOnLoad = false;

  this.isMenu = false;
  this.coin = 0;


  this.inventory = [];
  this.maxInventorySize = 10;


  this.zButton = new InventoryItem();
  this.xButton = new IronSword();

  this.playerHealth= function(p){
    this.health+=p;
  }
  this.playerSpeed= function(p){
    this.speed=p;
  }
  
  this.menuIndex = 0;

  this.menuGoLeft = function() {

    this.menuIndex--;

    if(this.menuIndex <= 0)
      this.menuIndex = 0;


  }

  this.menuGoRight = function() {

    if(this.menuIndex < this.maxInventorySize - 1)
      this.menuIndex++;

  }

  this.menuAssignZ = function() {
    var temp = this.zButton;

    this.zButton = this.inventory[this.menuIndex];
    this.inventory[this.menuIndex] = temp;
  }

  this.menuAssignX = function() {
    var temp = this.xButton;

    this.xButton = this.inventory[this.menuIndex];
    this.inventory[this.menuIndex] = temp;
  }

  this.setPosition = function(x, y) {
    this.transform.position.x = x;
    this.transform.position.y = y;
    this.prevX = x;
    this.prevY = y;

    Scene.Camera.transform.position.x = x;
    Scene.Camera.transform.position.y = y;
  }

  this.addCoin = function(value) {
    this.coin += value;

    Scene.playSound("coinPickup");
  }

  this.onCollide = function(scene, collider) {

    return true;
  }

  //intializes the player class
  this.Start = function(scene) {
  


    this.components.boxCollider = new BoxCollider(14, 14, this);
    this.transform = new Transform(this);
    this.transform.position.x = 31*16;
    this.transform.position.y = 36*16;

    //Initialize inventory
    for(var i = 0; i < this.maxInventorySize; i++) {
      this.inventory.push(new InventoryItem());
    }
    //intitalizes the players inventory

    this.inventory[0] = new CrossBow();
    this.inventory[1]= new Shield(300,0.05);
    this.inventory[2]= new Bomb(30,30,32);
    this.inventory[3]= new HealthPotion(20);
    this.inventory[4]= new SpeedPotion(0.2);
    //this.inventory[5]= new DefensePotion();
   // this.inventory[5]= new FlameThrower();
    //this.inventory[6]= new Decoy();
  }

  this.Update = function(scene) {



    Scene.Camera.setTarget(this.transform);

        //Store previous values of X and Y (for collisions)
        this.prevX = this.transform.position.x;
        this.prevY = this.transform.position.y;

        if(this.isMenu) {



        } else {

          if(this.alive) {


            this.transform.Translate(this.velocity.x, this.velocity.y, scene);
            
            //this.velocity.x -= scene.deltaTime*0.01;
            //this.velocity.y -= scene.deltaTime*0.01;
            this.velocity.x *= 0.8;
            this.velocity.y *= 0.8;

            /*

            if(this.velocity.x <= 0) {
              this.velocity.x = 0;
            }

            if(this.velocity.y <= 0) {
              this.velocity.y = 0;
            }

            */


            if(input.arrowKeyUp || input.arrowKeyDown || input.arrowKeyLeft || input.arrowKeyRight) {

              this.frame += scene.deltaTime*0.01;
              this.frame = this.frame % 3;

            }
          //Return to standing position if idle
          else {
            this.frame = 1;
          }


          if(input.arrowKeyUp || input.arrowKeyDown) {

            var newSpeed = this.speed;

            if(input.shift) {
              newSpeed = this.speed *2;

            }


            if(input.arrowKeyUp) {

              this.velocity.y = -(scene.deltaTime * newSpeed);

                        this.facing = 3; //Up
                      }




                      if(input.arrowKeyDown) {

                        this.velocity.y = (scene.deltaTime * newSpeed);

                        this.facing = 0; //Down
                      }
                    }
                    if(input.arrowKeyLeft || input.arrowKeyRight) {

                      var newSpeed = this.speed;

                      if(input.shift) {
                        newSpeed = this.speed *2;

                      }


                      if(input.arrowKeyLeft) {
                        this.velocity.x = -(scene.deltaTime * newSpeed);
                        this.facing = 1; //Left
                      }

                      if(input.arrowKeyRight) {
                        this.velocity.x = (scene.deltaTime * newSpeed);
                        this.facing = 2; //Right
                      }
                    }



                    //Action buttons

                    if(input.z) {
                      this.zButton.Use(this);
                    } else if(input.x) {
                      this.xButton.Use(this);
                    }

                    this.zButton.Update(this);
                    this.xButton.Update(this);

                    if(!input.z) {
                      this.zButton.Reset(this);
                    }

                    if(!input.x) {
                      this.xButton.Reset(this);
                    }

                  }



                }




              }

              this.Draw = function(scene) {



                ctx.drawImage(this.img, (Math.floor(this.frame + this.frameOffset)*64) + this.sourceOffsetX, this.facing*64 + this.sourceOffsetY, 64 + this.sourceOffsetWidth, 64 + this.sourceOffsetHeight, Math.floor(this.transform.position.x - 32),Math.floor(this.transform.position.y - 32), 64 + this.sourceOffsetWidth, 64 + this.sourceOffsetHeight);
                
                //Draw rzed dot
                //ctx.fillStyle = "#FF0000";
                //ctx.fillRect(this.transform.position.x, this.transform.position.y,2,2);

                Scene.Camera.resetTransform();

                //Buttons
                //z button
                ctx.drawImage(this.button,0, 0, 22,22, canvas.width - 64,canvas.height - 32 - (this.isMenu ? 24 : 0), 22, 22);

                //z button icon
                if(this.zButton.icon)
                  ctx.drawImage(this.zButton.icon,0, 0, 16,16, canvas.width - 64 + 3,canvas.height - 32 + 3 - (this.isMenu ? 24 : 0), 16, 16);

                //x button
                ctx.drawImage(this.button,0, 0, 22,22, canvas.width - 32,canvas.height - 32 - (this.isMenu ? 24 : 0), 22, 22);

                //x button icon
                if(this.xButton.icon)
                  ctx.drawImage(this.xButton.icon,0, 0, 16,16, canvas.width - 32 + 3,canvas.height - 32 + 3 - (this.isMenu ? 24 : 0), 16, 16);

                //Draw coin counter
                ctx.font = "8px Pixel";
                 ctx.fillStyle= "#FFFFFF";
                 ctx.fillText(this.coin,20,canvas.height - 16);

                 ctx.drawImage(this.coinIcon,0, 0, 8,8, 8,canvas.height-25, 8, 8);


                //Draw inventory menu
                if(this.isMenu) {

                  //Draw black background
                  ctx.fillStyle = "#000000";

                  ctx.fillRect(0,canvas.height - 30,canvas.width,30);


                  //Draw selection rectangle
                  ctx.drawImage(this.rect,0, 0, 16,16, 8+(this.menuIndex*16),canvas.height - 22, 16, 16);

                  //Draw icons
                  for(var i = 0; i < this.inventory.length; i++) {
                    if(this.inventory && this.inventory[i].icon)
                      ctx.drawImage(this.inventory[i].icon,0, 0, 16,16, 8+(i*16),canvas.height - 22, 16, 16);
                  }




                  ctx.strokeStyle="#000000";
                }

                Scene.Camera.translate();

              }

            }