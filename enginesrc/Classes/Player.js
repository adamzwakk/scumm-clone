function Player(scene){
	Actor.call(this);
	this.prototype = new Actor();
	this.x = scene.spawnStart.x;
	this.y = scene.spawnStart.y;
	this.scene = scene;
	this.speed = 4;
	activePlayer = this;
	this.type = 'p';

	this.init = function(){
		this.sprite = new SpriteBox(scene,scene.playerLayer,150,150,"rgb(244,244,244)");
		this.sprite.draw(this.x,this.y);
		activeSprites.push(this);
	}

	this.checkSceneEdge = function(x,y){
		if(this.scene.x == 0 && (mainWidth - this.scene.padding) <= (this.sprite.x + this.sprite.w)){
			this.scene.moving = true;
			this.scene.scroll = 'r';
			if(debugMode){
				console.log('Scrolling scene right');
			}
			return true;
		} else if(this.scene.x < 0 && this.sprite.x <= ((scene.width-mainWidth)+this.scene.padding)) {
			this.scene.moving = true;
			this.scene.scroll = 'l';
			if(debugMode){
				console.log('Scrolling scene left');
			}
			return true;
		} else {
			return false;
		}
	}

	this.init();
}