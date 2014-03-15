function Dialog(s){
	this.tree = s;
	this.color = 'white';
	this.loader = new PxLoader();
	this.curPos = 0;

	this.init = function(){
		this.canvas = $('<canvas></canvas>').attr({'id':'dialog','width':mainWidth,'height':sceneHeight}).css({'z-index':9000000});
		this.ctx = this.canvas[0].getContext('2d');
		this.ctx.font = '28px perfect_dos_vga_437regular';
		this.ctx.fillStyle = this.color;
		this.ctx.textAlign = 'center';
		$('#container').append(this.canvas);
	}

	this.write = function(){
		var o = this.tree[this.curPos];
		if(!isset(o.a)){
			x = mainWidth/2;
			y = 50;
		}
		this.ctx.fillText(o.t, x, y);
	}

	this.init();
}