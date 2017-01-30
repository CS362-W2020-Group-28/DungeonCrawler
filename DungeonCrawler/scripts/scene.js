


function Camera() {
	this.transform = new Transform();

	this.offset = new Vector2();

	this.offset.x = 320/2;
	this.offset.y = 240/2;

	this.Start = function(scene) {

		
	}


	this.Update = function(scene) {


	}

	this.Draw = function(scene) {



	}



}




function Scene() {
    this.GameObjects = [];
    this.deltaTime = 0.0;
    this.Camera = new Camera();

    this.tileBuffer = document.createElement('canvas');
    this.tileBuffer.width = 1024;
    this.tileBuffer.height = 1024;
    this.tileContext = this.tileBuffer.getContext('2d');

    this.tileRenderer = new TileRenderer();
    this.player = new Player();
    this.pBarPos = this.player.health;
    this.layers = 2; //includes 0

    this.drawBossHealth = false;
    this.barlength = 0;
    this.barPos;
    this.win = false;

    this.barriers = [];

    this.cheat = false;

    //Barriers for boss room
    this.SpawnBarriers = function() {
        var imgBuffer = document.getElementById("barrier");
        this.barriers.push(new StaticProp(imgBuffer, 7*16, 13*16));
        this.barriers.push(new StaticProp(imgBuffer, 7*16, 14*16));
        this.barriers.push(new StaticProp(imgBuffer, 7*16, 15*16));
        this.barriers.push(new StaticProp(imgBuffer, 7*16, 16*16));
        this.barriers.push(new StaticProp(imgBuffer, 13*16, 29*16));
        this.barriers.push(new StaticProp(imgBuffer, 14*16, 29*16));
        this.barriers.push(new StaticProp(imgBuffer, 15*16, 29*16));
        this.barriers.push(new StaticProp(imgBuffer, 16*16, 29*16));
        this.barriers.push(new StaticProp(imgBuffer, 22*16, 13*16));
        this.barriers.push(new StaticProp(imgBuffer, 22*16, 14*16));
        this.barriers.push(new StaticProp(imgBuffer, 22*16, 15*16));
        this.barriers.push(new StaticProp(imgBuffer, 22*16, 16*16));

        for(var i = 0; i < this.barriers.length; i++) {
            this.GameObjects.push(this.barriers[i]);
        }
    }

    this.DeleteBarriers = function() {
        for(var i = 0; i < this.barriers.length; i++) {
            this.barriers[i].isDead = true;
        }
    }

    this.resetWin = function() {
        this.win = false;
    }

	this.loadMap = function(fileName) {

		this.tileRenderer.loadMap(fileName, this);
	}

    this.drawUI = function() {
        
        
        if(this.win) {
            ctx.globalAlpha = 1.0;
            ctx.fillStyle = "white";
            ctx.font = "30px Pixel";
            ctx.fillText("You Win!", width/5,height/2);
        }
        else if(this.player.health > 0) {
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = "#999999";
            ctx.fillRect(9,9,102,10);
            if(this.player.health > 75) ctx.fillStyle = "green";
            else if(this.player.health > 50) ctx.fillStyle = "#bcf442";
            else if(this.player.health > 25) ctx.fillStyle = "#f4f442";
            else ctx.fillStyle = "#f44242";
            ctx.globalAlpha = 1.0;
            if(this.pBarPos == this.player.health) {
                ctx.fillRect(10,10,this.player.health,8);
            }
            else if(this.pBarPos > this.player.health) {
                ctx.fillRect(10,10,this.pBarPos,8);
                this.pBarPos -= 2;
            }
            else {
                ctx.fillRect(10,10,this.pBarPos,8);
                this.pBarPos += 2;
            }
            
        }
        else {
            ctx.globalAlpha = 1.0;
            ctx.fillStyle = "white";
            ctx.font = "30px Pixel";
            ctx.fillText("Game Over", width/9,height/2);
            ctx.font = "12px Pixel";
            ctx.fillText("Hit Space to restart", width/5,height/1.5);
        }

        if(this.drawBossHealth) {
            if(this.boss.health > 0) {
                ctx.fillStyle = "red";
                ctx.font = "5px Pixel";
                ctx.fillText("Boss", 35, 215);
                if(this.barlength < 100) {
                    ctx.globalAlpha = 0.5;
                    ctx.fillStyle = "#999999";
                    ctx.fillRect(34,219,this.barlength*2.5+2,11);
                    ctx.globalAlpha = 1.0;
                    ctx.fillStyle = "red";
                    ctx.fillRect(35,220,this.barlength*2.5,9);
                    this.barlength++;
                }
                else {
                    ctx.globalAlpha = 0.5;
                    ctx.fillStyle = "#999999";
                    ctx.fillRect(34,219,100*2.5+2,11);
                    ctx.globalAlpha = 1.0;
                    ctx.fillStyle = "red";
                    if(this.barPos == this.boss.health) {
                        ctx.fillRect(35,220,this.boss.health/3*2.5,9);
                    }  
                    else {
                        ctx.fillRect(35,220,this.barPos/3*2.5,9);
                        this.barPos -= 2;
                    }

                }
            }
            
        }
    }

    this.playSound = function(soundName) {

    	var element = document.getElementById(soundName);
    	
    	element.currentTime = 0;
    	element.play();
    }

    this.playMusic = function(soundName) {

    	var element = document.getElementById("music");

    	if($("#music").attr("title") != soundName || element.currentTime == 0) {
    		$("#music").attr("title", soundName); 
    		element.pause();
			element.currentTime = 0;
    		element.src = "sounds/" + soundName + ".mp3";
    		element.play();
    	}

    }

	this.Start = function() {
        this.GameObjects.push(this.tileRenderer);
        this.player = new Player();
        this.GameObjects.push(this.player);
        //run TileRenderer's Start() before pushing in other objects to prevent them from being wiped from inital loadMap call
        this.tileRenderer.Start(this);

        //-----Add other GameObjects Here-----
        //this.boss = new Boss(9*16,5*16);
        //this.GameObjects.push(this.boss);
        //this.GameObjects.push(new Boss(9*16,5*16));

        //Skips TileRenderer at index 0 since already done above
		for(var i = 1; i < this.GameObjects.length; i++) {
			this.GameObjects[i].Start(this);

		}
	}

	this.Update = function() {
		this.Camera.Update(this);

        for(var i = 0; i < this.GameObjects.length; i++) {
          // Deletes game objcects
          if(this.GameObjects[i].isDead) this.GameObjects.splice(i,1);
           else this.GameObjects[i].Update(this);

        }

        if(!this.player.alive && input.space) {
            location.reload(false);
        }


        this.deltaTime = new Date() - startTime;
        startTime = new Date();

        if(input.arrowKeyLeft && input.arrowKeyRight) {
            if(!this.cheat) {
                this.cheat = true;
                this.loadMap("davies-1");
                this.player.transform.position.x = 14*16;
                this.player.transform.position.y = 27*16;
            }
        }

        if(!input.arrowKeyLeft && !input.arrowKeyRight && this.cheat) {
            this.cheat = false;
        }
    }

    this.Draw = function() {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);

        //Draws objects by layer. Higher layers are farther in the back and lower layers in the front. If no layer specified, draws in highest layer.
        for(var j = this.layers; j >= 0; j--) {
            for(var i = 0; i < this.GameObjects.length; i++) {
                if(this.GameObjects[i].hasOwnProperty("layer")) {
                    if(this.GameObjects[i].layer == j) {
                        this.GameObjects[i].Draw(this);
                    }
                }
                else if(j == this.layers) {this.GameObjects[i].Draw(this);}
            }
        }

        this.tileRenderer.DrawTopLayer(this);

        //Draws UI above everything else
        this.drawUI();
        
    }

}