function InventoryItem(item,l){
	this.pickedUp;
	this.image;

	this.x = item.x;
	this.y = item.y;
	this.w = item.i.w;
	this.h = item.i.h;
	this.layer = l;
	this.hspot = {
		x0:this.x,
		y0:this.y,
		x1:this.x+this.w,
		y1:this.y+this.h,
		w:this.w,
		h:this.h,
		name:item.i.name
	};

	this.spawn = function(){
		this.layer.ctx.drawImage(this.image, 0, 0, this.w, this.h, this.x, this.y, this.w, this.h);
	}
}