function Player(scene){
	this.dest = {};
	this.x = 600;
	this.y = 300;
	this.destX;
	this.destY;
	this.inventory = new Inventory();
	this.scene = scene;
	this.speed = 4;
	activePlayer = this;

	this.init = function(){
		this.sprite = new SpriteBox(scene)
		this.sprite.draw(this.x,this.y);
		activeSprites.push(this);
	}

	this.move = function(dt){
		if(typeof this.destX != 'undefined' && this.destX != this.x){
			var src = {x:this.x,y:this.y};
			var dest = {x:this.destX,y:this.destY};
			console.log(dest);
			var calDest = calculateDelta(src,dest);
			console.log(calDest);
			this.sprite.clear();
			this.sprite.draw(calDest.x, calDest.y);
			this.x = calDest.x;
			this.y = calDest.y;
		}
	}

	this.init();
}