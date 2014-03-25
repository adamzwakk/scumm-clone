function MoveableObject(){
	this.destX;
	this.destY;
	this.curDir = {};
	this.hspot;
	this.moveQueue = new Array();
	this.movePos = 0;

	this.move = function(dt){
		if(this.moving && this.moveQueue.length > 0 && this.movePos != this.moveQueue.length){
			var src = {x:this.x,y:this.y};

			var gridDest = this.moveQueue[this.movePos];

			this.destX = gridDest.x0;
			this.destY = gridDest.y0;

			if(this.type == 'p'){
				this.destXs = this.destX - (this.sprite.realW/2);
				this.destYs = this.destY - this.sprite.realH;
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
				this.movePos++;
			}
		} else {
			if(this.moving && this.moveQueue.length > 0){
				if(this.type == 'p'){
					activePlayer.whatDoOnStop();
				}
			}
			this.moving = false;
			this.movePos = 0;
			this.moveQueue = new Array();
		}
	}

}