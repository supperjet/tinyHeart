var aneObj = function(){

	// start point ,control point ,end point(sin控制)
	this.rootX = [];
	this.headX = [];
	this.headY = [];

	// 定义sin的角度
	this.beta = 0;
	// 定义振幅
	this.amp = [];
}

aneObj.prototype.num = 50;
aneObj.prototype.init = function(){
	for(var i=0; i<this.num; i++){
		this.rootX[i] = i*20 + Math.random()*20;
		this.headX[i] = this.rootX[i];
		this.headY[i] = canvas2.height-220+Math.random()*50;
		this.amp[i] = Math.random()*20+40;
	}

}
aneObj.prototype.draw = function(){

    // var color = ["#3b154e","red","orange","green","blue","purple"];


    // save(),restore()的作用是指中间那段代码的定义只在这两个函数之间起作用，
    // 一旦出了restore，就会被回复称原来的样式
     context2.save();
     this.beta += deltaTime*0.0004;
     var l = Math.sin(this.beta);// [-1,1]

    // 设置全局透明度
     context2.globalAlpha = 0.6;
     context2.lineWidth = 20;
	 context2.lineCap = "round";
	 context2.strokeStyle ="#3b154e";
	 // context2.strokeStyle = color[Math.floor(Math.random()*color.length)];

	for(var i=0; i<this.num; i++){
		context2.beginPath();
		context2.moveTo(this.rootX[i],canvas2.height);
		this.headX[i] = this.rootX[i] + l*this.amp[i];
		context2.quadraticCurveTo(this.rootX[i],canvas2.height-120,this.headX[i],this.headY[i]);
		context2.stroke();
	}

	context2.restore();
}