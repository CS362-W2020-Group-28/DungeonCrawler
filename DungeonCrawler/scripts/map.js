function TileRenderer() {
	this.transform = new Transform(this);

  this.map = null;
  this.mapName = null;
  this.img = document.getElementById("basicTiles");

  this.tileBuffer = document.createElement('canvas');
  this.floatBuffer = document.createElement('canvas');

  this.tileContext = this.tileBuffer.getContext('2d');
  this.floatContext = this.floatBuffer.getContext('2d');

  this.persistenceMemory = {};

  this.components = {};

  //this.ignoreOnLoad = true;

  this.fadeAlpha = 1.0;

  this.loadMap = function(filename, scene) {

    if(this.map) {
      console.log("There is map data!");



      //Get gameObjects from scene
      this.persistenceMemory[this.mapName] = [];


      for(var i = 0; i < Scene.GameObjects.length; i++) {
        if(Scene.GameObjects[i].ignoreOnLoad == false) {
          this.persistenceMemory[this.mapName].push(Scene.GameObjects[i]);
        }

      }
    }



  
    this.tileBuffer = document.createElement('canvas');
    this.floatBuffer = document.createElement('canvas');
    this.tileContext = this.tileBuffer.getContext('2d');
    this.floatContext = this.floatBuffer.getContext('2d');

    $.ajaxSetup({async: false});

    console.log("before map load");
    var mapData = {};

    $.get('/maps/' + filename + '.json', function(data) {
     mapData = data;
     console.log("during map load");
   });

    console.log("after map load");

    this.map = mapData;
    this.mapName = filename;

        //For Joey
        //if(typeof this.map.layers == 'undefined') {
          //console.log("parsing JSON");
          //this.map = JSON.parse(mapData);
        //}

        this.img = document.getElementById("basicTiles");


        this.tileBuffer.width = this.map.width * 16;
        this.tileBuffer.height = this.map.height * 16;

        this.floatBuffer.width = this.map.width * 16;
        this.floatBuffer.height = this.map.height * 16;

        for(var i = 0; i < this.map.layers.length; i++) {

          if(this.map.layers[i].type == "tilelayer") {

            for(var y = 0; y < this.map.height; y++) {

              for(var x = 0; x < this.map.width; x++) {

                var tileID = this.map.layers[i].data[x + this.map.width*y] - 1;

                var tX = tileID % 8;
                var tY = Math.floor(tileID / 8);


                if(this.map.layers[i].properties && this.map.layers[i].properties.abovePlayer == true) {

                 this.floatContext.drawImage(this.img, tX * 16, tY * 16, this.map.tilewidth, this.map.tileheight, x*16, y*16, this.map.tilewidth, this.map.tileheight);

               } else {

                 this.tileContext.drawImage(this.img, tX * 16, tY * 16, this.map.tilewidth, this.map.tileheight, x*16, y*16, this.map.tilewidth, this.map.tileheight);

               }



             }

           }


         } else if(this.map.layers[i].type == "objectgroup") {

          if(this.persistenceMemory[this.mapName] != null) {

            Scene.GameObjects = this.persistenceMemory[this.mapName];

            //scene.GameObjects.push(this); //Push this tile renderer back into the list
            scene.GameObjects.push(scene.player); //Push player back into the list



          } else {

            for(var o = 0; o < this.map.layers[i].objects.length; o++) {

            var gID = this.map.layers[i].objects[o].gid - 1;

            var tX = gID % 8;
            var tY = Math.floor(gID / 8);

            var imgBuffer = document.createElement('canvas');
            var imgCtx = imgBuffer.getContext('2d');

            imgCtx.drawImage(this.img, tX * 16, tY * 16, 16, 16, 0, 0, 16, 16);


            var prop;
            
            if(this.map.layers[i].objects[o].type == "Slime") {
              prop = new Slime(this.map.layers[i].objects[o].x, this.map.layers[i].objects[o].y);
              

            } else if(this.map.layers[i].objects[o].type == "Coin"){
              prop = new Coin(this.map.layers[i].objects[o].x, this.map.layers[i].objects[o].y);
            } else if(this.map.layers[i].objects[o].type == "NPC") {
              prop = new NPC(this.map.layers[i].objects[o].x, this.map.layers[i].objects[o].y);
            }
            else {
              prop = new StaticProp(imgBuffer, this.map.layers[i].objects[o].x, this.map.layers[i].objects[o].y);
            }
            

  
            prop.Start(scene);

            prop.components.boxCollider.width = this.map.layers[i].objects[o].width;
            prop.components.boxCollider.height = this.map.layers[i].objects[o].height;

            //prop.onCollide = new Function("scene", "collider", "return true;");

            if(this.map.layers[i].objects[o].properties) {


                                //If there is an onCollide function for this object, parse the function and override the abstract function
                                if(this.map.layers[i].objects[o].properties.onCollide) {
                                  prop.onCollide = new Function("scene", "collider", this.map.layers[i].objects[o].properties.onCollide + "return true;");
                                }

                                if(this.map.layers[i].objects[o].properties.isTrigger) {
                                  if(prop.components.boxCollider) {
                                    prop.components.boxCollider.isTrigger = this.map.layers[i].objects[o].properties.isTrigger;
                                  }
                                }


                              }

                              

                              scene.GameObjects.push(prop);
                            }



          }

          
                          }



                        }

                        if(this.map.properties) {

                         if(this.map.properties.backgroundMusic) {
                          Scene.playMusic(this.map.properties.backgroundMusic);
                        }
                      }

                      this.fadeAlpha = 1;

                    }


                    this.Start = function(scene) {

                      this.loadMap("start", scene);


                    }

                    this.Update = function(scene) {
                      this.fadeAlpha -= Scene.deltaTime*0.001;


                      if(this.fadeAlpha <= 0) {
                        this.fadeAlpha = 0;
                      }


                    }

                    this.Draw = function(scene) {
                      ctx.drawImage(this.tileBuffer, 0,0, this.map.width*this.map.tilewidth, this.map.height*this.map.tileheight);
                      //ctx.drawImage(this.tileBuffer, Scene.Camera.transform.position.x - Scene.Camera.offset.x,Scene.Camera.transform.position.y - Scene.Camera.offset.y, canvas.width, canvas.height,Scene.Camera.transform.position.x - Scene.Camera.offset.x,Scene.Camera.transform.position.y - Scene.Camera.offset.y, canvas.width, canvas.height);

                      Scene.Camera.resetTransform();

                      ctx.fillStyle = "rgba(0,0,0,"+ this.fadeAlpha.toFixed(2) +")";
                      ctx.fillRect(0, 0, canvas.width, canvas.height);

                      Scene.Camera.translate();
                    }

                    this.DrawTopLayer = function(scene) {
                     ctx.drawImage(this.floatBuffer, this.transform.position.x,this.transform.position.y, this.map.width*this.map.tilewidth, this.map.height*this.map.tileheight);
                   }

                 }