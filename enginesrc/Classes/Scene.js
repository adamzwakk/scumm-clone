function Scene(scene,large){
	this.bgLayers = new Array();
	this.spriteLayers = new Array();
	this.moving = false;
	this.scrollable = (large) ? true : false;
	this.padding = 40;
	this.scroll;
	this.init = function(){
		this.getLayers();

		var l = new Layer('controlLayer',0,99999);
		$('#container').append(l.canvas);
		activeScene = this;
		this.setupControls();
	}

	this.persPoint = scene.persPoint;

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

	this.move = function(){
		var dest = {x:0,y:0};
		var ifCheck;
		var scrollRightX;
		var scrollLeftX;
		if(this.moving){
			for (var i = 0; i < this.bgLayers.length; i++) {
				var l = this.bgLayers[i];
				if(this.scroll == 'r'){
					dest.x = -(l.image.newDM.width - mainWidth);
					scrollRightX = dest.x;
					ifCheck = l.image.x >= dest.x;
				}
				if(this.scroll == 'l'){
					dest.x = 0;
					scrollLeftX = dest.x;
					ifCheck = l.image.x <= dest.x;
				}
				if(ifCheck){
					l.scroll(dest);
				} else {
					this.moving = false;
				}
			}
			for (var i = 0; i < activeSprites.length; i++) {
				var s = activeSprites[i];
				if(!this.moving){
					s.moving = false;
				} else {
					s.destX = scrollRightX;
					s.moving = true;
				}
			};
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
			console.log(e);
			activePlayer.destX = e.offsetX; 
			activePlayer.destY = e.offsetY;
			activePlayer.moving = true;
		});
	}

	this.init();
}