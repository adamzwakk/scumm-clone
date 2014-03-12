function Player(scene){
	this.dest = {};
	this.x;
	this.y;
	this.w = 150;
	this.h = 150;
	this.inventory = new Inventory();
	this.scene = scene;

	this.init = function(){
		this.sprite = new SpriteBox(scene);
		this.ctx = scene.spriteLayers[0].ctx;
		activeSprites.push(this);
		this.spawn(600,300);
	}

	this.spawn = function(x,y){
		this.x = x;
		this.y = y;
		this.ctx.fillRect(this.x,this.y,this.w,this.h);
	}

	this.move = function(x,y,speed){
		
		this.sprite.clear();
	}

	this.init();
}