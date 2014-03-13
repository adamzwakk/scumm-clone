function Actor(scene){
	this.destX;
	this.destY;
	this.speed = 2;
	this.moving = false;
	this.curDir = {};
	this.scene = scene;

	this.move = function(dt){
		if(this.moving){
			this.sprite.bottom = this.sprite.getBottomPos(this.x,this.y);
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
				this.zHandler();
				this.x = newX;
				this.y = newY;
			} else {
				delete this.curDir.x;
				delete this.curDir.y;
				this.moving = false;
				for (var i = 0; i < activeTransporters.length; i++) {
					var t = activeTransporters[i];
					if(t.clicked){
						t.transportMe();
					}
				};
			}
		}
	}

	this.zHandler = function(){
		var smallPoint = this.scene.horizonLine;
		var bt = this.sprite.bottom;
		this.sprite.z = Math.abs(1-(bt.y/smallPoint));
		this.sprite.handleZ();
	}

	this.checkSceneEdge = function(x,y){

		if((mainWidth - this.scene.padding) <= (this.sprite.x + this.sprite.w)){
			this.scene.moving = true;
			this.scene.scroll = 'r';
			return true;
		} else if(this.sprite.x <= (this.scene.padding)) {
			this.scene.moving = true;
			this.scene.scroll = 'l';
			return true;
		} else {
			return false;
		}
	}
}