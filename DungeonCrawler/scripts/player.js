
function Swing(parent, dir,pos,damage, tSize, ignorePlayer) {
  this.type = "Attack";
  var tileSize = tSize;
  this.parent = parent;
  this.boxCollider = new BoxCollider(16,16,this);
  this.boxCollider.isTrigger = true;
  this.boxCollider.ignorePlayer = ignorePlayer;
  this.transform = new Transform();
  this.damage = damage;

  this.onCollide = function(scene, collider) {
    if(this.parent instanceof Player) {
        if(collider.type == "Enemy") {
            collider.onCollide(scene, this);
        }
    }
    else if(collider.type == "Player") {
            collider.onCollide(scene, this);
        }
    
    /*if(collider.type == "Attack") {
        collider.onCollide(scene, this);
    }*/
  }

  if (dir == 3) {
    this.transform.position.x = pos.x;
    this.transform.position.y = pos.y - tileSize;
  }

  if (dir == 0) {
    this.transform.position.x = pos.x;
    this.transform.position.y = pos.y + tileSize;
  }
  
  if (dir == 1) {
    this.transform.position.x = pos.x - tileSize;
    this.transform.position.y = pos.y;
  }
  
  if (dir == 2) {
    this.transform.position.x = pos.x + tileSize;
    this.transform.position.y = pos.y;
  }

  /*if (dir == "up left") {
    this.boxPos.x = pos.x - tileSize;
    this.boxPos.y = pos.y - tileSize;
  }

  if (dir == "up right") {
    this.boxPos.x = pos.x + tileSize;
    this.boxPos.y = pos.y - tileSize;
  }
  
  if (dir == "down left") {
    this.boxPos.x = pos.x - tileSize;
    this.boxPos.y = pos.y + tileSize;
  }
  
  if (dir == "down right") {
    this.boxPos.x = pos.x + tileSize;
    this.boxPos.y = pos.y + tileSize;
  }*/

  this.boxCollider.checkCollision(Scene, this.transform.position);
  
}

