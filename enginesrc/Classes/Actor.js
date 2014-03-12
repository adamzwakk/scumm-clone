function Actor(scene){
	this.destX;
	this.destY;
	this.speed = 2;
	this.moving = false;
	this.curDir = {};
	this.scene = scene;

	this.move = function(dt){
		if(this.moving){
			var bottom = this.sprite.getBottomPos(this.x,this.y);
			var src = {x:this.x,y:this.y};
			var dest = {x:this.destX - (this.sprite.w/2),y:this.destY - this.sprite.h};
			var calDest = moveDifference(src,dest,this.speed);
			if(!isset(this.curDir.x)){
				this.curDir.x = calDest.x;
				this.curDir.y = calDest.y;
			}
			calDest.x = (this.curDir.x !== calDest.x) ? 0 : calDest.x;
			calDest.y = (this.curDir.y !== calDest.y) ? 0 : calDest.y; 

			var newX = this.x+calDest.x;
			var newY = this.y+calDest.y;


			if(this.scene.scrollable){
				this.checkSceneEdge(newX,newY);
			}

			if(calDest.x !== 0 || calDest.y !== 0){
				this.sprite.clear();
				this.sprite.draw(newX, newY);
				this.x = newX;
				this.y = newY;
			} else {
				delete this.curDir.x;
				delete this.curDir.y;
				this.moving = false;
			}
		}
	}

	this.checkSceneEdge = function(x,y){
		if((mainWidth - this.scene.padding) >= (this.sprite.x + this.sprite.w)){
			return false;
		} else {
			this.scene.moving = true;
			this.scene.scroll = 'r';
			return true;
		}
	}
}