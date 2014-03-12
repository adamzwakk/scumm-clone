function Layer(id,image,zindex){
	this.canvas = $('<canvas></canvas>').attr({'id':id,'width':mainWidth,'height':mainHeight-invHeight}).css('z-index',zindex);
	this.ctx = this.canvas[0].getContext('2d');
	if(image !== 0){
		var bg = new Image();
		bg.src = image;
		var that = this;
		bg.onload = function(){
			var newDM = calculateAspectRatioFit(this.width,this.height,1000000000,sceneHeight);
		    that.ctx.drawImage(bg,0,0,this.width,this.height,0,0,newDM.width,newDM.height);
		}
	}
	return this;
}