function Layer(id){
	this.canvas = $('<canvas></canvas>').attr({'id':id,'width':1024,'height':768});
	this.ctx = this.canvas[0].getContext('2d');
	$('#container').append(this.canvas);
	return this;
}