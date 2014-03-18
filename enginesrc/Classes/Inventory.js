function Inventory(){
	this.items = new Array();
	this.possibleActions = new Array('Walk to ','Pick Up ','Talk To ', 'Use ');
	this.textAction = this.possibleActions[0];
	this.target = '';
	this.actionWidth = mainWidth/2;
	this.invTop = mainHeight-invHeight;
	this.textHeight = 30;
	this.areasYStart = sceneHeight+this.textHeight;
	this.actionArea = {};
	this.itemArea = {};
	this.actions = new Array();
	

	this.init = function(){
		this.canvas = $('<canvas></canvas>').attr({'id':'inv','width':mainWidth,'height':invHeight}).css({'z-index':9,'top':this.invTop});
		this.ctx = this.canvas[0].getContext('2d');
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, mainWidth, invHeight);
		$('#container').append(this.canvas);
		this.setupActions();
		this.setupItemGrid();
		return this;
	}

	this.setupActions = function(){
		var that = this;
		this.actionArea.canvas = $('<canvas></canvas>').attr({'id':'actions','width':this.actionWidth,'height':invHeight}).css({'z-index':10,'top':this.areasYStart});
		this.actionArea.ctx = this.actionArea.canvas[0].getContext('2d');
		$('#container').append(this.actionArea.canvas);
		var startX = 10;
		var startY = 10;
		var w = 150;
		var h = 60;
		for (var i = 0; i < this.possibleActions.length; i++) {
			var pa = this.possibleActions[i];
			var a = new Action(w,h,pa,i,this.actionArea);
			a.draw(startX,startY);
			this.actions.push(a);
			if(i % 3 === 1 && i != 0){
				startY += h+startY;
				startX = 10;
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
					h.draw(h.x,h.y);
				} else {
					h.color = h.normalColor;
					h.draw(h.x,h.y);
				}
			};	
		});
	}

	this.setupItemGrid = function(){
		var that = this;
		this.itemArea.canvas = $('<canvas></canvas>').attr({'id':'invItems','width':this.actionWidth,'height':invHeight}).css({'z-index':10,'top':this.areasYStart,'left':this.actionWidth});
		this.itemArea.ctx = this.itemArea.canvas[0].getContext('2d');
		$('#container').append(this.itemArea.canvas);

		$('canvas#invItems').on('click',function(e){
			//nothing yet
		});

		$('canvas#invItems').on('mousemove',function(e){
			for (var i = 0; i < that.items.length; i++) {
				var it = this.items[i];
			};
		});
	}

	this.addItem = function(i){
		this.items.push(i);
		i.layer.canvas.remove();
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

	this.drawItems = function(){
		var ctx = this.itemArea.ctx;
		var startX = 10;
		var startY = 10;
		var w = 150;
		var h = 80;
		for (var i = 0; i < 6; i++) {
			ctx.beginPath();
			ctx.rect(startX,startY,w,h);
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'lightblue';
			ctx.stroke();

			if(isset(this.items[i])){
				var it = this.items[i];
				it.layer = this.itemArea;
				it.drawInv(w,h,startX,startY);
			}

			if(i && i%2 === 0){
				startY += h+10;
				startX = 10;
			} else {
				startX += w+10;
			}
		}
	}

	this.draw = function(){
		this.updateInfoText();
		this.drawItems();
	}

	this.clear = function(){
		this.ctx.clearRect(0,0,mainWidth,this.textHeight);
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, mainWidth, invHeight);

		this.itemArea.ctx.clearRect(0,0,mainWidth,this.textHeight);
		this.itemArea.ctx.fillStyle = "black";
		this.itemArea.ctx.fillRect(0, 0, mainWidth, invHeight);
	}

	this.init();
}