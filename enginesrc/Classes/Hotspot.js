function Hotspot(w,h,x,y,name){
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
		this.instanceKey = Hotspot.allInstances.push(this)-1;
	}

	this.remove = function(){
		delete Hotspot.allInstances[this.instanceKey];
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