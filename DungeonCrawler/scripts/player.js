
function Player() {
  this.transform = null;
  this.type = "Player";
  //this.boxCollider = new BoxCollider(14, 14, this);

  this.health = 100;
  this.img = document.getElementById("characters");
  this.button = document.getElementById("button");
  this.rect = document.getElementById("rect");
  this.facing = 0; //0 - down; 1 - left; 2 - right; 3 - up
  this.frame = 0;

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


  this.Start = function(scene) {

    this.components.boxCollider = new BoxCollider(14, 14, this);
    this.transform = new Transform(this);
    this.transform.position.x = 31*16;
    this.transform.position.y = 36*16;

    //Initialize inventory
    for(var i = 0; i < this.maxInventorySize; i++) {
      this.inventory.push(new InventoryItem());
    }

  }

  this.Update = function(scene) {
    scene.Camera.transform.position = lerp(scene.Camera.transform.position, this.transform.position, scene.deltaTime*0.004);

        //Store previous values of X and Y (for collisions)
        this.prevX = this.transform.position.x;
        this.prevY = this.transform.position.y;

        if(this.isMenu) {



        } else {

          if(this.alive) {

            if(input.z) {
              this.zButton.Use(this);
            } else if(input.x) {
              this.xButton.Use(this);

            }

            if(!input.z) {
              this.zButton.Reset();
            }

            if(!input.x) {
              this.xButton.Reset();
            }


            if(input.arrowKeyUp || input.arrowKeyDown || input.arrowKeyLeft || input.arrowKeyRight) {

              this.frame += scene.deltaTime*0.01;
              this.frame = this.frame % 3;

            }
          //Return to standing position if idle
          else {
            this.frame = 1;
          }


          if(input.arrowKeyUp || input.arrowKeyDown) {
            if(input.arrowKeyUp) {
              this.transform.Translate(0, -(scene.deltaTime * this.speed), scene);
                        this.facing = 3; //Up
                      }

                      if(input.arrowKeyDown) {
                        this.transform.Translate(0, (scene.deltaTime * this.speed), scene);
                        this.facing = 0; //Down
                      }
                    }
                    if(input.arrowKeyLeft || input.arrowKeyRight) {
                      if(input.arrowKeyLeft) {
                        this.transform.Translate(-(scene.deltaTime * this.speed), 0, scene);
                        this.facing = 1; //Left
                      }

                      if(input.arrowKeyRight) {
                        this.transform.Translate((scene.deltaTime * this.speed), 0, scene);
                        this.facing = 2; //Right

                      }
                    }

                  }



                }




              }

              this.Draw = function(scene) {

                ctx.drawImage(this.img, (Math.floor(this.frame)*16), this.facing*16, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
                
                //Buttons
                //z button
                ctx.drawImage(this.button,0, 0, 22,22, 260,210 - (this.isMenu ? 24 : 0), 22, 22);

                //z button icon
                if(this.zButton.icon)
                  ctx.drawImage(this.zButton.icon,0, 0, 16,16, 263,213 - (this.isMenu ? 24 : 0), 16, 16);

                //x button
                ctx.drawImage(this.button,0, 0, 22,22, 285,210  - (this.isMenu ? 24 : 0), 22, 22);

                //x button icon
                if(this.xButton.icon)
                  ctx.drawImage(this.xButton.icon,0, 0, 16,16, 288,213 - (this.isMenu ? 24 : 0), 16, 16);


                //Draw inventory menu
                if(this.isMenu) {

                  //Draw black background
                  ctx.strokeStyle="#FFFFFF";
                  ctx.fillRect(0,210,320,30);


                  //Draw selection rectangle
                  ctx.drawImage(this.rect,0, 0, 16,16, 8+(this.menuIndex*16),218, 16, 16);

                  //Draw icons
                  for(var i = 0; i < this.inventory.length; i++) {
                    if(this.inventory && this.inventory[i].icon)
                      ctx.drawImage(this.inventory[i].icon,0, 0, 16,16, 8+(i*16),218, 16, 16);
                  }




                  ctx.strokeStyle="#000000";
                }

              }

            }