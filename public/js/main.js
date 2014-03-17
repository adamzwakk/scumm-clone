$(document).ready(function(){ 
var now,
	dt   = 0,
    last = timestamp(),
    step = 1/60;

var activeScene;
var activePlayer = {};
var playerSprite;
var activeSprites = new Array();
var activeTransporters = new Array();
var eventLayer;
var mousePos = {};
var mainPreloader = new PxLoader();
mainPreloader.addImage('fonts/perfectdos-webfont.eot');
mainPreloader.addImage('fonts/perfectdos-webfont.woff');
mainPreloader.addImage('fonts/perfectdos-webfont.ttf');
mainPreloader.addImage('fonts/perfectdos-webfont.svg#perfect_dos_vga_437regular');
mainPreloader.start();

function frame() {
	now = timestamp();
	dt = dt + Math.min(1, (now - last) / 1000);
	render(dt);
	last = now;
	requestAnimationFrame(frame);
}

function render(){
	for (var i = 0; i < activeSprites.length; i++) {
		activeSprites[i].move(dt);
	};
	if(isset(activeScene)){
		activeScene.move();
	}
	Inventory.updateCanvas();
}

requestAnimationFrame(frame);
function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
	var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
	return { width: srcWidth*ratio, height: srcHeight*ratio };
}

function timestamp() {
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function moveDirection(num1,num2,speed){
	if(!isset(num1) || !isset(num2)){
		return 0;
	} else {
		return (num1 > num2) ? -speed : speed;
	}
}

function moveDifference(src,dest,speed){
	if(typeof dest.x !== 'undefined'){
		return {x:moveDirection(src.x,dest.x,speed),y:moveDirection(src.y,dest.y,speed)}
	}
}

function isset(v){
	return (typeof v !== 'undefined');
}
function Actor(scene,params,key){
	MoveableObject.call(this);
	this.prototype = new MoveableObject();
	this.speed = 2;
	this.orientation = 'down';
	this.moving = false;
	this.type = 'a';
	if(isset(params)){
		this.a = params.a;
		this.x = params.x;
		this.y = params.y;
		this.w = this.a.actions.stand.down[0].width;
		this.h = this.a.actions.stand.down[0].height;		
	
		this.hspot = {
			x0:this.x,
			y0:this.y,
			x1:this.x+this.w,
			y1:this.y+this.h,
			w:this.w,
			h:this.h,
			name:this.a.name
		};

		this.x = scene.orig.actors[key].x;
		this.y = scene.orig.actors[key].y;
		
	}

	this.spawn = function(layer){
		this.ctx = layer.ctx;
		if(!isset(this.a.path)){
			this.sprite = new SpriteBox(scene,layer,this.w,this.h,this.a.rgbBox);
		} else {
			this.sprite = new Sprite(scene,this,layer);
		}
		this.sprite.draw(this.x,this.y);
		activeSprites.push(this);
	}

	this.draw = function(){
		this.sprite.draw(this.x,this.y);
	}

}
function Dialog(s){
	this.tree = s;
	this.color = 'white';
	this.loader = new PxLoader();

	this.init = function(){
		this.canvas = $('<canvas></canvas>').attr({'id':'dialog','width':mainWidth,'height':sceneHeight}).css({'z-index':9});
		this.ctx = this.canvas[0].getContext('2d');
		this.ctx.font = '28px perfect_dos_vga_437regular';
		this.ctx.fillStyle = this.color;
		this.ctx.textAlign = 'center';
		this.ctx.fillText('', 0, 0);
		$('#container').append(this.canvas);
	}

	this.play = function(){
		var n = this.tree.length;
		var i = 0;
		var that = this;
		var curTime = 0;
		if(n == 0){
			console.log('No dialog attached to me')
		} else {
			this.write(this.tree[i]);
			for (var j = 0; j < n; j++) {
				curTime += (1000*that.tree[j].d);
				setTimeout(function() { 
					i++; 
					if (i < n) { 
						that.write(that.tree[i]); 
					} else {
						that.clear();
					}
				}, curTime);
			}
		}
	}

	this.write = function(o){
		this.clear();
		if(!isset(o.a)){
			x = mainWidth/2;
			y = 50;
		}
		this.ctx.fillText(o.t, x, y);
	}

	this.clear = function(){
		this.ctx.clearRect(0,0,mainWidth,sceneHeight);
	}

	this.init();
}
function Inventory(){
	this.items = {};
	this.textAction = 'Walk to ';
	this.target = '';
	this.init = function(){
		this.canvas = $('<canvas></canvas>').attr({'id':'inv','width':mainWidth,'height':invHeight}).css({'z-index':9000000,'top':mainHeight-invHeight});
		this.ctx = this.canvas[0].getContext('2d');
		this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
		this.ctx.fillRect(0, 0, mainWidth, invHeight);
		$('#container').append(this.canvas);
		return this;
	}

	this.updateInfoText = function(){
		var finalText = this.textAction+this.target;
		this.ctx.textAlign = 'center';
		this.ctx.fillStyle = 'white';
		this.ctx.font = "bold 16px Arial";
		this.ctx.fillText(finalText,mainWidth/2,20);
	}

	this.updateCanvas = function(){
		this.clear();
		this.draw();
	}

	this.draw = function(){
		this.updateInfoText();
	}

	this.clear = function(){
		this.ctx.clearRect(0,0,mainWidth,50);
		this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
		this.ctx.fillRect(0, 0, mainWidth, invHeight);
	}

	this.init();
}
function Layer(id,image,zindex,w,h){

	this.init = function(){
		this.id = id;
		this.canvas = $('<canvas></canvas>').attr({'id':id,'width':w,'height':h}).css({'z-index':zindex,'left':'0px'});
		this.ctx = this.canvas[0].getContext('2d');
		this.x = parseInt(this.canvas.css('left'));
		if(image !== 0){
			var bg = image;
			this.image = {
				x:0,
				y:0,
				src:bg,
				width:bg.width,
				height:bg.height
			};
			this.image.newDM = calculateAspectRatioFit(bg.width,bg.height,1000000000,sceneHeight);
			this.width = parseInt(this.image.newDM.width);
			this.height = parseInt(this.image.newDM.height);
			this.canvas.attr('width',this.width);
			this.draw(this.image.x,this.image.y);
		}
	}

	this.draw = function(x,y){
		var image = this.image;
		this.ctx.drawImage(image.src,0,0,image.width,image.height,x,y,image.newDM.width,image.newDM.height);
	}

	this.scroll = function(dest){
		var destX = dest.x;
		var calDest = moveDifference({x:0,y:0},{x:destX,y:0},4);
		var x = this.x+calDest.x;
		this.canvas.css('left',x+'px');
		this.x = parseInt(this.canvas.css('left'));
	}

	this.clear = function(){
		this.ctx.clearRect(0,0,mainWidth,mainHeight-invHeight);
	}

	this.init();
	return this;
}
function MoveableObject(){
	this.destX;
	this.destY;
	this.curDir = {};
	this.hspot;

	this.move = function(dt){
		if(this.moving){
			var src = {x:this.x,y:this.y};

			if(this.type == 'p'){
				this.destXs = this.destX - (this.sprite.w/2);
				this.destYs = this.destY - this.sprite.h;
			}

			var dest = {x:this.destXs,y:this.destYs};
			var calDest = moveDifference(src,dest,this.speed);

			if(!isset(this.curDir.x)){
				this.curDir.x = calDest.x;
				this.curDir.y = calDest.y;
			}
			calDest.x = (this.curDir.x !== calDest.x) ? 0 : calDest.x;
			calDest.y = (this.curDir.y !== calDest.y) ? 0 : calDest.y; 

			var newX = this.x+calDest.x;
			var newY = this.y+calDest.y;

			if(this.type == 'p' && this.scene.scrollable && !this.scene.moving){
				this.checkSceneEdge(newX,newY);
			}

			this.cX = calDest.x;
			this.cY = calDest.y;

			if(calDest.x !== 0 || calDest.y !== 0){
				this.sprite.clear();
				this.sprite.draw(newX, newY, this.curDir);
				this.zHandler();
				this.x = newX;
				this.y = newY;
			} else {
				delete this.curDir.x;
				delete this.curDir.y;
				this.moving = false;
				if(this.type == 'p'){
					for (var i = 0; i < activeTransporters.length; i++) {
						var t = activeTransporters[i];
						if(t.intent){
							t.transportMe();
						}
					}
				}
			}
		}
	}

	this.zHandler = function(){
		if(isset(this.scene)){
			var smallPoint = this.scene.horizonLine;
			var bt = this.sprite.getBottomPos(this.x,this.y);
			this.sprite.z = Math.abs(1-(bt.y/smallPoint));
		}
	}

}
function Player(scene,params,key){
	Actor.call(this);
	this.prototype = new Actor(scene,params,key);
	this.x = scene.spawnStart.x;
	this.y = scene.spawnStart.y;
	this.scene = scene;
	this.speed = 4;
	activePlayer = this;
	this.type = 'p';
	this.actor = playerSprite;
	this.init = function(){
		this.sprite = new Sprite(this.scene, this.actor, this.scene.playerLayer);
		this.sprite.draw(this.x,this.y);
		activeSprites.push(this);
	}

	this.checkSceneEdge = function(x,y){
		if(this.scene.x == 0 && (mainWidth - this.scene.padding) <= (this.sprite.x + this.sprite.w)){
			this.scene.moving = true;
			this.scene.scroll = 'r';
			if(debugMode){
				console.log('Scrolling scene right');
			}
			return true;
		} else if(this.scene.x < 0 && this.sprite.x <= ((scene.width-mainWidth)+this.scene.padding)) {
			this.scene.moving = true;
			this.scene.scroll = 'l';
			if(debugMode){
				console.log('Scrolling scene left');
			}
			return true;
		} else {
			return false;
		}
	}

	this.init();
}
function Scene(scene){
	this.layers = new Array();
	this.bgLayers = new Array();
	this.spriteLayers = new Array();
	this.transportLayers = new Array();
	this.transporters = new Array();
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
	
	this.init = function(){
		var that = this;
		this.preloadLayers();
		this.loader.addCompletionListener(function(e) {
			that.images.push(e.resource.img); 
			that.getLayers();
			that.padding = scene.largePadding;
			that.scrollable = (isset(scene.large) || !scene.large) ? true : false;
			that.persPoint = scene.persPoint;
			that.large = scene.large;
			if(isset(scene.persPoint)){
				that.horizonLine = ((mainHeight - invHeight) - scene.persPoint.y);
			}
		});
	}

	this.preloadLayers = function(){
		var json = scene.imageLayers;
		var ti = new Array();
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
			}
			this.layers.push(l);
			count++;
		}
		activeScene = this;
		this.getTransporters();
		this.getActors();
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

		$('canvas').not('#inv,#dialog').on('mouseout',function(e){
			Inventory.updateCanvas();
		});

		$('canvas').not('#inv,#dialog').on('mousemove',function(e){
			mousePos.x = e.offsetX;
			mousePos.y = e.offsetY;
			that.showHotspotText(mousePos, that.checkSpots);
		});
	}

	this.init();
}
function Sprite(scene, actor, layer){
	this.x;
	this.y;
	this.w;
	this.h;
	this.z;
	this.scene = scene;
	if (isset(actor) ) {
		this.layer = layer.ctx;
	};
	this.actor = actor;
	this.image = null;
	this.scaleDiff = 1;
	this.loaded = false;
	this.loader = new PxLoader();
	if(isset(actor.a)){
		var x = actor.x;
		var y = actor.y;
		this.actor = actor.a;
		this.actor.x = x;
		this.actor.y = y;
	} else {
		this.actor.x = scene.spawnStart.x;
		this.actor.y = scene.spawnStart.y;
	}
	
	this.direction = this.actor.actions.walk.down;
	this.directionFrameLenght = this.direction.length;
	this.directionFrameIndex = 0;
	this.UpdateDelayCount = 3;
	this.UpdateDelayIndex = 0;

	this.init = function(){
		var that = this;
		this.loader.addImage(this.actor.path);
		this.loader.start();
		this.loader.addCompletionListener(function(e) {
			that.image = e.resource.img;
			that.loaded = true;
			that.draw(that.actor.x, that.actor.y);
		});
	}

	this.handleZ = function(){
		if(this.z <= 0.95 && this.z >= 0.20){
			this.scaleDiff = this.z;
		} 
	}

	this.getBottomPos = function(x,y){
		var b = {};
		b.x = x + (this.w/2);
		b.y = y+this.h;
		return b;
	}

	this.updateDirectionFrameIndex = function(){
		if(this.UpdateDelayCount != this.UpdateDelayIndex){
			this.UpdateDelayIndex++;
			return;
		}

		if(this.directionFrameIndex >= this.directionFrameLenght - 1){
			this.directionFrameIndex = 0;
		}else{
			this.directionFrameIndex++;
		}

		this.UpdateDelayIndex = 0;
	}

	this.updateDirection = function(curDir){
		if( ! isset(curDir) ) return;

		switch (true) {
			case curDir.y < 0 && curDir.x > 0:
				this.direction = this.actor.actions.walk.up;
				break;
			case curDir.y > 0 && curDir.x < 0:
				this.direction = this.actor.actions.walk.down;
				break;
			case curDir.x > 0:
				this.direction = this.actor.actions.walk.right;
				break;
			case curDir.x < 0:
				this.direction = this.actor.actions.walk.left;
				break;
		}

	}

	this.draw = function(x, y, curDir){

		if(this.loaded){
			
			this.updateDirection(curDir);
			this.updateDirectionFrameIndex();

			var up = this.direction[ this.directionFrameIndex ];
			this.x = x;
			this.y = y;
			this.h = up.height;
			this.w = up.width;
			this.clear();
			this.layer.drawImage(this.image, up.x, up.y, up.width, up.height, this.x, this.y, up.width, up.height);
		}
	}

	this.clear = function() {
		var up = this.direction[ this.directionFrameIndex ];
		this.layer.clearRect(this.x, this.y, up.width, up.height);
	}

	this.init();
}
function SpriteBox(scene,layer,w,h,rgb){
	// Sprite.call(this);
	// this.prototype = new Sprite(scene);
	this.w = w;
	this.h = h;
	this.scene = scene;
	this.realH = h;
	this.realW = w;
	this.init = function(){
		this.ctx = layer.ctx;
		this.ctx.fillStyle = rgb;
	}

	this.draw = function(x,y){
		// this.getBottomPos();
		// this.handleZ();
		this.x = x;
		this.y = y;
		this.h = parseInt(this.realH*this.scaleDiff);
		this.w = parseInt(this.realW*this.scaleDiff);		
		this.ctx.fillRect(this.x,this.y,this.w,this.h);
	}

	this.clear = function(){
		this.ctx.clearRect(this.x,this.y,this.w,this.h);
	}

	this.init();
}
function Transporter(param,scene,layer){
	this.destX;
	this.destY;
	this.curDir = {};
	this.speed = 4;
	this.moving = false;
	this.intent = false;
	this.type = 't';

	this.init = function(param){		
		this.x = param.x;
		this.y = param.y;
		this.origX = this.x;
		this.origY = this.y;
		this.w = param.w;
		this.h = param.h;
		this.title = param.title;
		this.moving = false;
		this.hspot = {
			x0:this.x,
			y0:this.y,
			x1:this.x+this.w,
			y1:this.y+this.h,
			w:this.w,
			h:this.h,
			name:this.title
		};
		if(debugMode){
			var rgb = "rgba(55,55,244,0.5)";
		} else {
			var rgb = "rgba(55,55,244,0)";
		}
		this.sprite = new SpriteBox(scene,layer,this.w,this.h,rgb);
		this.sprite.draw(this.x,this.y);
	}

	this.transportMe = function(){
		World.changeScene(param.link);
		this.intent = false;
	}

	this.init(param);
}
function World(){
	this.locations = world;

	this.changeScene = function(ns){
		activeScene.hide();
		var newScene = new Scene(this.locations[ns]);
		newScene.show();
	}
}
var greenguy = {
	name:"Dat Green Guy",
	rgbBox:"rgb(23,227,70)",
	w:100,
	h:100
};
var luigi = {
	name: 'luigi',
	path: 'assets/actors/luigi/luigi.png',
	actions: {
		walk: {
			up:[
				{ width: 20, height: 33, x: 3, y: 123 },
				{ width: 22, height: 36, x: 31, y: 120 },
				{ width: 20, height: 33, x: 61, y: 123 },
			],
			down:[
				{ width: 23, height: 35, x: 3, y: 2 },
				{ width: 22, height: 37, x: 31, y: 0 },
				{ width: 23, height: 35, x: 58, y: 2 },
			],
			right:[
				{ width: 21, height: 36, x: 3, y: 81 },
				{ width: 19, height: 37, x: 32, y: 80 },
				{ width: 22, height: 36, x: 59, y: 81 },
			],
			left:[
				{ width: 22, height: 36, x: 3, y: 41 },
				{ width: 19, height: 37, x: 33, y: 40 },
				{ width: 21, height: 36, x: 60, y: 41 },
			],
		},
		stand: {
			up:[
				{ width: 22, height: 36, x: 31, y: 120 },
			],
			down:[
				{ width: 22, height: 37, x: 31, y: 0 },
			],
			right:[
				{ width: 19, height: 37, x: 32, y: 80 },
			],
			left:[
				{ width: 19, height: 37, x: 33, y: 40 },
			],
		},
	}
};
var mario = {
	name: 'mario',
	path: 'assets/actors/mario/mario.png',
	actions: {
		walk: {
			up:[
				{ width: 20, height: 33, x: 3, y: 123 },
				{ width: 22, height: 36, x: 31, y: 120 },
				{ width: 20, height: 33, x: 61, y: 123 },
			],
			down:[
				{ width: 23, height: 35, x: 3, y: 2 },
				{ width: 22, height: 37, x: 31, y: 0 },
				{ width: 23, height: 35, x: 58, y: 2 },
			],
			right:[
				{ width: 21, height: 36, x: 3, y: 81 },
				{ width: 19, height: 37, x: 32, y: 80 },
				{ width: 22, height: 36, x: 59, y: 81 },
			],
			left:[
				{ width: 22, height: 36, x: 3, y: 41 },
				{ width: 19, height: 37, x: 33, y: 40 },
				{ width: 21, height: 36, x: 60, y: 41 },
			],
		},
		stand: {
			up:[
				{ width: 22, height: 36, x: 31, y: 120 },
			],
			down:[
				{ width: 22, height: 37, x: 31, y: 0 },
			],
			right:[
				{ width: 19, height: 37, x: 32, y: 80 },
			],
			left:[
				{ width: 19, height: 37, x: 33, y: 40 },
			],
		},
	}
};
var new_guy = {
	name:"Dat New Guy",
	rgbBox:"rgb(43,227,70)",
	w:50,
	h:50
};
var introDialog = 
[
	{
		t:'Welcome to ScummVM-clone',
		d:3
	},
	{
		t:'This is a work in progress, so expect literally nothing',
		d:3
	},
	{
		t:'But at least this little dialog works pretty well right?',
		d:4
	},
	{
		t:'Everything here is brought to the engine via JSON',
		d:3
	},
	{
		t:'At least that\'s the idea',
		d:1.5
	},
	{
		t:'Anyways, Enjoy!',
		d:3
	}
]
var mi1Street = {
	imageLayers:[
		{
			type:'bg',
			image:'assets/scenes/mi1street/street.png'
		},
		{
			type:'transporter'
		},
		{
			type:'transporter'
		},
		{
			type:'player'
		},
		{
			type:'sprite'
		}
	],
	large:1,
	largePadding:40,
	persPoint:
	{
		x:579,
		y:259
	},
	transporters:[
		{
			x:830,
			y:250,
			w:45,
			h:70,
			title:"SCUMM Bar",
			link:1
		},
		{
			x:344,
			y:254,
			w:20,
			h:30,
			title:"Test Room",
			link:2
		}
	],
	actors:[
		{
			a:mario,
			t:'p',
			x:600,
			y:300
		},
		{
			a:luigi,
			t:'n',
			x:158,
			y:370
		}
	]
};
var scummbar = {
	imageLayers:[
		{
			type:'bg',
			image:'assets/scenes/scummbar/scummbar.png'
		},
		{
			type:'transporter'
		},
		{
			type:'player'
		},
		{
			type:'sprite'
		}
	],
	spawnStart:{
		x:170,
		y:300
	},
	large:2,
	largePadding:10,
	transporters:[
		{
			x:117,
			y:280,
			w:140,
			h:180,
			title:"Outside",
			link:0
		}
	],
	actors:[
		{
			a:mario,
			t:'p',
			x:600,
			y:300
		}
	]
};
var test_room = {
	imageLayers:[
		{
			type:'bg',
			image:'assets/scenes/test_room/test_bg.jpg'
		},
		{
			type:'transporter'
		},
		{
			type:'player'
		},
		{
			type:'sprite'
		}
	],
	spawnStart:{
		x:600,
		y:300
	},
	large:1,
	largePadding:40,
	transporters:[
		{
			x:40,
			y:330,
			w:45,
			h:70,
			title:"Street",
			link:0
		}
	],
	actors:[
		{
			a:new_guy,
			x:158,
			y:370
		}
	]
};
var world = new Array();
world[0] = 	mi1Street;
world[1] = 	scummbar;
world[2] = 	test_room;
var mainWidth = 1024;
var mainHeight = 768;
var invHeight = 250;
var sceneHeight = mainHeight - invHeight;

playerSprite = mario;

var debugMode = true;

var Inventory = new Inventory();
var World = new World();

var introDialog = new Dialog(introDialog);
var MI1City = new Scene(mi1Street);

mainPreloader.addCompletionListener(function(e) {
	MI1City.show();
	introDialog.play();
});
 });