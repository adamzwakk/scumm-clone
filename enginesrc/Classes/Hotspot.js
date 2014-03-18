function Hotspot(w,h,x,y,name,bm){
	this.init = function(){
		this.w = w;
		this.h = h;
		this.x0 = x;
		this.x1 = this.x0+this.w;
		this.y0 = y;
		this.y1 = this.y0+this.h;
		if(isset(name)){
			this.name = name;
		}
		if(isset(bm) && bm){
			this.bm = {};
			this.bm.x = (x+(this.w/2));
			this.bm.y = y+this.h;
		}
		this.instanceKey = Hotspot.allInstances.push(this)-1;
	}

	this.remove = function(){
		Hotspot.allInstances.splice(this.instanceKey,1);
	}

	this.updatePos = function(w,h,x,y){
		this.w = w;
		this.h = h;
		this.x0 = x;
		this.x1 = this.x0+this.w;
		this.y0 = y;
		this.y1 = this.y+this.h;
	}

	this.init();
}

Hotspot.allInstances = new Array();