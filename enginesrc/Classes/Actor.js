function Actor(scene){
	MoveableObject.call(this);
	this.prototype = new MoveableObject();
	this.speed = 2;
	this.moving = false;
	this.scene = scene;
	this.type = 'a';

	this.zHandler = function(){
		var smallPoint = this.scene.horizonLine;
		var bt = this.sprite.getBottomPos(this.x,this.y);
		this.sprite.z = Math.abs(1-(bt.y/smallPoint));
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