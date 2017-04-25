function Slime(x, y) {
    this.transform = new Transform(this);
    this.type = "Slime";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.img = document.getElementById("characters");

    this.components = {};

    this.alive = true;

    this.isDeleted = false;

    this.doDamage = function() {

        this.alive = false;
    }


    this.onCollide = function(scene, collider) {

        alert("slime!");

        if(collider.parent.type == "SwordSlash") {
            this.alive = false;
        }

        return true;
    }

    this.Start = function(scene) {
        this.components.boxCollider = new BoxCollider(16, 16, this);
        this.transform = new Transform(this);
        this.transform.position.x = x;
        this.transform.position.y = y;

    }

    this.Update = function(scene) {

        this.transform.Translate(0, 0, scene);

        if(this.transform.position.x <= Scene.player.transform.position.x) {
            this.transform.Translate(scene.deltaTime * 0.05, 0, scene);

        } else {
            this.transform.Translate(-scene.deltaTime * 0.05, 0, scene);

        }
        
        if(this.transform.position.y <= Scene.player.transform.position.y) {
            this.transform.Translate(0, scene.deltaTime * 0.05, scene);

        } else {
            this.transform.Translate(0, -scene.deltaTime * 0.05, scene);

        }


    }

    this.Draw = function(scene) {
        if(this.alive)
            ctx.drawImage(this.img, 0, 64, 16, 16, Math.floor(this.transform.position.x - (this.components.boxCollider.width/2)),Math.floor(this.transform.position.y - (this.components.boxCollider.height/2)), 16, 16);
    }


}

module.export= Slime;
