var babyObj = function(){
	this.x;
	this.y;
	this.angle;
	this.babyEye = new Image();
	this.babyBody = new Image();
	this.babyTail = new Image();

	// 定义计时器来调用babytail图片
	this.babyTailTimer = 0;
	this.babyTailCount = 0;

    // 定义计时器调用babyEye图片
	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	    // 表示当前图片需要执行多长时间
	this.babyInteral = 1000;

	// 定义babyBody的计时器
	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}

babyObj.prototype.init = function(){

	this.x = canvas1.width*0.5;
	this.y = canvas1.height*0.5;
	this.angle = 0;
	// this.babyEye.src = "./src/babyEye0.png";
	// this.babyBody.src = "./src/babyFade0.png";
	// this.babyTail.src = "./src/babyTail0.png";

}
babyObj.prototype.draw = function(){

	// lerp x,y
	this.x = lerpDistance(mom.x,this.x,0.98);
    this.y = lerpDistance(mom.y,this.y,0.98);

    // lerp angle
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY,deltaX)+Math.PI;;
    this.angle = lerpAngle(beta,this.angle,0.1);

    // baby tail count
    this.babyTailTimer += deltaTime;
    if(this.babyTailTimer > 50){
    	this.babyTailCount += (this.babyTailCount+1)%8;
    	this.babyTailTimer %= 50;
    }
    // baby eye count
    this.babyEyeTimer += deltaTime;
    if(this.babyEyeTimer > this.babyInteral){
    	this.babyEyeCount = (this.babyEyeCount+1)%2;
    	this.babyEyeTimer %= this.babyInteral;

    	if(this.babyEyeCount == 0){
    		this.babyInteral = Math.random()*1500+6000;
    	}else{
    		this.babyInteral = 200;
    	}
    }
    // baby body count
    this.babyBodyTimer += deltaTime;
    if(this.babyBodyTimer > 500){
    	// 身体逐渐变白
    	this.babyBodyTimer %= 500;
    	this.babyBodyCount = this.babyBodyCount + 1;
    	if(this.babyBodyCount > 19){
    		this.babyBodyCount = 19;
    		// game over
            data.gameOver = true;
    	}
    }


	context1.save();
	// translate
	context1.translate(this.x,this.y);
	context1.rotate(this.angle);

	var babyTailCount = this.babyTailCount;
	context1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+25,-babyTail[babyTailCount].height*0.5);

    var babyBodyCount = this.babyBodyCount;
	context1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);

	var babyEyeCount = this.babyEyeCount;
	context1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
	context1.restore();
}
