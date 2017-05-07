function NPC(x, y) {
    this.transform = new Transform(this);
    this.velocity = new Vector2(0, 0);
    this.type = "NPC";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.img = document.getElementById("characters");

    this.components = {};

    this.alive = true;

    this.ignoreOnLoad = false;
    this.delete = false;

    this.onCollide = function(scene, collider) {
        return true;
    }

    this.Start = function(scene) {
        this.components.messageHandler = new MessageHandler(this);
        this.components.boxCollider = new BoxCollider(16, 16, this);
        this.components.lightRenderer = new LightRenderer(this, "#111111", 32);
        this.transform = new Transform(this);
        this.transform.position.x = x;
        this.transform.position.y = y;

        this.components.messageHandler.Push("I am an NPC!");

    }

    this.Update = function(scene) {
       this.transform.Translate(this.velocity.x, this.velocity.y, scene);

    }

    this.Draw = function(scene) {
        if(this.alive)
            ctx.drawImage(this.img, 0, 64, 16, 16, Math.floor(this.transform.position.x - (this.components.boxCollider.width/2)),Math.floor(this.transform.position.y - (this.components.boxCollider.height/2)), 16, 16);
    }


}
function Skull(x, y) {
    this.transform = new Transform(this);
    this.velocity = new Vector2(0, 0);
    this.type = "Skull";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.img = document.getElementById("Skull");

    this.components = {};

    this.alive = true;

    this.ignoreOnLoad = false;
    this.delete = false;
    this.frame=0;
    this.doDamage = function() {

        this.alive = false;
        this.delete = true;
    }


    this.onCollide = function(scene, collider) {


        return true;
    }

    this.Start = function(scene) {
        this.components.boxCollider = new BoxCollider(30, 30, this);
        this.components.lightRenderer = new LightRenderer(this, "#000800", 32);

        this.transform = new Transform(this);
        this.transform.position.x = x;
        this.transform.position.y = y;
    }

    this.Update = function(scene) {

        this.transform.Translate(this.velocity.x, this.velocity.y, scene);

        if(this.transform.position.x <= Scene.player.transform.position.x) {
            this.velocity.x = scene.deltaTime * 0.05;

        } else {
            this.velocity.x = -scene.deltaTime * 0.05;

        }
        
        if(this.transform.position.y <= Scene.player.transform.position.y) {
            this.velocity.y = scene.deltaTime * 0.05;

        } else {
            this.velocity.y = -scene.deltaTime * 0.05;
        }
        this.frame+=scene.deltaTime*0.01;
        this.frame=this.frame%4;
    }

    this.Draw = function(scene) {
        if(this.alive)
            ctx.drawImage(this.img, Math.floor(this.frame)*30, 0, 30, 30, Math.floor(this.transform.position.x - (this.components.boxCollider.width/2)),Math.floor(this.transform.position.y - (this.components.boxCollider.height/2)), 30, 30);
    }


}
function Bird(x, y) {
    this.transform = new Transform(this);
    this.velocity = new Vector2(0, 0);
    this.type = "Bird";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.img = document.getElementById("Bird");
    this.flipX = false;

    this.components = {};

    this.alive = true;

    this.ignoreOnLoad = false;
    this.delete = false;
    this.frame=0;
    this.doDamage = function() {

        this.alive = false;
        this.delete = true;
    }


    this.onCollide = function(scene, collider) {


        return true;
    }

    this.Start = function(scene) {
        this.components.boxCollider = new BoxCollider(30, 80, this);
        this.components.lightRenderer = new LightRenderer(this, "#000800", 32);

        this.transform = new Transform(this);
        this.transform.position.x = x;
        this.transform.position.y = y;
    }

    this.Update = function(scene) {

        this.transform.Translate(this.velocity.x, this.velocity.y, scene);

        if(this.transform.position.x <= Scene.player.transform.position.x) {
            this.velocity.x = scene.deltaTime * 0.05;
            this.flipX = false;

        } else {
            this.velocity.x = -scene.deltaTime * 0.05;
            this.flipX = true;

        }
        
        if(this.transform.position.y <= Scene.player.transform.position.y) {
            this.velocity.y = scene.deltaTime * 0.05;

        } else {
            this.velocity.y = -scene.deltaTime * 0.05;
        }
        this.frame+=scene.deltaTime*0.01;
        this.frame=this.frame%4;
    }

    this.Draw = function(scene) {
        if(this.alive)
            ctx.drawImage(this.img, Math.floor(this.frame)*60 + (this.flipX ? 240 : 0), 0, 60, 80, Math.floor(this.transform.position.x - (this.components.boxCollider.width/2)),Math.floor(this.transform.position.y - (this.components.boxCollider.height/2)), 60, 80);
    }


}
function Slime(x, y) {
    this.transform = new Transform(this);
    this.velocity = new Vector2(0, 0);
    this.type = "Slime";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.img = document.getElementById("characters");

    this.components = {};

    this.alive = true;

    this.ignoreOnLoad = false;
    this.delete = false;

    this.doDamage = function() {

        this.alive = false;
        this.delete = true;
    }


    this.onCollide = function(scene, collider) {


        return true;
    }

    this.Start = function(scene) {
        this.components.boxCollider = new BoxCollider(16, 16, this);
        this.components.lightRenderer = new LightRenderer(this, "#000800", 32);

        this.transform = new Transform(this);
        this.transform.position.x = x;
        this.transform.position.y = y;
    }

    this.Update = function(scene) {

        this.transform.Translate(this.velocity.x, this.velocity.y, scene);

        if(this.transform.position.x <= Scene.player.transform.position.x) {
            this.velocity.x = scene.deltaTime * 0.05;

        } else {
            this.velocity.x = -scene.deltaTime * 0.05;

        }

        if(this.transform.position.y <= Scene.player.transform.position.y) {
            this.velocity.y = scene.deltaTime * 0.05;

        } else {
            this.velocity.y = -scene.deltaTime * 0.05;
        }
    }

    this.Draw = function(scene) {
        if(this.alive)
            ctx.drawImage(this.img, 0, 64, 16, 16, Math.floor(this.transform.position.x - (this.components.boxCollider.width/2)),Math.floor(this.transform.position.y - (this.components.boxCollider.height/2)), 16, 16);
    }


}
