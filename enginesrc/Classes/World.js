function World(){
	this.locations = world;

	this.changeScene = function(ns){
		activeScene.hide();
		Hotspot.removeAllFromScene();
		var newScene = new Scene(this.locations[ns]);
		newScene.show();
	}
}