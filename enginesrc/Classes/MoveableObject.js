function MoveableObject(){
	this.destX;
	this.destY;
	this.curDir = {};

	this.move = function(dt){
		if(this.moving){
			var src = {x:this.x,y:this.y};
			if(this.type == 'a'){
				this.destXs = this.destX - (this.sprite.w/2);
				this.destYs = this.destY - this.sprite.h;
			}
			if(this.type == 't' && (isset(this.destX) || isset(this.destY))){
				this.destXs = this.destX;
				this.destYs = this.destY;
			} else if(this.type == 't'){
				this.destXs = this.origX;
				this.destYs = this.origY;
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

			if(this.type == 'a' && this.scene.scrollable){
				this.checkSceneEdge(newX,newY);
			}

			if(calDest.x !== 0 || calDest.y !== 0){
				this.sprite.clear();
				this.sprite.draw(newX, newY);
				this.zHandler();
				this.x = newX;
				this.y = newY;
			} else {
				delete this.curDir.x;
				delete this.curDir.y;
				this.moving = false;
				if(this.type == 'a'){
					for (var i = 0; i < activeTransporters.length; i++) {
						var t = activeTransporters[i];
						if(t.intent){
							t.transportMe();
						}
					}
				}
			}
		}
	}

	this.zHandler = function(){
		if(isset(this.scene)){
			var smallPoint = this.scene.horizonLine;
			var bt = this.sprite.getBottomPos(this.x,this.y);
			this.sprite.z = Math.abs(1-(bt.y/smallPoint));
		}
	}

}