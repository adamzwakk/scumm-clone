function SpriteBox(scene){
	this.init = function(){
		this.ctx = scene.spriteLayers[0].ctx;
		this.ctx.fillStyle = "rgb(244,244,244)";
	}

	this.clear = function(){
		this.ctx.clearRect(this.x,this.y,this.w,this.h);
	}

	this.init();
}