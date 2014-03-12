function Player(scene){
	Actor.call(this);
	this.prototype = new Actor();
	this.x = 600;
	this.y = 300;
	this.inventory = new Inventory();
	this.scene = scene;
	this.speed = 4;
	activePlayer = this;

	this.init = function(){
		this.sprite = new SpriteBox(scene)
		this.sprite.draw(this.x,this.y);
		activeSprites.push(this);
	}

	this.init();
}