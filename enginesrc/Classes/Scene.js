function Scene(scene){
	this.bgLayers = new Array();
	this.spriteLayers = new Array();
	this.init = function(){
		this.getLayers();

		var l = new Layer('controlLayer',0,99999);
		$('#container').append(l.canvas);
		activeScene = this;
		this.setupControls();
	}

	this.getLayers = function(){
		var json = scene.imageLayers;
		var count = 0;
		for (var key in json) {
			var obj = json[key];
			for (var prop in obj) {
				if(obj.hasOwnProperty(prop)){
					var l = new Layer('background'+count,obj[prop],count);
					this.bgLayers.push(l);
					count++;
				}
			}
		}
	}

	this.show = function(){
		for (var i = 0; i < this.bgLayers.length; i++) {
			$('#container').append(this.bgLayers[i].canvas);
		};
		var l = new Layer('spritelayer0',0,9999);
		this.spriteLayers.push(l);
		$('#container').append(l.canvas);
	}

	this.hide = function(){
		for (var i = 0; i < this.bgLayers.length; i++) {
			$('#'+this.bgLayers[i].id).remove();
		};
	}

	this.setupControls = function(){
		$('#controlLayer').on('click', function(e){
			activePlayer.destX = e.offsetX; 
			activePlayer.destY = e.offsetY;
			//activePlayer.move();
		});
	}

	this.init();
}