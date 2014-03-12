function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
	var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
	return { width: srcWidth*ratio, height: srcHeight*ratio };
}

function timestamp() {
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function difference(num1,num2){
	return (num1 > num2)? num1-num2 : num2-num1
}

function calculateDelta(src,dest){
	if(typeof dest.x !== 'undefined'){
		return {x:difference(src.x,dest.x),y:difference(src.y,dest.y)}
	}
}