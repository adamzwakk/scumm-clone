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
		this.sprite = new SpriteBox(scene,layer,this.w,this.h,"rgba(55,55,244,0)");
		this.sprite.draw(this.x,this.y);
	}

	this.transportMe = function(){
		World.changeScene(param.link);
		this.intent = false;
	}

	this.init(param);
}