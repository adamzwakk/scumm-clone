function Actor(scene,params){
	MoveableObject.call(this);
	this.prototype = new MoveableObject();
	this.speed = 2;
	this.moving = false;
	this.type = 'a';
	if(isset(params)){
		this.x = params.x;
		this.y = params.y;
		this.h = params.a.h;
		this.w = params.a.w;
		this.a = params.a;

		this.hspot = {
			x0:this.x,
			y0:this.y,
			x1:this.x+this.w,
			y1:this.y+this.h,
			w:this.w,
			h:this.h,
			name:this.a.name
		};
	}

	this.spawn = function(layer){
		this.ctx = layer.ctx;
		if(!isset(this.a.sprite)){
			this.sprite = new SpriteBox(scene,layer,this.w,this.h,this.a.rgbBox);
		}

		this.sprite.draw(this.x,this.y);
		activeSprites.push(this);
	}

}