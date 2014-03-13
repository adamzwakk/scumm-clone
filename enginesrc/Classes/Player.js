function Player(scene){
	Actor.call(this);
	this.prototype = new Actor();
	this.x = scene.spawnStart.x;
	this.y = scene.spawnStart.y;
	this.scene = scene;
	this.speed = 4;
	activePlayer = this;

	this.init = function(){
		this.sprite = new SpriteBox(scene,scene.playerLayer,150,150,"rgb(244,244,244)");
		this.sprite.draw(this.x,this.y);
		activeSprites.push(this);
	}

	this.checkSceneEdge = function(x,y){
		if((mainWidth - this.scene.padding) <= (this.sprite.x + this.sprite.w)){
			this.scene.moving = true;
			this.scene.scroll = 'r';
			return true;
		} else if(this.sprite.x <= (this.scene.padding)) {
			this.scene.moving = true;
			this.scene.scroll = 'l';
			return true;
		} else {
			return false;
		}
	}

	this.init();
}