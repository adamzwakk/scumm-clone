function Inventory(){
	this.items = {};
	this.textAction = 'Walk to ';
	this.possibleActions = new Array('walk','pick up','talk');
	this.target = '';
	this.actionWidth = mainWidth/2;
	this.invTop = mainHeight-invHeight;
	this.actionArea = {};
	this.init = function(){
		this.canvas = $('<canvas></canvas>').attr({'id':'inv','width':mainWidth,'height':invHeight}).css({'z-index':9,'top':this.invTop});
		this.ctx = this.canvas[0].getContext('2d');
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, mainWidth, invHeight);
		$('#container').append(this.canvas);
		this.setupActions();
		return this;
	}

	this.setupActions = function(){
		this.actionArea.canvas = $('<canvas></canvas>').attr({'id':'actions','width':this.actionWidth,'height':invHeight}).css({'z-index':10,'top':this.invTop});
		this.actionArea.ctx = this.actionArea.canvas[0].getContext('2d');
		$('#container').append(this.actionArea.canvas);
		var startX = 20;
		var startY = 20;
		var w = 150;
		var h = 60;
		for (var i = 0; i < this.possibleActions.length; i++) {
			var pa = this.possibleActions[i];
			var a = new Action(w,h,pa,i,this.actionArea);
			a.draw(startX,startY);
			if(i % 3 === 0 && i != 0){
				startY += h+startY;
				startX = 20;
			} else {
				startX += w+startX;
			}
			
		};
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
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, mainWidth, invHeight);
	}

	this.init();
}