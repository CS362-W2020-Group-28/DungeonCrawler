function Enemy(x, y) {
	

    this.die = function(scene, imgPosX, imgPosY) {
      this.isDead = true;
      scene.GameObjects.push(new DeadObject(this.transform.position, imgPosX, imgPosY));
    }

    this.refreshPath = function(scene) {
        this.playerPos.x = scene.player.transform.position.x+this.tO;
        this.playerPos.y = scene.player.transform.position.y+this.tO;
        this.path = createPath(this,scene.player,scene);
                
        if(this.path.length < 2) {
            this.n = 0;
        } 
        else {
            this.n = 1;
        } 
    }

    this.resetKnockBack = function() {
        this.knockBack = false;
        this.resetingKB = false;
        this.refreshPath(Scene);
    }

	this.Move = function(target,scene) {
		//Store previous values of X and Y (for collisions)
		this.prevX = this.transform.position.x;
		this.prevY = this.transform.position.y;
		if(Math.abs(this.transform.position.x - target.tile.x*16) < 1.0 && Math.abs(this.transform.position.y - target.tile.y*16) < 1.0) {
			this.transform.position.x = target.tile.x*16;
			this.transform.position.y = target.tile.y*16;

			if(Math.floor(this.playerPos.x/16) != Math.floor((scene.player.transform.position.x+this.tO)/16) || Math.floor(this.playerPos.y/16) != Math.floor((scene.player.transform.position.y+this.tO)/16)) {
				this.refreshPath(scene);
			}

			else if(this.n < this.path.length-1) {
				this.n++;
			}
			
		}
        if(!this.smoothMove) this.transform.position.x = lerp2(this.transform.position.x, target.tile.x*16, this.speed);
    	else {
            if(target.tile.x*16 - this.transform.position.x > 0) this.transform.position.x += this.speed;
            else if(target.tile.x*16 - this.transform.position.x < 0) this.transform.position.x -= this.speed;
        }
		if(this.boxCollider.checkCollision(scene, this.transform.position)) {
			this.transform.position.x = this.prevX;

		}
		if(!this.smoothMove) this.transform.position.y = lerp2(this.transform.position.y, target.tile.y*16, this.speed);
        else { 
            if(target.tile.y*16 - this.transform.position.y > 0) this.transform.position.y += this.speed;
            else if(target.tile.y*16 - this.transform.position.y < 0)this.transform.position.y -= this.speed;
        }
		if(this.boxCollider.checkCollision(scene, this.transform.position)) {
			this.transform.position.y = this.prevY;

		}
	}

    this.setFacing = function() {
        if(this.transform.position.y - this.prevY > 0) {
            this.facing = 0;
        }
        else if(this.transform.position.y - this.prevY < 0){
            this.facing = 3;
        }

        if(this.transform.position.x - this.prevX > 0) {
            this.facing = 2;
        }
        else if(this.transform.position.x - this.prevX < 0){
            this.facing = 1;
        }

    }

    this.setIdleFacing = function(scene) {
        if(Math.abs(this.transform.position.y - scene.player.transform.position.y) > Math.abs(this.transform.position.x - scene.player.transform.position.x)) {
            if(this.transform.position.y - scene.player.transform.position.y < 0) {
                this.facing = 0;
            }
            else if(this.transform.position.y - scene.player.transform.position.y > 0){
                this.facing = 3;
            }
        }
        else {
            if(this.transform.position.x - scene.player.transform.position.x < 0) {
                this.facing = 2;
            }
            else if(this.transform.position.x - scene.player.transform.position.x > 0){
                this.facing = 1;
            }
        }

        

    }

    this.getHit = function(collider) {
            if(!this.knockBack) {
                
                this.kbPos.x = this.transform.position.x - ((collider.transform.position.x - this.transform.position.x) * 2);
                this.kbPos.y = this.transform.position.y - ((collider.transform.position.y - this.transform.position.y) * 2);
                this.knockBack = true;
                this.health -= collider.damage;
              }
    }

    this.onCollide = function(scene, collider) {

    }

	

	this.Start = function(scene) {
		

	}

	this.Update = function(scene) {
        
   
    }

	this.Draw = function(scene) {

        
	}
        

}

