function Inventory(){
	this.items = {};
	this.textAction = 'Walk to ';
	this.target = '';
	this.init = function(){
		this.canvas = $('<canvas></canvas>').attr({'id':'inv','width':mainWidth,'height':invHeight}).css({'z-index':9000000,'top':mainHeight-invHeight});
		this.ctx = this.canvas[0].getContext('2d');
		this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
		this.ctx.fillRect(0, 0, mainWidth, invHeight);
		$('#container').append(this.canvas);
		return this;
	}

	this.updateInfoText = function(){
		var finalText = this.textAction+this.target;
		this.ctx.textAlign = 'center';
		this.ctx.fillStyle = 'white';
		this.ctx.font = "bold 16px Arial";
		this.ctx.fillText(finalText,mainWidth/2,20);
	}

	this.updateCanvas = function(){
		this.clear();
		this.draw();
	}

	this.draw = function(){
		this.updateInfoText();
	}

	this.clear = function(){
		this.ctx.clearRect(0,0,mainWidth,50);
		this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
		this.ctx.fillRect(0, 0, mainWidth, invHeight);
	}

	this.init();
}