var dustObj = function(){
	this.x = [];
	this.y = [];
	this.amp = [];
	this.NUM = [];
	this.beta;

}
dustObj.prototype.num = 30;
dustObj.prototype.init = function(){
	for(var i=0; i<this.num; i++){
		this.x[i] = Math.random()*canvas1.width;
		this.y[i] = Math.random()*canvas1.height;
		this.amp[i] = Math.random()*15+30;
		this.NUM[i] = Math.floor(Math.random()*7);
	}
	    this.beta = 0;
}
dustObj.prototype.draw = function(){
	this.beta += deltaTime*0.0004;
	var l = Math.sin(this.beta);

	for (var i = 0; i < this.num; i++) {
		var Num = this.NUM[i];
		context1.drawImage(dustPic[Num],this.x[i]+this.amp[i]*l,this.y[i]);
	}
}