function Layer(id,image,zindex,w,h){
	this.id = id;
	this.canvas = $('<canvas></canvas>').attr({'id':id,'width':mainWidth,'height':sceneHeight}).css('z-index',zindex);
	this.ctx = this.canvas[0].getContext('2d');
	if(image !== 0){
		this.image = {};
		var bg = new Image();
		bg.src = image;
		var that = this;
		bg.onload = function(){
			that.image.x = 0;
			that.image.y = 0;
			that.image.src = this;
			that.image.width = this.width;
			that.image.height = this.height;
			that.image.newDM = calculateAspectRatioFit(this.width,this.height,1000000000,sceneHeight);
			that.width = that.image.newDM.width;
			that.height = that.image.newDM.height;
			that.draw(that.image.x,that.image.y);
		}
	}

	this.draw = function(x,y){
		var image = this.image;
		that.ctx.drawImage(image.src,0,0,image.width,image.height,x,y,image.newDM.width,image.newDM.height);
	}

	this.scroll = function(dest){
		var image = this.image;
		var destX = dest.x;
		var calDest = moveDifference({x:0,y:0},{x:destX,y:0},4);
		var x = image.x+calDest.x;
		image.x = x;
		this.clear();
		that.ctx.drawImage(image.src,0,0,image.width,image.height,x,0,image.newDM.width,image.newDM.height);
	}

	this.clear = function(){
		this.ctx.clearRect(0,0,mainWidth,mainHeight-invHeight);
	}

	return this;
}