function Player() {
	this.transform = new Transform();
	this.type = "Player";
    this.layer = 1;
	this.boxCollider = new BoxCollider(14, 14, this);
	this.transform.position.x = 7*16;
	this.transform.position.y = 13*16;

	this.speed = 0.1;

	this.health = 100;
	this.img = document.getElementById("characters");
	this.imgRed = document.getElementById("charactersRed");
	this.imgWhite = document.getElementById("charactersWhite");
    this.imgWep = document.getElementById("weapon");
    this.imgDead = document.getElementById("dead");
	this.facing = 0; //0 - down; 1 - left; 2 - right; 3 - up
	this.frame = 0;

	this.prevX = 0;
	this.prevY = 0;

	this.knockBack = false;
	this.kbPos = new Vector2();

	this.invuln = false;
	this.flash = false;
	this.flashing = false;
	this.flashSpeed = 150; //milliseconds

    this.atkframe = 0;
    this.canAttack = true;
    this.attacking = false;

    this.alive = true;
    this.checkSpace = true;

	this.setPos = function(x, y) {

    	this.transform.position.x = x;
    	this.transform.position.y = y;

    }

	this.getHit = function(collider) {
		if(!this.invuln) {
			if(!this.knockBack) {
				this.knockBack = true;
				this.health = this.health - collider.damage;
				this.kbPos.x = this.transform.position.x - ((collider.transform.position.x - this.transform.position.x) * 2);
	            this.kbPos.y = this.transform.position.y - ((collider.transform.position.y - this.transform.position.y) * 2);
			}
		}
	}

    this.die = function() {
        this.knockBack = false;
        this.invuln = false;
        this.attacking = false;
        this.alive = false;
    }

    this.resetKnockBack = function() {
        this.knockBack = false;
        this.resetingKB = false;
        this.invuln = true;
        setTimeout(this.resetInvuln.bind(this), 1000);
    }

	this.resetInvuln = function() {
		this.invuln = false;
	}

    this.resetAtk = function() {
        this.checkSpace = true;
    }

	this.setFlash = function() {
		if(this.flash) {
            this.flash = false;
        }
        else {this.flash = true;}
        if(this.invuln) setTimeout(this.setFlash.bind(this), this.flashSpeed);
        else this.flashing = false;
	}


	this.setPosition = function(x, y) {
		this.transform.position.x = x;
		this.transform.position.y = y;
		this.prevX = x;
		this.prevY = y;

		Scene.Camera.transform.position.x = x;
		Scene.Camera.transform.position.y = y;
	}


	this.onCollide = function(scene, collider) {
		if(collider.type) {
			if(collider.type == "StaticProp") {
				collider.onCollide(scene, this);
                return true;
			}
			if(collider.type == "Chest") {
				collider.isOpen = 1;
				return true;
			}
			if(collider.type == "Enemy") {
				this.getHit(collider);
			}
            if(collider.type == "Attack") {
                this.getHit(collider);
            }
		}
	}

	this.Start = function(scene) {

		
	}

	this.Update = function(scene) {
        //console.log("Player position: (" + this.transform.position.x + ", " + this.transform.position.y + ")");
        //console.log("Player tile: (" + Math.floor(this.transform.position.x/16) + ", " + Math.floor(this.transform.position.y/16) + ")");

        scene.Camera.transform.position = lerp(scene.Camera.transform.position, this.transform.position, scene.deltaTime*0.004);

        //Store previous values of X and Y (for collisions)
        this.prevX = this.transform.position.x;
        this.prevY = this.transform.position.y;

        if(this.health <= 0) {
            this.die();
        }
        
        if(this.alive) {

            //KnockBack
            if(this.knockBack) {
                this.transform.position.y = lerp2(this.transform.position.y, this.kbPos.y, this.speed);
                if(this.boxCollider.checkCollision(scene, this.transform.position)) {
                    this.transform.position.y = this.prevY;
                    if(!this.resetingKB) {
                        this.resetingKB = true;
                        setTimeout(this.resetKnockBack.bind(this), 300);
                    }
                }
                this.transform.position.x = lerp2(this.transform.position.x, this.kbPos.x, this.speed);
                if(this.boxCollider.checkCollision(scene, this.transform.position)) {
                    this.transform.position.x = this.prevX;
                    if(!this.resetingKB) {
                        this.resetingKB = true;
                        setTimeout(this.resetKnockBack.bind(this), 300);
                    }
                    
                }

                if(Math.abs(this.transform.position.x - this.kbPos.x) < 1 && Math.abs(this.transform.position.y - this.kbPos.y) < 1) {
                    this.knockBack = false;
                    this.invuln = true;
                    setTimeout(this.resetInvuln.bind(this), 1000);
                }
            }

            //Move Normaally
            else if(!this.attacking) {

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

    				
    				if(this.boxCollider.checkCollision(scene, this.transform.position)) {
    					this.transform.position.y = this.prevY;
                    }

                    /*

                    // Check collisions based on current tile (Scene.tiles[y][x])
                    if(Scene.tiles[Math.floor(this.transform.position.y/16)][Math.floor(this.transform.position.x/16)]) {
                        if(Scene.tiles[Math.floor(this.transform.position.y/16)][Math.floor(this.transform.position.x/16)] == 2) {
                        this.transform.position.y = prevY;

                        }
                    }
                    */
                    


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

                    if(this.boxCollider.checkCollision(scene, this.transform.position)) {
                        this.transform.position.x = this.prevX;
                    }

                    /*

                    // Check collisions based on current tile (Scene.tiles[y][x])
                    if(Scene.tiles[Math.floor(this.transform.position.y/16)][Math.floor(this.transform.position.x/16)]) {
                        if(Scene.tiles[Math.floor(this.transform.position.y/16)][Math.floor(this.transform.position.x/16)] == 2) {
                        this.transform.position.x = prevX;

                        }

                    }

                    */
      

                }

                //idle collision check
                if(!input.w && !input.s && !input.a && !input.d) {
                    this.boxCollider.checkCollision(scene, this.transform.position)
                }

                if(!this.attacking && !this.canAttack && !input.space) {
                    this.canAttack = true;
                }
                else if(input.space && this.canAttack && this.checkSpace) {
                    this.canAttack = false;
                    this.checkSpace = false;
                    this.atkframe = 0;
                    this.attacking = true;
                    scene.playSound("swingSound");
                }


            }
            else {
                if(this.attacking) {
                    this.atkframe += 0.3;
                    // Damage is now 20
                    if(this.atkframe > 1) {swing = new Swing(this,this.facing, this.transform.position, 20, 11,true);}
                    if(this.atkframe > 3) {
                        this.attacking = false;
                        setTimeout(this.resetAtk.bind(this), 200)
                    } 
                }
            }
        }


    }

	this.Draw = function(scene) {
         ctx.fillStyle = "#000000";
         //ctx.fillRect(Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y),16,16);

         if(!this.alive) {
            ctx.drawImage(this.imgDead, 0, 0, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
         }

         //Draw KnockBack Sprite
         else if(this.knockBack) {
            ctx.drawImage(this.imgRed, (Math.floor(this.frame)*16), this.facing*16, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
         }

         //Draw invulnverable sprite 
         else if(this.invuln) {
            if(!this.flashing) {
                this.flashing = true;
                this.flash = true;
                setTimeout(this.setFlash.bind(this), this.flashSpeed);
             }

             if(this.flash) {
                ctx.drawImage(this.imgWhite,  (Math.floor(this.frame)*16), this.facing*16, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
             }
             else ctx.drawImage(this.img,  (Math.floor(this.frame)*16), this.facing*16, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
         }

         //Draw Normally
         else {
            ctx.drawImage(this.img, (Math.floor(this.frame)*16), this.facing*16, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
         } 

        if(this.attacking) {
            ctx.strokeStyle = "red"

            if (this.facing == 3) {
                ctx.drawImage(this.imgWep, (Math.floor(this.atkframe)*16), this.facing*16-16, 16, 32, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y-16) - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 32);
                //ctx.strokeRect(Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y-16) - scene.Camera.transform.position.y + scene.Camera.offset.y),16,16);
              }

              if (this.facing == 0) {
                ctx.drawImage(this.imgWep, (Math.floor(this.atkframe)*16), this.facing*16, 16, 32, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y) - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 32);
                //ctx.strokeRect(Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y+16) - scene.Camera.transform.position.y + scene.Camera.offset.y),16,16);
              }
              
              if (this.facing == 1) {
                ctx.drawImage(this.imgWep, 3*16 + (Math.floor(this.atkframe)*32), this.facing*16, 32, 16, Math.floor((this.transform.position.x-16) - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y) - scene.Camera.transform.position.y + scene.Camera.offset.y), 32, 16);
                //ctx.strokeRect(Math.floor((this.transform.position.x-16) - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y),16,16);
              }
              
              if (this.facing == 2) {
                 ctx.drawImage(this.imgWep, 3*16 + (Math.floor(this.atkframe)*32), this.facing*16, 32, 16, Math.floor((this.transform.position.x) - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y) - scene.Camera.transform.position.y + scene.Camera.offset.y), 32, 16);
                //ctx.strokeRect(Math.floor((this.transform.position.x+16) - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y),16,16);
              }


              /*// 4 corner directional cases
              if (this.dir == "up left") {
                ctx.strokeRect(Math.floor((this.transform.position.x-16) - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y-16) - scene.Camera.transform.position.y + scene.Camera.offset.y),16,16);
              }

              if (this.dir == "up right") {
                ctx.strokeRect(Math.floor((this.transform.position.x+16) - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y-16) - scene.Camera.transform.position.y + scene.Camera.offset.y),16,16);
              }
              
              if (this.dir == "down left") {
                ctx.strokeRect(Math.floor((this.transform.position.x-16) - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y+16) - scene.Camera.transform.position.y + scene.Camera.offset.y),16,16);
              }
              
              if (this.dir == "down right") {
                ctx.strokeRect(Math.floor((this.transform.position.x+16) - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y+16) - scene.Camera.transform.position.y + scene.Camera.offset.y),16,16);
              }*/
        }

        
	}

}