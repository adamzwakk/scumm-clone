var now,
	dt   = 0,
    last = timestamp(),
    step = 1/60;

var activeScene;
var activePlayer = {};
var playerSprite;
var activeSprites = new Array();
var activeTransporters = new Array();
var activeItems = new Array();
var playerDest;
var mousePos = {};
var mainPreloader = new PxLoader();
mainPreloader.addImage('fonts/perfectdos-webfont.eot');
mainPreloader.addImage('fonts/perfectdos-webfont.woff');
mainPreloader.addImage('fonts/perfectdos-webfont.ttf');
mainPreloader.addImage('fonts/perfectdos-webfont.svg#perfect_dos_vga_437regular');
mainPreloader.start();

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
	if(isset(activeScene)){
		activeScene.move();
	}
	Inventory.updateCanvas();
}

requestAnimationFrame(frame);