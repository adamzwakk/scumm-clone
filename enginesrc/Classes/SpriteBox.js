function SpriteBox(scene,layer,w,h,rgb){
	this.w = w;
	this.h = h;
	this.scene = scene;
	this.realH = h;
	this.realW = w;
	this.init = function(){
		this.ctx = layer.ctx;
		this.ctx.fillStyle = rgb;
	}

	this.draw = function(x,y){
		this.x = x;
		this.y = y;
		this.h = parseInt(this.realH*this.scaleDiff);
		this.w = parseInt(this.realW*this.scaleDiff);		
		this.ctx.fillRect(this.x,this.y,this.w,this.h);
	}

	this.clear = function(){
		this.ctx.clearRect(this.x,this.y,this.w,this.h);
	}

	this.init();
}