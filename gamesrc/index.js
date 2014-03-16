var mainWidth = 1024;
var mainHeight = 768;
var invHeight = 250;
var sceneHeight = mainHeight - invHeight;

var debugMode = true;

var Inventory = new Inventory();
var World = new World();

var introDialog = new Dialog(introDialog);
var MI1City = new Scene(mi1Street);

mainPreloader.addCompletionListener(function(e) {
	MI1City.show();
	introDialog.play();
});