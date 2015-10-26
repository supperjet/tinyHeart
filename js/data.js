var dataObj = function(){
	this.fruitNum = 0;
	this.double = 1;
	this.score = 0;
	this.gameOver = false;
	this.alpha = 0;
}
dataObj.prototype.reset = function(){
	this.fruitNum = 0;
	this.double = 1;
}
dataObj.prototype.draw = function(){
	var w = canvas1.width;
	var h = canvas1.height;
	
	context1.fillStyle = "white";
	context1.font = "28px Verdana";
	context1.textAlign = "center";
	context1.shadowBlur = 10;
    context1.shadowColor = "white";

	/*context1.fillStyle = "white";
	context1.font = "20px Verdana";
	context1.textAlign = "left";
	context1.fillText("fruit : "+this.fruitNum, w*0.1-30,50);
	context1.fillText("double : "+this.double,w*0.1-30,80);*/
	context1.fillText("score "+this.score,w*0.5,60);


     context1.save();
	// 当gameOver=true时画出GAME OVER
	if(this.gameOver){
		// 让GAME OVER随着透明度逐渐显示
		this.alpha += deltaTime*0.0001;
		if(this.alpha > 1) this.alpha =1;
		context1.fillStyle = "rgba(255,255,255,"+this.alpha+")";
		context1.fillText("Baby Die",w*0.5,h*0.5);
	}
	context1.restore();
}

dataObj.prototype.addScore = function(){
	this.score += this.fruitNum*10*this.double;
	this.fruitNum = 0;
	this.double = 1;
}