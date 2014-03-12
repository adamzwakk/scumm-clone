function Actor(scene){
	this.destX;
	this.destY;
	this.speed = 1;

	this.move = function(dt){
		if(typeof this.destX != 'undefined' && this.destX != this.x){
			var src = {x:this.x,y:this.y};
			var dest = {x:this.destX,y:this.destY};
			var calDest = moveDifference(src,dest,this.speed);
			var newX = this.x+calDest.x;
			var newY = this.y+calDest.y;
			this.sprite.clear();
			console.log(newX);
			this.sprite.draw(newX, newY);
			this.x = newX;
			this.y = newY;
		}
	}
}