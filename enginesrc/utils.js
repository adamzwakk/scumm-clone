function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
	var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
	return { width: srcWidth*ratio, height: srcHeight*ratio };
}

function timestamp() {
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function moveDirection(num1,num2,speed){
	if(!isset(num1) || !isset(num2)){
		return 0;
	} else {
		return (num1 > num2) ? -speed : speed;
	}
}

function moveDifference(src,dest,speed){
	if(typeof dest.x !== 'undefined'){
		return {x:moveDirection(src.x,dest.x,speed),y:moveDirection(src.y,dest.y,speed)}
	}
}

function isset(v){
	return (typeof v !== 'undefined');
}