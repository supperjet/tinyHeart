var momObj = function(){
	this.x;
	this.y;
	this.angle;
	this.bigEye = new Image();
	this.bigBody = new Image();
	this.bigTail = new Image();

	// 定义momTailTimer,momEyeTimer,momBodyTimer,
	// momTailCount,momEyeCount,momBodyCount
	this.momTailTimer = 0;
	this.momTailCount = 0;

	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;

	// momBodyCount
	this.momBodyCount = 0;


}

momObj.prototype.init = function(){
	this.x = canvas1.width/2;
	this.y = canvas1.height/2;
	this.angle = 0;
	// this.bigEye.src = "./src/bigEye0.png";
	// this.bigBody.src = "./src/bigSwim0.png";
	// this.bigTail.src =  "./src/bigTail0.png";
}

momObj.prototype.draw = function(){

	/*lerp x y
	function lerpDistance(aim, cur, ratio) {
	var delta = cur - aim;
	return aim + delta * ratio;
    }*/

    this.x = lerpDistance(mx,this.x,0.95);
    this.y = lerpDistance(my,this.y,0.95);

    // delta angle
    // Math.atan(y,x);
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY,deltaX)+Math.PI;

    /*// lerp angle
    function lerpAngle(a, b, t) {
	var d = b - a;
	if (d > Math.PI) d = d - 2 * Math.PI;
	if (d < -Math.PI) d = d + 2 * Math.PI;
	return a + d * t;
}*/
   this.angle = lerpAngle(beta,this.angle,0.1);


   // momFish tail count
   this.momTailTimer += deltaTime;
   if(this.momTailTimer > 50){
   	this.momTailCount = (this.momTailCount + 1)%8;
   	this.momTailCount %= 50;
   }

   // momFish Eye count
   this.momEyeTimer += deltaTime;
   if(this.momEyeTimer > this.momEyeInterval){
   	 this.momEyeCount = (this.momEyeCount + 1)%2;
   	 this.momEyeTimer %= this.momEyeInterval;

   	 if(this.momEyeCount == 0){
   	 	this.momEyeInterval = Math.random()*3500 + 1500;
   	 }else{
   	 	this.momEyeInterval = 200;
   	 }

   }

    // cxt
	context1.save();
	// 将坐标原点移动到this.x this.y处
	context1.translate(this.x,this.y);
	// 旋转画布
	context1.rotate(this.angle);
	// body
    var momBodyCount = this.momBodyCount;
    // 使用double判断绘制body的颜色
    if(data.double == 1){
    	// 绘制橙色body
    	context1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width/2,-momBodyOra[momBodyCount].height/2);
    }else{
    	context1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width/2,-momBodyBlue[momBodyCount].height/2);
    }
    // tail
	var momTailCount = this.momTailCount;
	context1.drawImage(momTail[momTailCount],-momTail[momTailCount].width/2+30,-momTail[momTailCount].height/2);
    // eye
	var momEyeCount = this.momEyeCount;
	context1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width/2,-momEye[momEyeCount].height/2);
	
	context1.restore();
}