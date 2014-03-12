function Sprite(scene){
	this.x;
	this.y;
	this.w;
	this.h;
	this.scene = scene;
	
	this.init = function(){
		
	}

	this.getBottomPos = function(x,y){
		var b = {};
		b.x = x + (this.w/2);
		b.y = y+this.h;
		return b;
	}

	//this.init();
}