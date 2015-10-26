var haloObj = function(){
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
}
haloObj.prototype.num = 5;
haloObj.prototype.init = function(){
	for(var i=0; i<this.num; i++){
		this.x[i] = 0;
		this.y[i] =0;
		this.alive[i] = false;
		this.r[i] =0;
	}

}
haloObj.prototype.draw = function(){

	context1.save();
    context1.lineWidth = 1;
    context1.shadowBlur = 10;
    context1.shadowColor = "rgba(203,91,0,0.5)";
	for(var i=0; i<this.num; i++){

		if(this.alive[i] == true){
			// draw
			this.r[i] += deltaTime*0.03;
			if(this.r[i] > 150){
				this.alive[i] = false;
				break;
			}
			var alpha = 1-this.r[i]/80;

			context1.beginPath();
			context1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			context1.closePath();
			context1.strokeStyle = "rgba(255,153,0,"+alpha+")";
			context1.stroke();
		}
	}
	context1.restore();
}

haloObj.prototype.born = function(x,y){

	for(var i=0; i<this.num; i++){
		if(this.alive[i] == false){
			this.x[i] = x;
			this.y[i] = y;
			this.alive[i] = true;
			this.r[i] = 10;
		}
	}

}