Slime.prototype = new Enemy();
Slime.prototype.constructor = Slime;
function Slime(x,y) {

    this.type = "Enemy";
    this.transform = new Transform();
    this.layer = 1;
    
    this.transform.position.x = x;
    this.transform.position.y = y;
    this.active = false;
    this.activationRange = 7*16;

    this.isDead = false;
    this.health = 100;

    this.drawHealth = true;

    this.smoothMove = true;
    //DONT SET SPEED HIGHER THAN 1.0
    if(this.smoothMove) this.speed = 0.8;
    else this.speed = 0.1; //getRandomArbitrary(0.07, 0.1);

    this.damage = 10;
    //this.img = document.getElementById("chest");
    this.path;
    this.n = 0;
    this.playerPos = new Vector2();
    this.playerPos.x;
    this.playerPos.y;
    this.prevX = this.transform.position.x;
    this.prevY = this.transform.position.y;
    this.tO = 8;

    this.knockBack = false;
    this.resetingKB = false;
    this.kbPos = new Vector2();

    this.img = document.getElementById("characters");
    this.imgRed = document.getElementById("charactersRed");
    this.facing = 0; //0 - down; 1 - left; 2 - right; 3 - up
    this.frame = 0;

    this.drawPath = false;

    this.transform.position.x = x;
    this.transform.position.y = y;
    this.boxCollider = new BoxCollider(15, 15, this);

    this.Start = function(scene) {
        this.playerPos.x = scene.player.transform.position.x+this.tO;
        this.playerPos.y = scene.player.transform.position.y+this.tO;
        this.path = createPath(this,scene.player,scene);
    }

    this.onCollide = function(scene, collider) {
        if(collider.type == "StaticProp") {
            collider.onCollide(scene, this);
            return true;
        }
        if(collider.type == "Enemy") {
            //return true;

        }
        if(collider.type == "Attack") {
            this.getHit(collider);
        }
    }

    this.Update = function(scene) {
        if(!this.active && Math.abs(this.transform.position.x - scene.player.transform.position.x) < this.activationRange && Math.abs(this.transform.position.y - scene.player.transform.position.y) < this.activationRange && rayCast(scene,this,scene.player)) {
            this.refreshPath(scene);
            this.active = true;
        }

        if(this.transform.position.y < scene.player.transform.position.y) this.layer = 2;
        else this.layer = 0;

        // Checks if enemy is dead
        if (this.health <= 0) {
          this.die(scene,1*16,2*16);
        }
        
        if(!this.knockBack) {
            if(this.active) {
                this.frame += scene.deltaTime*0.01;
                this.frame = this.frame % 3;
                this.Move(this.path[this.n],scene);
                this.setFacing();
            }
        }
        else {

            this.prevX = this.transform.position.x;
            this.prevY = this.transform.position.y;

            this.transform.position.y = lerp2(this.transform.position.y, this.kbPos.y, 0.1);
            if(this.boxCollider.checkCollision(scene, this.transform.position)) {
                this.transform.position.y = this.prevY;
                if(!this.resetingKB) {
                    this.resetingKB = true;
                    setTimeout(this.resetKnockBack.bind(this), 300);
                }
            }
            this.transform.position.x = lerp2(this.transform.position.x, this.kbPos.x, 0.1);
            if(this.boxCollider.checkCollision(scene, this.transform.position)) {
                this.transform.position.x = this.prevX;
                if(!this.resetingKB) {
                    this.resetingKB = true;
                    setTimeout(this.resetKnockBack.bind(this), 300);
                }
            }

            if(Math.abs(this.transform.position.x - this.kbPos.x) < 1 && Math.abs(this.transform.position.y - this.kbPos.y) < 1) {
                this.knockBack = false;
                this.refreshPath(scene);
            }
        }
    }
    this.Draw = function(scene) {
        if(this.drawPath) {
            ctx.fillStyle = "white";
            for(var i = 0; i < this.path.length; i++) {
                ctx.globalAlpha = 0.2;
                ctx.fillRect(Math.floor(this.path[i].tile.x*16 - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.path[i].tile.y*16 - scene.Camera.transform.position.y + scene.Camera.offset.y),16,16);
                ctx.globalAlpha = 1.0;
                ctx.fillText(i, Math.floor(this.path[i].tile.x*16 - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.path[i].tile.y*16+8 - scene.Camera.transform.position.y + scene.Camera.offset.y));
            }
            ctx.globalAlpha = 1.0;
        }


        ctx.fillStyle = "green";
        if(this.knockBack) ctx.drawImage(this.imgRed,  (Math.floor(this.frame)*16),4*16 + this.facing*16, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
        else ctx.drawImage(this.img,  (Math.floor(this.frame)*16),4*16 + this.facing*16, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
        if(this.drawHealth && this.health < 100) {
          ctx.fillStyle = "#000";
          ctx.fillRect(Math.floor((this.transform.position.x - 1) - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y+15) - scene.Camera.transform.position.y + scene.Camera.offset.y),(112)/6,5);
          ctx.fillStyle = "red";
          ctx.fillRect(Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y+16) - scene.Camera.transform.position.y + scene.Camera.offset.y),this.health/6,2.5);
        }
    }
}

