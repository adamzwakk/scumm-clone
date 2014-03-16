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