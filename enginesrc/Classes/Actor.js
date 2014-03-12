function Actor(scene){
	this.dest = {};
	this.destX;
	this.destY;

	this.move = function(dt){
		if(typeof this.destX != 'undefined' && this.destX != this.x){
			var src = {x:this.x,y:this.y};
			var dest = {x:this.destX,y:this.destY};
			console.log(dest);
			var calDest = calculateDelta(src,dest);
			console.log(calDest);
			this.sprite.clear();
			this.sprite.draw(calDest.x, calDest.y);
			this.x = calDest.x;
			this.y = calDest.y;
		}
	}
}