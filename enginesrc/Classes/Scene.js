function Scene(scene){
	this.layers = new Array();
	this.bgLayers = new Array();
	this.spriteLayers = new Array();
	this.transportLayers = new Array();
	this.transporters = new Array();
	this.hotspots = new Array();
	this.playerLayer;
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
		this.large = scene.large;
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
			} else if(obj.type == 'sprite'){
				var l = new Layer('spritelayer'+count,0,9999,this.width,this.height);
				this.spriteLayers.push(l);
				this.layers.push(l);
				$('#container').append(l.canvas);
			} else if(obj.type == 'transporter'){
				var l = new Layer('transportlayer'+count,0,9999,this.width,this.height);
				this.transportLayers.push(l);
				this.layers.push(l);
				$('#container').append(l.canvas);
			} else if(obj.type == 'player'){
				var l = new Layer('player'+count,0,9999,this.width,this.height);
				this.playerLayer = l;
				this.layers.push(l);
				$('#container').append(l.canvas);
			}
			count++;
		}

		activeScene = this;
		this.getTransporters();
		activeScene.setupControls();
	}

	this.getTransporters = function(){
		var json = scene.transporters;
		for (var key in json) {
			var obj = json[key];
			var l = this.transportLayers[key];
			this.hotspots.push(
				{
					x0:obj.x,
					y0:obj.y,
					x1:obj.x+obj.w,
					y1:obj.y+obj.h,
					name:obj.title,
					action:'walk'
				}
			);
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
		if(this.moving){
			for (var i = 0; i < this.bgLayers.length; i++) {
				var l = this.bgLayers[i];
				if(this.large === 1){
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
			for (var i = 0; i < that.hotspots.length; i++) {
				var h = that.hotspots[i];
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