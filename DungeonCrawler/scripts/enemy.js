function Slime(x, y) {
    this.transform = new Transform();
    this.type = "StaticProp";
    this.transform.position.x = x;
    this.transform.position.y = y;

    this.offset = new Vector2();
    this.offset.x = 0;
    this.offset.y = -16;
    this.img = buffer;

    this.components = [];

    this.onCollide = function(scene, collider) {

        return true;
    }

    this.Start = function(scene) {


    }

    this.Update = function(scene) {
        
    }

    this.Draw = function(scene) {
        //ctx.drawImage(this.img, 0, 0, 16, 16, Math.floor(this.transform.position.x - scene.Camera.transform.position.x + scene.Camera.offset.x),Math.floor(this.transform.position.y - scene.Camera.transform.position.y + scene.Camera.offset.y), 16, 16);
    }


}