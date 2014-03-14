function Scene(scene){
	this.layers = new Array();
	this.bgLayers = new Array();
	this.spriteLayers = new Array();
	this.transportLayers = new Array();
	this.transporters = new Array();
	this.images = new Array();
	this.playerLayer;
	this.moving = false;
	this.scrollable;
	this.padding;
	this.scroll;
	this.width = mainWidth;
	this.height = sceneHeight;
	this.loader = new PxLoader();
	
	this.init = function(){
		var that = this;
		this.preloadLayers();
		this.loader.addCompletionListener(function(e) {
			that.images.push(e.resource.img); 
			that.getLayers();
			that.padding = scene.largePadding;
			that.scrollable = (isset(scene.large) || !scene.large) ? true : false;
			that.persPoint = scene.persPoint;
			that.spawnStart = scene.spawnStart;
			that.large = scene.large;
			if(isset(scene.persPoint)){
				that.horizonLine = ((mainHeight - invHeight) - scene.persPoint.y);
			}
			var guybrush = new Player(that);
		});
	}

	this.preloadLayers = function(){
		var json = scene.imageLayers;
		var ti = new Array();
		for (var key in json) {
			var obj = json[key];
			if(obj.type == 'bg'){
				this.loader.addImage(obj.image);
				console.log(obj.image);
			}
		}
		this.loader.start();
	}

	this.getLayers = function(){
		var json = scene.imageLayers;
		var count = 0;
		var l;
		for (var key in json) {
			var obj = json[key];
			if(obj.type == 'bg'){
				l = new Layer('background'+count,this.images[count],count,this.width,this.height);
				this.width = l.width;
				this.bgLayers.push(l);
			} else if(obj.type == 'sprite'){
				l = new Layer('spritelayer'+count,0,9999,this.width,this.height);
				this.spriteLayers.push(l);
			} else if(obj.type == 'transporter'){
				l = new Layer('transportlayer'+count,0,9999,this.width,this.height);
				this.transportLayers.push(l);
			} else if(obj.type == 'player'){
				l = new Layer('player'+count,0,9999,this.width,this.height);
				this.playerLayer = l;
			}
			this.layers.push(l);
			count++;
		}
		activeScene = this;
		this.getTransporters();
	}

	this.getTransporters = function(){
		var json = scene.transporters;
		for (var key in json) {
			var obj = json[key];
			var l = this.transportLayers[key];
			var t = new Transporter(obj,this,l);
			activeTransporters.push(t);
			this.transporters.push(t);
		}
	}

	this.move = function(){
		var dest = {x:0,y:0};
		var ifCheck;
		var scrollRightX;
		var scrollLeftX;
		var bgLayerW;
		if(this.moving){
			for (var i = 0; i < this.bgLayers.length; i++) {
				var l = this.bgLayers[i];
				bgLayerW = parseInt(l.image.newDM.width);
				if(this.scroll == 'r'){
					dest.x = -(bgLayerW - mainWidth);
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
					if(this.scroll == 'r' && this.large === 2 && s.constructor.name == 'Player'){
						s.destX = scrollRightX+(bgLayerW-mainWidth+(this.padding+100));
					} else if(this.scroll == 'l' && this.large === 2 && s.constructor.name == 'Player'){
						s.destX = scrollLeftX+(mainWidth-(this.padding+100));
					} else {
						s.destX = scrollRightX;
					}
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
			}
		}
	}

	this.show = function(){
		var that = this;
		this.loader.addCompletionListener(function() { 
			for (var i = 0; i < that.layers.length; i++) {
				$('#container').append(that.layers[i].canvas);
			};
			that.setupControls();
		});
	}

	this.hide = function(){
		for (var i = 0; i < this.layers.length; i++) {
			$('#'+this.layers[i].id).remove();
		};
	}

	this.setupControls = function(){
		var that = this;
		$('canvas').not('#inv').on('click', function(e){
			if(debugMode){
				console.log('Click coordinates: '+e.offsetX+','+e.offsetY);
			}
			activePlayer.destX = e.offsetX; 
			activePlayer.destY = e.offsetY;
			for (var i = 0; i < that.transporters.length; i++) {
				var s = that.transporters[i];
				if(s.x <= e.offsetX && e.offsetX <= (s.x+s.w) && s.y <= e.offsetY && e.offsetY <= (s.y+s.h)){
					if(debugMode){
						console.log('Clicked Transporter for '+s.title);
					}
					s.intent = true;
				} else {
					s.intent = false;
				}
			}
			activePlayer.moving = true;
		});

		$('canvas').not('#inv').on('mouseout',function(e){
			Inventory.updateCanvas();
		});

		$('canvas').not('#inv').on('mousemove',function(e){
			mousePos.x = e.offsetX;
			mousePos.y = e.offsetY;
			for (var i = 0; i < that.transporters.length; i++) {
				var h = that.transporters[i].hspot;
				if(h.x0 <= mousePos.x && mousePos.x <= h.x1 && h.y0 <= mousePos.y && mousePos.y <= h.y1){
					Inventory.updateInfoText(h.name);
				} else {
					Inventory.updateInfoText('');
				}
			};
		});
	}

	this.init();
}