function Transporter(param,scene,layer){
	this.intent = false;
	this.type = 't';
	this.padding = 20;

	this.init = function(param){		
		this.x = param.x;
		this.y = param.y;
		this.w = param.w;
		this.h = param.h;
		this.title = param.title;
		this.hspot = new Hotspot(this.w,this.h,this.x,this.y,this.title,true);

		if(debugMode){
			var rgb = "rgba(55,55,244,0.5)";
		} else {
			var rgb = "rgba(55,55,244,0)";
		}
		this.sprite = new SpriteBox(scene,layer,this.w,this.h,rgb);
		this.sprite.draw(this.x,this.y);
	}

	this.checkClick = function(e){
		var s = this.hspot;
		if(this.x-this.padding <= e.offsetX && e.offsetX <= (this.x+(this.w+this.padding)) && this.y-this.padding <= e.offsetY && e.offsetY <= (this.y+(this.h+this.padding))){
			if(debugMode){
				console.log('Clicked Transporter for '+this.title);
			}
			if(activeScene.walkLayer.isPointInPath(s.x0,s.y1) || activeScene.walkLayer.isPointInPath(s.x1,s.y1)){
				playerDest.x = this.hspot.bm.x;
				playerDest.y = this.hspot.bm.y;
			}
			this.intent = true;
		} else {
			this.intent = false;
		}
	}

	this.withinPadding = function(a){
		return (a.x1 >= this.hspot.x0 || a.x0 <= this.hspot.x1)
	}

	this.transportMe = function(){
		World.changeScene(param.link);
		this.intent = false;
	}

	this.init(param);
}