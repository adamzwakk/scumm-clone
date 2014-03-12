function Inventory(){
	this.items = {};
	this.init = function(){
		this.canvas = $('<canvas></canvas>').attr({'id':'inv','width':mainWidth,'height':invHeight}).css({'z-index':9000000,'top':mainHeight-invHeight});
		this.ctx = this.canvas[0].getContext('2d');
		this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
		this.ctx.fillRect(0, 0, mainWidth, invHeight);
		$('#container').append(this.canvas);
		return this;
	}

	this.init();
}