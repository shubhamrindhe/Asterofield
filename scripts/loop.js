
function astrofield(){
	animLoopReqID = window.requestAnimationFrame(astrofield);
	ctx.clearRect(0, 0, canvas.width, canvas.height); 
	
	
	ctx.save();
	ctx.translate(canvas.width/2,canvas.height/2);
	Star.updateAll(ctx);
	ctx.restore();
	glitch("ASTEROFIELD",canvas.width/2,canvas.height/2-50,10,50,0.025);
	initiate.text('Press Enter to Start !',true);
}