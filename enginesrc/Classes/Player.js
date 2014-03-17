function Player(scene,params,key){
	Actor.call(this);
	this.prototype = new Actor(scene,params,key);
	this.x = scene.spawnStart.x;
	this.y = scene.spawnStart.y;
	this.scene = scene;
	this.speed = 4;
	activePlayer = this;
	this.type = 'p';
	this.actor = playerSprite;
	this.init = function(){
		this.sprite = new Sprite(this.scene, this.actor, this.scene.playerLayer);
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

	this.whatDoOnStop = function(){
		for (var i = 0; i < activeTransporters.length; i++) {
			var t = activeTransporters[i];
			if(t.intent && t.withinPadding(this)){
				t.transportMe();
			}
		}
	}

	this.init();
}