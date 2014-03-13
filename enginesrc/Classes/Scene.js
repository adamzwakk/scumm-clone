function Scene(scene){
	this.bgLayers = new Array();
	this.spriteLayers = new Array();
	this.transporters = new Array();
	this.layers = new Array();
	this.moving = false;
	this.scrollable;
	this.padding;
	this.scroll;
	this.width = 0;
	this.height = 0;
	this.init = function(){
		this.getLayers();
		this.padding = scene.largePadding;
		this.scrollable = (isset(scene.large) || !scene.large) ? true : false;
		this.persPoint = scene.persPoint;
		this.spawnStart = scene.spawnStart;
		if(isset(scene.persPoint)){
			this.horizonLine = ((mainHeight - invHeight) - scene.persPoint.y);
		}
		var guybrush = new Player(this);
	}

	this.getLayers = function(){
		var json = scene.imageLayers;
		var count = 0;
		for (var key in json) {
			var obj = json[key];
			if(obj.type == 'bg'){
				var l = new Layer('background'+count,obj.image,count,this.width,this.height);
				this.bgLayers.push(l);
				this.layers.push(l);
				count++;
			} else if(obj.type == 'sprite'){
				var l = new Layer('spritelayer'+count,0,9999,this.width,this.height);
				this.spriteLayers.push(l);
				this.layers.push(l);
				$('#container').append(l.canvas);
			}
		}

		var l = new Layer('eventLayer',0,99999,this.width,this.height);
		$('#container').append(l.canvas);
		eventLayer = l;
		this.layers.push(l);
		activeScene = this;
		this.getTransporters();
		activeScene.setupControls();
	}

	this.getTransporters = function(){
		var json = scene.transporters;
		for (var key in json) {
			var obj = json[key];
			var t = new Transporter(obj);
			activeTransporters.push(t);
			this.transporters.push(t);
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
			}
			for (var i = 0; i < this.transporters.length; i++) {
				var s = this.transporters[i];
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
	}

	this.hide = function(){
		for (var i = 0; i < this.layers.length; i++) {
			$('#'+this.layers[i].id).remove();
		};
	}

	this.setupControls = function(){
		var that = this;
		$('canvas').on('click', function(e){
			console.log(e.offsetX+' '+e.offsetY);
			activePlayer.destX = e.offsetX; 
			activePlayer.destY = e.offsetY;
			for (var i = 0; i < that.transporters.length; i++) {
				var s = that.transporters[i];
				if(s.x <= e.offsetX && e.offsetX <= (s.x+s.w) && s.y <= e.offsetY && e.offsetY <= (s.y+s.h)){
					s.clicked = true;
				}
			}
			activePlayer.moving = true;
		});
	}

	this.init();
}