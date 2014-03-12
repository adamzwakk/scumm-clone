function SpriteBox(scene){
	this.x;
	this.y;
	this.w = 150;
	this.h = 150;
	this.init = function(){
		this.ctx = scene.spriteLayers[0].ctx;
		this.ctx.fillStyle = "rgb(244,244,244)";
	}

	this.draw = function(x,y){
		this.x = x;
		this.y = y;
		this.ctx.fillRect(this.x,this.y,this.w,this.h);
	}

	this.clear = function(){
		this.ctx.clearRect(this.x,this.y,this.w,this.h);
	}

	this.init();
}