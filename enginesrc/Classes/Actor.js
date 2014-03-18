function Actor(scene,params,key){
	MoveableObject.call(this);
	this.prototype = new MoveableObject();
	this.speed = 2;
	this.orientation = 'down';
	this.moving = false;
	this.type = 'a';
	if(isset(params)){
		this.a = params.a;
		this.x = params.x;
		this.y = params.y;
	
		this.hspot = {
			x0:this.x,
			y0:this.y,
			x1:this.x+this.w,
			y1:this.y+this.h,
			w:this.w,
			h:this.h,
			name:this.a.name
		};

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

	this.draw = function(){
		this.sprite.draw(this.x,this.y);
	}

}