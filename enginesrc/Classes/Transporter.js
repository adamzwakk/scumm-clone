function Transporter(param){
	MoveableObject.call(this);
	this.prototype = new MoveableObject();
	this.destX;
	this.destY;
	this.curDir = {};
	this.speed = 4;
	this.moving = false;
	this.clicked = false;
	this.type = 't';

	this.init = function(param){
		this.x = param.x;
		this.y = param.y;
		this.origX = this.x;
		this.origY = this.y;
		this.w = param.w;
		this.h = param.h;
		this.ctx = eventLayer.ctx;
		this.moving = false;
		this.spawn(this.x,this.y);
	}

	this.spawn = function(x,y){
		this.ctx.fillStyle = "rgb(55,55,244,0.5)";
		this.ctx.fillRect(x,y,this.w,this.h);
	}

	this.clear = function(){
		this.ctx.clearRect(this.x,this.y,this.w,this.h);
	}

	this.transportMe = function(){
		World.changeScene(param.link);
		this.clicked = false;
	}

	this.init(param);
}