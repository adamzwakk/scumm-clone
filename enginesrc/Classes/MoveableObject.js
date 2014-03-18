function MoveableObject(){
	this.destX;
	this.destY;
	this.curDir = {};
	this.hspot;
	this.moveQueue = new Array();

	this.move = function(dt){
		if(this.moving && this.moveQueue.length > 0){
			var src = {x:this.x,y:this.y};

			if(this.type == 'p'){
				this.destXs = this.destX - (this.sprite.w/2);
				this.destYs = this.destY - this.sprite.h;
			}

			var dest = {x:this.destXs,y:this.destYs};
			var calDest = moveDifference(src,dest,this.speed);

			if(!isset(this.curDir.x)){
				this.curDir.x = calDest.x;
				this.curDir.y = calDest.y;
			}
			calDest.x = (this.curDir.x !== calDest.x) ? 0 : calDest.x;
			calDest.y = (this.curDir.y !== calDest.y) ? 0 : calDest.y; 

			var newX = this.x+calDest.x;
			var newY = this.y+calDest.y;

			if(this.type == 'p' && this.scene.scrollable && !this.scene.moving){
				this.checkSceneEdge(newX,newY);
			}

			this.cX = calDest.x;
			this.cY = calDest.y;

			if(calDest.x !== 0 || calDest.y !== 0){
				this.sprite.clear();
				this.sprite.draw(newX, newY, calDest);
				this.x = newX;
				this.y = newY;
			} else {
				delete this.curDir.x;
				delete this.curDir.y;
				this.moving = false;
				if(this.type == 'p'){
					activePlayer.whatDoOnStop();
				}
			}
		}
	}

}