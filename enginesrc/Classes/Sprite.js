function Sprite(scene, actor, layer){
	this.x;
	this.y;
	this.w;
	this.h;
	this.z;
	this.scene = scene;
	if (isset(actor) ) {
		this.layer = layer.ctx;
	};
	this.actor = actor;
	this.image = null;
	this.scaleDiff = 1;
	this.loaded = false;
	this.loader = new PxLoader();
	if(isset(actor.a)){
		var x = actor.x;
		var y = actor.y;
		this.actor = actor.a;
		this.actor.x = x;
		this.actor.y = y;
	} else {
		this.actor.x = scene.spawnStart.x;
		this.actor.y = scene.spawnStart.y;
	}
	
	this.direction = this.actor.actions.stand.down;

	this.init = function(){
		var that = this;
		this.loader.addImage(this.actor.path);
		this.loader.start();
		this.loader.addCompletionListener(function(e) {
			that.image = e.resource.img;
			that.loaded = true;
			that.draw(that.actor.x, that.actor.y);
		});
	}

	this.handleZ = function(){
		if(this.z <= 0.95 && this.z >= 0.20){
			this.scaleDiff = this.z;
		} 
	}

	this.getBottomPos = function(x,y){
		var b = {};
		b.x = x + (this.w/2);
		b.y = y+this.h;
		return b;
	}

	this.draw = function(x,y){
		if(this.loaded){
			var up = this.direction[0];
			this.x = x;
			this.y = y;
			this.h = up.height;
			this.w = up.width;
			this.clear();
			this.layer.drawImage(this.image, up.x, up.y, up.width, up.height, this.x, this.y, up.width, up.height);
		}
	}

	this.clear = function() {
		var up = this.direction[0];
		this.layer.clearRect(this.x, this.y, up.width, up.height);
	}

	this.init();
}