var now,
	dt   = 0,
    last = timestamp(),
    step = 1/60;

var activeScene;
var activePlayer;
var activeSprites = new Array();
var activeTransporters = new Array();
var eventLayer;

function frame() {
	now = timestamp();
	dt = dt + Math.min(1, (now - last) / 1000);
	render(dt);
	last = now;
	requestAnimationFrame(frame);
}

function render(){
	for (var i = 0; i < activeSprites.length; i++) {
		activeSprites[i].move(dt);
	};
	for (var i = 0; i < activeTransporters.length; i++) {
		activeTransporters[i].move();
	};
	activeScene.move();
}

requestAnimationFrame(frame);