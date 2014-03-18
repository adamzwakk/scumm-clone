function Actor(scene,params,key){
	MoveableObject.call(this);
	this.prototype = new MoveableObject();
	this.speed = 2;
	this.orientation = 'down';
	this.moving = false;
	this.type = 'a';
	this.hspot;
	if(isset(params)){
		this.a = params.a;
		this.w = this.a.actions.stand.down[0].width;
		this.h = this.a.actions.stand.down[0].height;

		this.x = scene.orig.actors[key].x;
		this.y = scene.orig.actors[key].y;
	}

	this.spawn = function(layer){
		this.ctx = layer.ctx;
		if(!isset(this.a.path)){
			this.sprite = new SpriteBox(scene,layer,this.w,this.h,this.a.rgbBox);
		} else {
			this.sprite = new Sprite(scene,this,layer);
		}
		this.sprite.draw(this.x,this.y);
		activeSprites.push(this);
	}

}