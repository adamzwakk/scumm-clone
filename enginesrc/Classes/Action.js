function Action(w,h,type,key,layer){

	this.normalColor = 'white';
	this.hoverColor = 'lightblue';
	this.color = this.normalColor;


	this.init = function(){
		this.layer = layer;
		this.type = type;
		this.key = key;
		this.w = w;
		this.h = h;
	}

	this.mouseOn = function(e){
		var h = this.hspot;
		if(h.x0 <= e.offsetX && e.offsetX <= h.x1 && h.y0 <= e.offsetY && e.offsetY <= h.y1){
			return true;
		} else {
			return false;
		}
	}

	this.draw = function(x,y){
		var context = this.layer.ctx;
		this.x = x;
		this.y = y;
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
		context.fillStyle = this.color;
		context.font = "bold 16px Arial";
		context.fillText(this.type,x+(this.w/2),y+35);
	}

	this.clear = function(){
		this.layer.ctx.clearRect(this.x,this.y,this.w,this.h);
	}

	this.init();
}