function Scene(scene){
	this.layers = new Array();
	this.bgLayers = new Array();
	this.spriteLayers = new Array();
	this.transportLayers = new Array();
	this.transporters = new Array();
	this.itemLayers = new Array();
	this.items = new Array();
	this.actors = new Array();
	this.checkSpots = new Array();
	this.images = new Array();
	this.playerLayer;
	this.moving = false;
	this.scrollable;
	this.padding;
	this.scroll;
	this.width = mainWidth;
	this.height = sceneHeight;
	this.loader = new PxLoader();
	this.orig = scene;
	this.x = 0;
	this.spawnStart = {};
	this.spawnStart.x = scene.actors[0].x;
	this.spawnStart.y = scene.actors[0].y;
	this.grid = new Array();
	this.squareSize = 16;
	this.graph;
	this.walkLayer;
	
	this.init = function(){
		var that = this;
		this.preloadLayers();
		this.loader.addCompletionListener(function(e) {
			that.images.push(e.resource.img);
			that.getLayers();
			that.drawPathGrid();
			that.padding = scene.largePadding;
			that.scrollable = (isset(scene.large) || !scene.large) ? true : false;
			that.persPoint = scene.persPoint;
			that.large = scene.large;
			if(isset(scene.persPoint)){
				that.horizonLine = ((mainHeight - invHeight) - scene.persPoint.y);
			}
		});
	}

	this.drawPathGrid = function(){
		if(isset(scene.walkable)){
			var l = new Layer('walkable',0,9999,this.width,this.height);
			this.layers.push(l);
			this.walkLayer = l.ctx;
			var ctx = l.ctx;
			ctx.beginPath();
			for (var i = 0; i < scene.walkable.length; i++) {
				var w = scene.walkable[i];
			 	ctx.lineTo(w.x,w.y);
			}
			if(debugMode){
				ctx.fillStyle = "rgba(150,150,150,0.4)";
				l.ctx.fill();
			}
			var gridSize = {};
			var curGrid = {};
			gridSize.x = parseInt(this.width/this.squareSize);
			gridSize.y = parseInt(this.height/this.squareSize);
			curGrid.x = 0
			curGrid.y = 0;
			var touchArray = new Array();
			var touchArrayX;
			for (var i = 0; i < gridSize.y; i++) {
				curGrid.y = i*this.squareSize;
				touchArrayX = new Array();
				for (var j = 0; j < gridSize.x; j++) {
					//on x axis
					var s = {};
					s.x0 = j*this.squareSize;
					s.y0 = curGrid.y;
					s.x1 = (j*this.squareSize)+this.squareSize;
					s.y1 = curGrid.y+this.squareSize;
					curGrid.x = j*this.squareSize;
					if(this.walkLayer.isPointInPath(s.x0,s.y0) || this.walkLayer.isPointInPath(s.x1,s.y1)){
						touchArrayX.push(1);
					} else {
						touchArrayX.push(0);
					}
				}
				touchArray.push(touchArrayX);
			}
			this.graph = new Graph(touchArray);
		}
	}

	this.preloadLayers = function(){
		var json = scene.imageLayers;
		for (var key in json) {
			var obj = json[key];
			if(obj.type == 'bg'){
				this.loader.addImage(obj.image);
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
				l = new Layer('player',0,9999,this.width,this.height);
				this.playerLayer = l;
			} else if(obj.type == 'item'){
				l = new Layer('item'+count,0,9999,this.width,this.height);
				this.itemLayers.push(l);
			}
			this.layers.push(l);
			count++;
		}
		activeScene = this;
		this.getTransporters();
		this.getActors();
		this.getItems();
	}

	this.getTransporters = function(){
		var json = scene.transporters;
		for (var key in json) {
			var obj = json[key];
			var l = this.transportLayers[key];
			var t = new Transporter(obj,this,l);
			activeTransporters.push(t);
			this.transporters.push(t);
			this.checkSpots.push(t);
		}
	}

	this.getActors = function(){
		var json = scene.actors;
		for (var key in json) {
			var obj = json[key];
			if(obj.t == 'n'){
				var a = new Actor(this,obj,key);
				a.spawn(this.spriteLayers[key-1]);
				this.actors.push(a);
				this.checkSpots.push(a);
				activeSprites.push(a);
			} else {
				var player = new Player(this,obj,0);
			}
		}
	}

	this.getItems = function(){
		var json = scene.items;
		var that = this;
		var loader = new PxLoader();
		for (var key in json) {
			var obj = json[key];
			loader.addImage(obj.i.image);
		}
		loader.start();
		loader.addCompletionListener(function(e) {
			for (var key in json) {
				var obj = json[key];
				var l = that.itemLayers[key];
				var i = new InventoryItem(obj,l);
				i.image = e.resource.img;
				i.spawn();
				that.items.push(i);
				that.checkSpots.push(i);
			}
		});
	}

	this.move = function(){
		var dest = {x:0,y:0};
		var ifCheck;
		var scrollRightX;
		var scrollLeftX;
		if(this.moving){
			for (var i = 0; i < this.layers.length; i++) {
				var l = this.layers[i];
				if(this.scroll == 'r'){
					dest.x = -(this.width - mainWidth);
					scrollRightX = dest.x;
					ifCheck = l.x >= dest.x;
				}
				if(this.scroll == 'l'){
					dest.x = 0;
					scrollLeftX = dest.x;
					ifCheck = l.x <= dest.x;
				}
				
				this.x = dest.x;

				if(ifCheck){
					l.scroll(dest);
				} else {
					this.moving = false;
				}
			}

			if(this.large == 2){
				var s = activePlayer;
				if(!this.moving){
					console.log('STOP MOVING');
					s.moving = false;
				} else if(s.cX !== 0 || s.cY !== 0) {
					if(s.constructor.name == 'Player'){
						var pMovePadding = this.padding+150;
						if(this.scroll == 'r'){
							s.destX = -scrollRightX+pMovePadding;
						} else if(this.scroll == 'l'){
							s.destX = -scrollLeftX+mainWidth-pMovePadding;
						}
					}
					s.moving = true;
				}
			}
		}
	}

	this.scrollTo = function(direction){
		this.scroll = direction;
		this.moving = true;
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

	this.showHotspotText = function(mousePos,objs){
		for (var i = 0; i < objs.length; i++) {
			var h = objs[i].hspot;
			if(h.x0 <= mousePos.x && mousePos.x <= h.x1 && h.y0 <= mousePos.y && mousePos.y <= h.y1){
				Inventory.target = h.name;
				break;
			} else {
				if(debugMode){
					Inventory.target = mousePos.x+', '+mousePos.y;
				} else {
					Inventory.target = '';
				}
			}
		}
	}

	this.setupControls = function(){
		var that = this;
		$('canvas').not('#inv,#dialog,#actions').on('click', function(e){
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

		$('canvas').not('#inv,#dialog,#actions').on('mouseout',function(e){
			Inventory.updateCanvas();
		});

		$('canvas').not('#inv,#dialog,#actions').on('mousemove',function(e){
			mousePos.x = e.offsetX;
			mousePos.y = e.offsetY;
			that.showHotspotText(mousePos, that.checkSpots);
		});
	}

	this.init();
}