function Player(scene){
	Actor.call(this);
	this.prototype = new Actor();
	this.x = scene.spawnStart.x;
	this.y = scene.spawnStart.y;
	this.inventory = new Inventory();
	this.scene = scene;
	this.speed = 4;
	activePlayer = this;

	this.init = function(){
		this.sprite = new SpriteBox(scene,scene.playerLayer,150,150,"rgb(244,244,244)");
		this.sprite.draw(this.x,this.y);
		activeSprites.push(this);
	}

	this.init();
}