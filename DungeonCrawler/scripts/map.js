function TileRenderer() {
	this.transform = new Transform(this);

  this.map = {};
  this.img = document.getElementById("basicTiles");

  this.tileBuffer = document.createElement('canvas');
  this.floatBuffer = document.createElement('canvas');

  this.tileContext = this.tileBuffer.getContext('2d');
  this.floatContext = this.floatBuffer.getContext('2d');

  this.components = {};

  this.destroyOnLoad = false;

  this.loadMap = function(filename, scene) {

		scene.GameObjects = []; //Clear array
		scene.GameObjects.push(this); //Push this tile renderer back into the list
		scene.GameObjects.push(scene.player); //Push player back into the list

  
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

          for(var o = 0; o < this.map.layers[i].objects.length; o++) {

            var gID = this.map.layers[i].objects[o].gid - 1;

            var tX = gID % 8;
            var tY = Math.floor(gID / 8);

            var imgBuffer = document.createElement('canvas');
            var imgCtx = imgBuffer.getContext('2d');

            imgCtx.drawImage(this.img, tX * 16, tY * 16, 16, 16, 0, 0, 16, 16);


            var prop = new StaticProp(imgBuffer, this.map.layers[i].objects[o].x, this.map.layers[i].objects[o].y);
            prop.Start(scene);
            prop.onCollide = new Function("scene", "collider", "return true;");

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

                        if(this.map.properties) {

                         if(this.map.properties.backgroundMusic) {
                          Scene.playMusic(this.map.properties.backgroundMusic);
                        }
                      }

                    }


                    this.Start = function(scene) {

                      this.loadMap("start", scene);


                    }

                    this.Update = function(scene) {



                    }

                    this.Draw = function(scene) {
                      ctx.drawImage(this.tileBuffer, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y + 16), this.map.width*this.map.tilewidth, this.map.height*this.map.tileheight);
                    }

                    this.DrawTopLayer = function(scene) {
                     ctx.drawImage(this.floatBuffer, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y + 16), this.map.width*this.map.tilewidth, this.map.height*this.map.tileheight);
                   }

                 }