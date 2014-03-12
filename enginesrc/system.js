var now,
	dt   = 0,
    last = timestamp(),
    step = 1/60;

var activeScene;
var activePlayer;
var activeSprites = new Array();

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
	activeScene.move();
}

requestAnimationFrame(frame);