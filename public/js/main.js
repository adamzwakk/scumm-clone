$(document).ready(function(){ 
var mainWidth = 1024;
var mainHeight = 768;
function Layer(id){
	this.canvas = $('<canvas></canvas>').attr({'id':id,'width':1024,'height':768});
	this.ctx = this.canvas[0].getContext('2d');
	$('#container').append(this.canvas);
	return this;
}
function Scene(layers){
	this.layers = array();
	function init(){
		for (var i = 0; i < layers; i++) {
			var l = new Layer()
		}
	}



	this.init();
}
var mi1Street = {
	imageLayers:{
		0:{
			image:'mi1street/mi1street.png'
		}
	},
	persPoint:{
		x:160,
		y:70
	}
};
var MI1City = new Scene(mi1Street);
 });