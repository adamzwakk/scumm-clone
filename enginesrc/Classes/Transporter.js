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

	this.checkClick = function(e){
		if(this.x <= e.offsetX && e.offsetX <= (this.x+this.w) && this.y <= e.offsetY && e.offsetY <= (this.y+this.h)){
			if(debugMode){
				console.log('Clicked Transporter for '+this.title);
			}
			this.intent = true;
		} else {
			this.intent = false;
		}
	}

	this.withinPadding = function(a){
		return (a.x >= this.hspot.x0-this.padding || a.x <= this.hspot.x1+this.padding);
	}

	this.transportMe = function(){
		World.changeScene(param.link);
		this.intent = false;
	}

	this.init(param);
}