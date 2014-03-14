function Transporter(param,scene,layer){
	MoveableObject.call(this);
	this.prototype = new MoveableObject();
	this.destX;
	this.destY;
	this.curDir = {};
	this.speed = 4;
	this.moving = false;
	this.intent = false;
	this.type = 't';

	this.init = function(param){		
		this.x = param.x;
		this.y = param.y;
		this.origX = this.x;
		this.origY = this.y;
		this.w = param.w;
		this.h = param.h;
		this.title = param.title;
		this.moving = false;
		this.hspot = {
			x0:this.x,
			y0:this.y,
			x1:this.x+this.w,
			y1:this.y+this.h,
			w:this.w,
			h:this.h,
			name:this.title
		};
		if(debugMode){
			var rgb = "rgba(55,55,244,0.5)";
		} else {
			var rgb = "rgba(55,55,244,0)";
		}
		this.sprite = new SpriteBox(scene,layer,this.w,this.h,rgb);
		this.sprite.draw(this.x,this.y);
	}

	this.transportMe = function(){
		World.changeScene(param.link);
		this.intent = false;
	}

	this.init(param);
}