Skeleton.prototype = new Enemy();
Skeleton.prototype.constructor = Skeleton;
function Skeleton(x,y) {

    this.type = "Enemy";
    this.transform = new Transform();
    this.layer = 1;
    
    this.transform.position.x = x;
    this.transform.position.y = y;
    this.active = false;
    this.activationRange = 7*16;

    this.isDead = false;
    this.health = 100;

    this.drawHealth = true;

    this.smoothMove = true;
    //DONT SET SPEED HIGHER THAN 1.0
    if(this.smoothMove) this.speed = 0.8;
    else this.speed = 0.1; //getRandomArbitrary(0.07, 0.1);

    this.damage = 10;
    //this.img = document.getElementById("chest");
    this.path;
    this.n = 0;
    this.playerPos = new Vector2();
    this.playerPos.x;
    this.playerPos.y;
    this.prevX = this.transform.position.x;
    this.prevY = this.transform.position.y;
    this.tO = 8;

    this.knockBack = false;
    this.resetingKB = false;
    this.kbPos = new Vector2();

    this.img = document.getElementById("characters");
    this.imgRed = document.getElementById("charactersRed");
    this.facing = 0; //0 - down; 1 - left; 2 - right; 3 - up
    this.frame = 0;

    this.drawPath = false;

    this.transform.position.x = x;
    this.transform.position.y = y;
    this.boxCollider = new BoxCollider(15, 15, this);
    this.atkRange = 12*16;
    this.canAttack = true;
    this.moving = true;

    this.Start = function(scene) {
        this.playerPos.x = scene.player.transform.position.x+this.tO;
        this.playerPos.y = scene.player.transform.position.y+this.tO;
        this.path = createPath(this,scene.player,scene);
    }

    this.onCollide = function(scene, collider) {
        if(collider.type == "StaticProp") {
            collider.onCollide(scene, this);
            return true;
        }
        if(collider.type == "Enemy") {
            //return true;

        }
        if(collider.type == "Attack") {
            if(collider.parent != this) this.getHit(collider);
        }
    }

    this.resetAtk = function() {
        this.canAttack = true;
        this.refreshPath(Scene);
    }

    this.Update = function(scene) {
        if(!this.active && Math.abs(this.transform.position.x - scene.player.transform.position.x) < this.activationRange && Math.abs(this.transform.position.y - scene.player.transform.position.y) < this.activationRange && rayCast(scene,this,scene.player)) {
            this.active = true;
            
        }

        if(this.transform.position.y < scene.player.transform.position.y) this.layer = 2;
        else this.layer = 0;

        // Checks if enemy is dead
        if (this.health <= 0) {
          this.die(scene, 0, 2*16);
        }
        
        if(!this.knockBack) {
            if(this.active) {
                if(this.moving) {
                    this.frame += scene.deltaTime*0.01;
                    this.frame = this.frame % 3;
                }
                else this.frame = 1;

                if(Math.abs(this.transform.position.x - scene.player.transform.position.x) > this.atkRange || Math.abs(this.transform.position.y - scene.player.transform.position.y) > this.atkRange || !rayCast(scene,this,scene.player)) {
                    this.Move(this.path[this.n],scene);
                    this.setFacing();
                    if(!this.moving) this.moving = true;
                }
                else{
                    this.moving = false;
                    this.setIdleFacing(scene);
                } 
                
                
                if(Math.abs(this.transform.position.x - scene.player.transform.position.x) < this.atkRange && Math.abs(this.transform.position.y - scene.player.transform.position.y) < this.atkRange && rayCast(scene,this,scene.player) && this.canAttack) {
                    this.setIdleFacing(scene);
                    scene.GameObjects.push(new Arrow(this, this.facing, this.transform.position,10, scene.player));
                    this.canAttack = false;
                    setTimeout(this.resetAtk.bind(this), 2000);
                }
            }
        }
        else {

            this.prevX = this.transform.position.x;
            this.prevY = this.transform.position.y;

            this.transform.position.y = lerp2(this.transform.position.y, this.kbPos.y, 0.1);
            if(this.boxCollider.checkCollision(scene, this.transform.position)) {
                this.transform.position.y = this.prevY;
                if(!this.resetingKB) {
                    this.resetingKB = true;
                    setTimeout(this.resetKnockBack.bind(this), 300);
                }
            }
            this.transform.position.x = lerp2(this.transform.position.x, this.kbPos.x, 0.1);
            if(this.boxCollider.checkCollision(scene, this.transform.position)) {
                this.transform.position.x = this.prevX;
                if(!this.resetingKB) {
                    this.resetingKB = true;
                    setTimeout(this.resetKnockBack.bind(this), 300);
                }
            }

            if(Math.abs(this.transform.position.x - this.kbPos.x) < 1 && Math.abs(this.transform.position.y - this.kbPos.y) < 1) {
                this.knockBack = false;
                this.refreshPath(scene);
            }
        }
    }
    this.Draw = function(scene) {
        if(this.drawPath) {
            ctx.fillStyle = "white";
            for(var i = 0; i < this.path.length; i++) {
                ctx.globalAlpha = 0.2;
                ctx.fillRect(Math.floor(this.path[i].tile.x*16 - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.path[i].tile.y*16 - scene.Camera.transform.position.y + scene.Camera.offset.y),16,16);
                ctx.globalAlpha = 1.0;
                ctx.fillText(i, Math.floor(this.path[i].tile.x*16 - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.path[i].tile.y*16+8 - scene.Camera.transform.position.y + scene.Camera.offset.y));
            }
            ctx.globalAlpha = 1.0;
        }


        ctx.fillStyle = "green";
        if(this.knockBack) ctx.drawImage(this.imgRed,  (Math.floor(this.frame)*16) + 9*16, this.facing*16, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
        else ctx.drawImage(this.img,  (Math.floor(this.frame)*16) + 9*16, this.facing*16, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
        if(this.drawHealth && this.health < 100) {
          ctx.fillStyle = "#000";
          ctx.fillRect(Math.floor((this.transform.position.x - 1) - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y+15) - scene.Camera.transform.position.y + scene.Camera.offset.y),(112)/6,5);
          ctx.fillStyle = "red";
          ctx.fillRect(Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y+16) - scene.Camera.transform.position.y + scene.Camera.offset.y),this.health/6,2.5);
        }
    }
}


