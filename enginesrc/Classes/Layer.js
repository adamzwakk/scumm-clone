function Layer(id,image,zindex,w,h){

	this.init = function(){
		this.id = id;
		this.canvas = $('<canvas></canvas>').attr({'id':id,'width':w,'height':h}).css('z-index',zindex);
		this.ctx = this.canvas[0].getContext('2d');
		if(image !== 0){
			var bg = image;
			this.image = {
				x:0,
				y:0,
				src:bg,
				width:bg.width,
				height:bg.height
			};
			console.log(bg.src);
			this.image.newDM = calculateAspectRatioFit(bg.width,bg.height,1000000000,sceneHeight);
			this.width = parseInt(this.image.newDM.width);
			this.height = parseInt(this.image.newDM.height);
			this.canvas.attr('width',this.width);
			this.draw(this.image.x,this.image.y);
		}
	}

	this.draw = function(x,y){
		var image = this.image;
		this.ctx.drawImage(image.src,0,0,image.width,image.height,x,y,image.newDM.width,image.newDM.height);
	}

	this.scroll = function(dest){
		var image = this.image;
		var destX = dest.x;
		var calDest = moveDifference({x:0,y:0},{x:destX,y:0},4);
		var x = image.x+calDest.x;
		image.x = x;
		this.clear();
		this.ctx.drawImage(image.src,0,0,image.width,image.height,x,0,image.newDM.width,image.newDM.height);
	}

	this.clear = function(){
		this.ctx.clearRect(0,0,mainWidth,mainHeight-invHeight);
	}

	this.init();
	return this;
}