var fruitObj = function(){
	this.alive = [];//boolean
	this.x = [];
	this.y = [];
	this.l = [];
	this.speed = [];
	this.fruitType = [];
	this.aneNo = [];

	this.orange = new Image();
	this.blue = new Image();

}

fruitObj.prototype.num = 50;
fruitObj.prototype.init = function(){
	for(var i=0; i<this.num; i++){
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.fruitType[i] = "";
		this.aneNo[i] = 0;

		// 每个果实都有不同的速度
		this.speed[i] = Math.random()*0.005+0.008;
	}
	this.orange.src="./src/fruit.png";
	this.blue.src="./src/blue.png";


}
fruitObj.prototype.draw = function(){
	for(var i=0; i<this.num; i++){
		// draw
		// find an ane ,grow ,fly up
		if (this.alive[i]) {
			// 判断画什么颜色的果实
			if(this.fruitType[i] == "blue"){
				var pic = this.blue;
			}else{
				var pic = this.orange;
			}
        // 设置生长的速度和上浮的速度
		   if(this.l[i] <= 14){ //grow
		   	this.x[i] = ane.headX[this.aneNo[i]];
		   	this.y[i] = ane.headY[this.aneNo[i]];
			this.l[i] += this.speed[i]*0.5*deltaTime;
			context2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i])
		   }else{
			this.y[i] -= this.speed[i]*3*deltaTime;
			context2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
		  }
        // 并判断果实的生存状态
		   if(this.y[i] < 10){
			  this.alive[i] = false;
		   }
		}

	}

}

// 寻找果实的画图位置
fruitObj.prototype.born = function(i){
	this.aneNo[i] = Math.floor(Math.random()*ane.num);
	this.l[i] = 0;
	this.alive[i] = true;

	var ran = Math.random();
	if(ran < 0.1){
		this.fruitType[i] = "blue";
	}else{
		this.fruitType[i] = "orange";
	}

}

fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}

// 监测屏幕上的果实数量
function fruitMonitor(){
	var num = 0;
	for(var i =0 ;i<fruit.num; i++){
		if(fruit.alive[i]) num++;
	}
	if(num<15){
		sendFruit();// send fruit
		return;

	}
}

function sendFruit(){
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}

