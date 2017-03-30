


function Camera() {
	this.transform = new Transform(this);

    this.width = 320;
    this.height = 240;

	this.offset = new Vector2();

	this.offset.x = 320/2;
	this.offset.y = 240/2;

    this.scale = 2.0;

    this.vPosX = 0;
    this.vPosY = 0;

	this.Start = function(scene) {

		
	}


	this.Update = function(scene) {
        

	}

	this.Draw = function(scene) {


	}

    this.setTarget = function(transform) {

        this.offset.x = canvas.width / 2;
        this.offset.y = canvas.height / 2;


        
        this.transform.position = lerp(this.transform.position, transform.position, Scene.deltaTime*0.004);


        


    }

    this.translate = function() {



        //if((this.transform.position.x - this.offset.x) > 0 
            //&& (this.transform.position.x + this.offset.x) < (Scene.tileRenderer.map.width * Scene.tileRenderer.map.tilewidth)) {
            this.vPosX = this.transform.position.x - this.offset.x;

        //}

        //if((this.transform.position.y - this.offset.y) > 0
            //&& (this.transform.position.y + this.offset.y) < (Scene.tileRenderer.map.height * Scene.tileRenderer.map.tileheight)) {
            this.vPosY = this.transform.position.y - this.offset.y;

        //}

        ctx.translate(Math.floor(-this.vPosX), Math.floor(-this.vPosY));
    }

    this.resetTransform = function() {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
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



	this.loadMap = function(fileName) {

		this.tileRenderer.loadMap(fileName, this);
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
        this.player.Start(this);
        this.GameObjects.push(this.player);
        //run TileRenderer's Start() before pushing in other objects to prevent them from being wiped from inital loadMap call
        this.tileRenderer.Start(this);


        //Skips TileRenderer at index 0 since already done above
		//for(var i = 1; i < this.GameObjects.length; i++) {
			//this.GameObjects[i].Start(this);

		//}
	}

	this.Update = function() {
canvas.width = window.innerWidth/3;
  canvas.height = window.innerHeight/3;

  //ctx.scale(2,2);


		this.Camera.Update(this);

        //Iterate through game objects
        for(var i = 0; i < this.GameObjects.length; i++) {


            this.GameObjects[i].Update(this);

            //Iterate through components
            for(var c in this.GameObjects[i].components) {
                this.GameObjects[i].components[c].Update(this);
            }


        }


        this.deltaTime = new Date() - startTime;
        startTime = new Date();
    }

    this.Draw = function() {

        ctx.scale(1, 1);
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //ctx.clearRect(0, 0, width, height);

        //Iterate through GameObject components
        for(var i = 0; i < this.GameObjects.length; i++) {

            
            this.Camera.translate();

            for(var j = 0; j < this.GameObjects[i].components[j]; j++) {
                this.GameObjects[i].components[j].Draw(this);
            }

            this.GameObjects[i].Draw(this);

            ctx.setTransform(1, 0, 0, 1, 0, 0);

        }

        //this.tileRenderer.DrawTopLayer(this);

    }

}