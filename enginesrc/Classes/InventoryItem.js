function InventoryItem(item,l){
	this.pickedUp;
	this.image;
	this.intent = false;

	this.x = item.x;
	this.y = item.y;
	this.w = item.i.w;
	this.h = item.i.h;
	this.layer = l;
	this.name = item.i.name;
	this.hspot = new Hotspot(this.w,this.h,this.x,this.y,item.i.name);

	this.spawn = function(){
		this.layer.ctx.drawImage(this.image, 0, 0, this.w, this.h, this.x, this.y, this.w, this.h);
	}

	this.withinPadding = function(a){
		return (a.x1 >= this.hspot.x0 || a.x0 <= this.hspot.x1)
	}

	this.checkClick = function(e){
		if(this.x <= e.offsetX && e.offsetX <= (this.x+this.w) && this.y <= e.offsetY && e.offsetY <= (this.y+this.h)){
			if(debugMode){
				console.log('Clicked Item '+this.name);
			}
			this.intent = true;
		} else {
			this.intent = false;
		}
	}

	this.pickMeUp = function(){
		this.hspot.removeFromScene();
		Inventory.addItem(this);
	}

	this.drawInv = function(w,h,x,y){
		this.layer.ctx.drawImage(this.image, 0, 0, this.w, this.h, x, y, w, h);
		this.hspot = new Hotspot(w,h,x,y,item.i.name,false,true);
	}
}