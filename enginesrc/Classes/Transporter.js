function Transporter(param){
	this.destX;
	this.destY;
	this.curDir = {};
	this.speed = 4;
	this.moving = false;

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

	this.move = function(){
		if(this.moving){
			var src = {x:this.x,y:this.y};
			if(isset(this.destX) || isset(this.destY)){
				var dest = {x:this.destX,y:this.destY};
			} else {
				var dest = {x:this.origX,y:this.origY};
			}
			var calDest = moveDifference(src,dest,this.speed);
			if(!isset(this.curDir.x)){
				this.curDir.x = calDest.x;
				this.curDir.y = calDest.y;
			}
			calDest.x = (this.curDir.x !== calDest.x) ? 0 : calDest.x;
			calDest.y = (this.curDir.y !== calDest.y) ? 0 : calDest.y; 

			var newX = this.x+calDest.x;
			var newY = this.y+calDest.y;

			if(calDest.x !== 0 || calDest.y !== 0){
				this.clear();
				this.spawn(newX, newY);
				this.x = newX;
				this.y = newY;
			} else {
				delete this.curDir.x;
				delete this.curDir.y;
				this.moving = false;
			}
		}
	}

	this.init(param);
}