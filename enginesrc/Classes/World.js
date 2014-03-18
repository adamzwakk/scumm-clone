function World(){
	this.locations = world;

	this.changeScene = function(ns){
		activeScene.hide();
		for (var i = 0; i < Hotspot.allInstances.length; i++) {
			var h = Hotspot.allInstances[i];
			h.remove();
		};
		var newScene = new Scene(this.locations[ns]);
		newScene.show();
	}
}