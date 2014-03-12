function Sprite(scene){
	this.x;
	this.y;
	this.w;
	this.h;
	this.z;
	this.scene = scene;
	this.scaleDiff = 1;

	this.init = function(){
		
	}

	this.handleZ = function(){
		console.log(this.z);
		if(this.z <= 0.6){
			this.scaleDiff = this.z;
		} else {
			this.scaleDiff = 1;
		}
	}

	this.getBottomPos = function(x,y){
		var b = {};
		b.x = x + (this.w/2);
		b.y = y+this.h;
		return b;
	}

	//this.init();
}