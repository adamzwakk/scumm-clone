function Layer(id,image,zindex,w,h){

	this.init = function(){
		this.id = id;
		this.canvas = $('<canvas></canvas>').attr({'id':id,'width':w,'height':h}).css({'z-index':zindex,'left':'0px'});
		this.ctx = this.canvas[0].getContext('2d');
		this.x = parseInt(this.canvas.css('left'));
		if(image !== 0){
			var bg = image;
			this.image = {
				x:0,
				y:0,
				src:bg,
				width:bg.width,
				height:bg.height
			};
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
		var destX = dest.x;
		var calDest = moveDifference({x:0,y:0},{x:destX,y:0},4);
		var x = this.x+calDest.x;
		this.canvas.css('left',x+'px');
		this.x = parseInt(this.canvas.css('left'));
	}

	this.clear = function(){
		this.ctx.clearRect(0,0,mainWidth,mainHeight-invHeight);
	}

	this.init();
	return this;
}