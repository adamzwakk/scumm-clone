function Action(w,h,type,key,layer){

	this.init = function(){
		this.layer = layer;
		this.type = type;
		this.key = key;
		this.w = w;
		this.h = h;
	}

	this.draw = function(x,y,layer){
		var context = this.layer.ctx;
		this.hspot = {
			x0:x,
			y0:y,
			x1:x+this.w,
			y1:y+this.h,
			name:this.type
		};
		context.beginPath();
		context.rect(x,y,150,60);
		context.lineWidth = 2;
		context.strokeStyle = 'lightblue';
		context.stroke();
		context.textAlign = 'center';
		context.fillStyle = 'white';
		context.font = "bold 16px Arial";
		context.fillText(this.type,x+(this.w/2),y+35);
	}

	this.init();
}