function Inventory(){
	this.items = {};
	this.possibleActions = new Array('Walk to ','Pick Up ','Talk To ');
	this.textAction = this.possibleActions[0];
	this.target = '';
	this.actionWidth = mainWidth/2;
	this.invTop = mainHeight-invHeight;
	this.actionArea = {};
	this.actions = new Array();

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
		var that = this;
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
			this.actions.push(a);
			if(i % 3 === 1 && i != 0){
				startY += h+startY;
				startX = 20;
			} else {
				startX += w+startX;
			}	
		}

		$('canvas#actions').on('click',function(e){
			for (var i = 0; i < that.actions.length; i++) {
				var h = that.actions[i];
				if(h.mouseOn(e)){
					that.textAction = h.hspot.name;
					break;
				} else {
					that.textAction = that.possibleActions[0];
				}
			};	
		});

		$('canvas#actions').on('mousemove',function(e){
			for (var i = 0; i < that.actions.length; i++) {
				var h = that.actions[i];
				if(h.mouseOn(e)){
					h.color = h.hoverColor;
					h.clear();
					h.draw(h.x,h.y);
				} else {
					h.color = h.normalColor;
					h.clear();
					h.draw(h.x,h.y);
				}
			};	
		});
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