function Arrow(parent,dir,pos,damage,target) {
    this.transform = new Transform();
    this.parent = parent;
    this.tPos = new Vector2();
    this.tPos.x = target.transform.position.x;
    this.tPos.y = target.transform.position.y;
    this.isDead = false;
    this.type = "Attack";
    this.img = document.getElementById("arrow");
    this.boxCollider = new BoxCollider(15,15,this);
    this.boxPos = new Vector2();
    this.damage = damage;
    //this.arrowOffset = 32;
    var tileSize = 16;

    this.onCollide = function(scene, collider) {
        if(collider.type == "Enemy" && collider != parent) {
            collider.getHit(this);
            
        }
        this.isDead = true;
        
    }

    if (dir == 3) {
        this.transform.position.x = pos.x;
        this.transform.position.y = pos.y - tileSize;
        //this.tPos.y -= 32;
    }

    if (dir == 0) {
        this.transform.position.x = pos.x;
        this.transform.position.y = pos.y + tileSize;
        //this.tPos.y += 32;
    }
  
    if (dir == 1) {
        this.transform.position.x = pos.x - tileSize;
        this.transform.position.y = pos.y;
        //this.tPos.x -= 32;
    }
  
    if (dir == 2) {
        this.transform.position.x = pos.x + tileSize;
        this.transform.position.y = pos.y;
        //this.tPos.y += 32;
    }

    this.Start = function(scene) {

    }
    this.Update = function(scene) {
        this.transform.position = lerp(this.transform.position, this.tPos, 0.05);
        if(this.boxCollider.checkCollision(Scene, this.transform.position)) {
            this.isDead = true;
        }
        if(Math.abs(this.transform.position.x - this.tPos.x) < 1 && Math.abs(this.transform.position.y - this.tPos.y) < 1) {
            this.isDead = true;
        }
    }
    this.Draw = function(scene) {
        ctx.drawImage(this.img, dir*16, 0, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
    }
}

function Slash(parent,dir,pos,damage,target) {
    this.transform = new Transform();
    this.parent = parent;
    this.tPos = new Vector2();
    this.noTarget = true;
    if(typeof target != 'undefined') {
        this.tPos.x = target.transform.position.x;
        this.tPos.y = target.transform.position.y;
        this.noTarget = false;
    }
    this.isDead = false;
    this.type = "Attack";
    this.img = document.getElementById("slash");
    this.boxCollider = new BoxCollider(15,15,this);
    this.boxPos = new Vector2();
    this.damage = damage;
    //this.arrowOffset = 32;
    var tileSize = 16;

    this.onCollide = function(scene, collider) {
        if(collider instanceof Boss) {
            return false;
        }
        else if(collider.type == "Enemy") {
            collider.getHit(this);
            
        }
        this.isDead = true;
        
    }

    if (dir == 3) {
        this.transform.position.x = pos.x;
        this.transform.position.y = pos.y - tileSize;
        if(this.noTarget) {
            this.tPos.x = pos.x;
            this.tPos.y = pos.y - 8*16;
            //this.tPos.y -= 32;
        }
            
    }

    if (dir == 0) {
        this.transform.position.x = pos.x;
        this.transform.position.y = pos.y + tileSize;
        if(this.noTarget) {
            this.tPos.x = pos.x;
            this.tPos.y = pos.y + 8*16;
            //this.tPos.y += 32;
        }
    }
  
    if (dir == 1) {
        this.transform.position.x = pos.x - tileSize;
        this.transform.position.y = pos.y;
        if(this.noTarget) {
            this.tPos.x = pos.x - 8*16;
            this.tPos.y = pos.y;
            //this.tPos.x -= 32;
        }
    }
  
    if (dir == 2) {
        this.transform.position.x = pos.x + tileSize;
        this.transform.position.y = pos.y;
        if(this.noTarget) {
            this.tPos.x = pos.x + 8*16;
            this.tPos.y = pos.y;
            //this.tPos.y += 32;
        }
    }

    this.Start = function(scene) {

    }
    this.Update = function(scene) {
        this.transform.position = lerp(this.transform.position, this.tPos, 0.07);
        if(this.boxCollider.checkCollision(scene, this.transform.position)) {
            this.isDead = true;
        }
        if(Math.abs(this.transform.position.x - this.tPos.x) < 1 && Math.abs(this.transform.position.y - this.tPos.y) < 1) {
            this.isDead = true;
        }
    }
    this.Draw = function(scene) {
        ctx.drawImage(this.img, dir*16, 0, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
    }
}

Boss.prototype = new Enemy();
Boss.prototype.constructor = Boss;
function Boss(x,y) {
    
    this.type = "Enemy";
    this.transform = new Transform();
    this.layer = 1;
    
    this.transform.position.x = x;
    this.transform.position.y = y;
    this.active = false;
    this.activationRange = 7*16;

    this.isDead = false;
    this.health = 300;

    this.drawHealth = true;

    this.smoothMove = true;
    //DONT SET SPEED HIGHER THAN 1.0
    if(this.smoothMove) this.speed = 1.0;
    else this.speed = 0.1; //getRandomArbitrary(0.07, 0.1);

    this.damage = 10;
    //this.img = document.getElementById("chest");
    this.path;
    this.n = 0;
    this.playerPos = new Vector2();
    this.playerPos.x;
    this.playerPos.y;
    this.prevX = this.transform.position.x;
    this.prevY = this.transform.position.y;
    this.tO = 8;

    this.knockBack = false;
    this.resetingKB = false;
    this.kbPos = new Vector2();

    this.img = document.getElementById("characters");
    this.imgRed = document.getElementById("charactersRed");
    this.imgWep = document.getElementById("weaponboss");
    this.facing = 0; //0 - down; 1 - left; 2 - right; 3 - up
    this.frame = 0;

    this.drawPath = false;

    this.transform.position.x = x;
    this.transform.position.y = y;
    this.boxCollider = new BoxCollider(15, 15, this);

    this.atkRange = 12*16;
    this.atkSpeed = 2000; //milliseconds
    this.canAttack = true;
    this.moving = true;

    this.slash = false;
    this.atkframe = 0;

    this.phasestart = 100;
    this.phase2 = false;
    this.hcheck1 = false;
    this.hcheck2 = false;

    this.teleporting = false;
    //Boss teleporting points
    this.point1 = new Vector2();
    this.point1.x = 13*16;
    this.point1.y = 7*16; 
    this.point2 = new Vector2();
    this.point2.x = 14*16;
    this.point2.y = 18*16;
    this.reverse = false;

    this.Start = function(scene) {
        this.playerPos.x = scene.player.transform.position.x+this.tO;
        this.playerPos.y = scene.player.transform.position.y+this.tO;
        this.path = createPath(this,scene.player,scene);
    }

    this.onCollide = function(scene, collider) {
        if(collider.type == "StaticProp") {
            collider.onCollide(scene, this);
            return true;
        }
        if(collider.type == "Enemy") {
            //return true;

        }
        if(collider.type == "Attack" && !(collider instanceof Slash) && !this.teleporting) {
            this.getHit(collider);
        }
    }

    this.resetAtk = function() {
        this.canAttack = true;
        this.refreshPath(Scene);
    }

    this.teleport = function() {

        if(this.teleporting == false) {
            this.teleporting = true;
            this.frame = 0;
        }

        if(!this.reverse) {
            this.frame += 0.2;
        }
        else this.frame -= 0.2;

        if(this.frame  > 3) {
            this.frame = 3;
            this.jump();
            this.refreshPath(Scene);
            this.reverse = true;
        }
        if(this.frame < 0 && this.reverse) {
            this.frame = 0;
            this.reverse = false;
            this.teleporting = false;
        }
        
    }

    this.jump = function() {
        var x1 = Math.abs(this.transform.position.x - this.point1.x);
        var x2 = Math.abs(this.transform.position.x - this.point2.x);
        var y1 = Math.abs(this.transform.position.y - this.point1.y);
        var y2 = Math.abs(this.transform.position.y - this.point2.y);
        if((x1 + y1) > (x2 + y2)) {
            this.transform.position.x = this.point1.x;
            this.transform.position.y = this.point1.y;
        }

        else {
            this.transform.position.x = this.point2.x;
            this.transform.position.y = this.point2.y;
        }
        
    }

    this.Update = function(scene) {
        if(!this.active && Math.abs(this.transform.position.x - scene.player.transform.position.x) < this.activationRange && Math.abs(this.transform.position.y - scene.player.transform.position.y) < this.activationRange && rayCast(scene,this,scene.player)) {
            this.active = true;
            scene.drawBossHealth = true;
            scene.SpawnBarriers();
            scene.playMusic("music-boss");
        }

        if(this.transform.position.y < scene.player.transform.position.y) this.layer = 2;
        else this.layer = 0;

        if(this.health < 200) {
            if(!this.hcheck1) {
                this.hcheck1 = true;
                if(!this.teleporting) {
                   this.resetKnockBack();
                   this.teleport(); 
                } 
                this.atkSpeed = 800;
            } 
            
        } 
        if(this.health < 150) {
            if(!this.hcheck2) {
                this.hcheck2 = true;
                if(!this.teleporting) {
                    this.resetKnockBack();
                    this.teleport();
                } 
                this.atkSpeed = 600;
            } 
            
        }

        if(this.health < this.phasestart) {
                        this.phase2 = true;
                        this.phasestart = 1000;

                    }

        // Checks if enemy is dead
        if (this.health <= 0) {
          this.die(scene,2*16,3*16);
          scene.win = true;
          setTimeout(scene.resetWin.bind(this), 5000);
          setTimeout(this.resetKnockBack.bind(this), 200);
          scene.DeleteBarriers();
          scene.playMusic("music-savepoint");
        }
        
        if(!this.knockBack && !this.teleporting) {
            if(this.active) {
                if(this.phase2) {
                    if(this.atkframe == 0) scene.playSound("swingSound");
                    this.atkframe += 0.3;
                    this.facing++;
                    if(this.facing > 3) this.facing = 0;
                    if(this.atkframe > 3) {
                        this.atkframe = 0;
                        this.canAttack = true;
                        //this.slash = false;
                        //scene.GameObjects.push(new Slash(this, this.facing, this.transform.position,10, scene.player));
                        //this.canAttack = false;
                        //if(this.health < 400) this.atkSpeed = 1000;
                        //setTimeout(this.resetAtk.bind(this), this.atkSpeed);
                    }
                    this.Move(this.path[this.n],scene);
                    if(this.canAttack) {
                        scene.GameObjects.push(new Slash(this,this.facing,this.transform.position,10));
                        this.canAttack = false;
                    }
                }
                if(!this.phase2){
                    if(this.moving) {
                        this.frame += scene.deltaTime*0.01;
                        this.frame = this.frame % 3;
                    }
                    else this.frame = 1;

                    if(Math.abs(this.transform.position.x - scene.player.transform.position.x) > this.atkRange || Math.abs(this.transform.position.y - scene.player.transform.position.y) > this.atkRange || !rayCast(scene,this,scene.player)) {
                        this.Move(this.path[this.n],scene);
                        this.setFacing();
                        if(!this.moving) this.moving = true;
                    }
                    else{
                        this.moving = false;
                        this.setIdleFacing(scene);
                    } 
                    
                    
                    if(Math.abs(this.transform.position.x - scene.player.transform.position.x) < this.atkRange && Math.abs(this.transform.position.y - scene.player.transform.position.y) < this.atkRange && rayCast(scene,this,scene.player) && this.canAttack) {
                        this.setIdleFacing(scene);
                        this.slash = true;

                        
                        
                    }

                    if(this.slash) {
                        if(this.atkframe == 0) scene.playSound("swingSound");
                        this.atkframe += 0.3;
                        // Damage is now 20
                        if(this.atkframe > 3) {
                            this.slash = false;
                            scene.GameObjects.push(new Slash(this, this.facing, this.transform.position,10, scene.player));
                            this.canAttack = false;
                            setTimeout(this.resetAtk.bind(this), this.atkSpeed);
                        } 
                        
                    }
                    else this.atkframe = 0.0;

                    
                    
                }
                
            }
        }

        else if(this.teleporting) {
            this.teleport();
        }

        else if(this.knockBack) {

            this.prevX = this.transform.position.x;
            this.prevY = this.transform.position.y;

            this.transform.position.y = lerp2(this.transform.position.y, this.kbPos.y, 0.1);
            if(this.boxCollider.checkCollision(scene, this.transform.position)) {
                this.transform.position.y = this.prevY;
                if(!this.resetingKB) {
                    this.resetingKB = true;
                    setTimeout(this.resetKnockBack.bind(this), 200);
                    if(!this.phase2) setTimeout(this.teleport.bind(this), 200);
                    
                }
            }
            this.transform.position.x = lerp2(this.transform.position.x, this.kbPos.x, 0.1);
            if(this.boxCollider.checkCollision(scene, this.transform.position)) {
                this.transform.position.x = this.prevX;
                if(!this.resetingKB) {
                    this.resetingKB = true;
                    setTimeout(this.resetKnockBack.bind(this), 200);
                    if(!this.phase2) setTimeout(this.teleport.bind(this), 200);
                }
            }

            if(Math.abs(this.transform.position.x - this.kbPos.x) < 1 && Math.abs(this.transform.position.y - this.kbPos.y) < 1) {
                this.knockBack = false;
                this.refreshPath(scene);
            }
        }
    }

    this.Draw = function(scene) {
        if(this.drawPath) {
            ctx.fillStyle = "white";
            for(var i = 0; i < this.path.length; i++) {
                ctx.globalAlpha = 0.2;
                ctx.fillRect(Math.floor(this.path[i].tile.x*16 - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.path[i].tile.y*16 - scene.Camera.transform.position.y + scene.Camera.offset.y),16,16);
                ctx.globalAlpha = 1.0;
                ctx.fillText(i, Math.floor(this.path[i].tile.x*16 - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.path[i].tile.y*16+8 - scene.Camera.transform.position.y + scene.Camera.offset.y));
            }
            ctx.globalAlpha = 1.0;
        }


        ctx.fillStyle = "green";
        if(this.teleporting) {
            ctx.drawImage(this.imgWep, (Math.floor(this.frame)*16),4*16, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
        }
        else if(this.knockBack) ctx.drawImage(this.imgRed, 9*16 + (Math.floor(this.frame)*16),4*16 + this.facing*16, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
        else if(this.phase2) {
            if (this.facing == 3) {
                ctx.drawImage(this.imgWep, (Math.floor(2)*16), this.facing*16-16, 16, 32, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y-16) - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 32);
                //ctx.strokeRect(Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y-16) - scene.Camera.transform.position.y + scene.Camera.offset.y),16,16);
              }

              if (this.facing == 0) {
                ctx.drawImage(this.imgWep, (Math.floor(2)*16), this.facing*16, 16, 32, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y) - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 32);
                //ctx.strokeRect(Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y+16) - scene.Camera.transform.position.y + scene.Camera.offset.y),16,16);
              }
              
              if (this.facing == 1) {
                ctx.drawImage(this.imgWep, 3*16 + (Math.floor(2)*32), this.facing*16, 32, 16, Math.floor((this.transform.position.x-16) - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y) - scene.Camera.transform.position.y + scene.Camera.offset.y), 32, 16);
                //ctx.strokeRect(Math.floor((this.transform.position.x-16) - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y),16,16);
              }
              
              if (this.facing == 2) {
                 ctx.drawImage(this.imgWep, 3*16 + (Math.floor(2)*32), this.facing*16, 32, 16, Math.floor((this.transform.position.x) - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor((this.transform.position.y) - scene.Camera.transform.position.y + scene.Camera.offset.y), 32, 16);
                //ctx.strokeRect(Math.floor((this.transform.position.x+16) - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y),16,16);
              }
        }
        else if(this.slash) {
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
        }
        else ctx.drawImage(this.img, 9*16 + (Math.floor(this.frame)*16),4*16 + this.facing*16, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
    }

}