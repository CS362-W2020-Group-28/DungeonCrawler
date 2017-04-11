function Slime(x, y) {
    this.transform = new Transform(this);
    this.type = "Slime";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.offset = new Vector2();
    this.offset.x = 0;
    this.offset.y = -16;
    this.img = document.getElementById("characters");

    this.components = {};

    this.onCollide = function(scene, collider) {

        return true;
    }

    this.Start = function(scene) {
        this.components.boxCollider = new BoxCollider(16, 16, this);

    }

    this.Update = function(scene) {
        
    }

    this.Draw = function(scene) {
        ctx.drawImage(this.img, 0, 0, 16, 16, Math.floor(this.transform.position.x),Math.floor(this.transform.position.y), 16, 16);
    }


}