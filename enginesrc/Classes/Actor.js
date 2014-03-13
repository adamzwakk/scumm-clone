function Actor(scene){
	MoveableObject.call(this);
	this.prototype = new MoveableObject();
	this.speed = 2;
	this.moving = false;
	this.scene = scene;
	this.type = 'a';

}