// html元素加载完后执行每个函数
var canvas1 , canvas2;
var context , context2;


// 由于requestAnimFrame的两帧时间间隔不一样，定义两个值来获取它的时间间隔
var lastTime, deltaTime;

var ane,fruit,mom,baby;

// 定义鼠标变量
var mx,my;

// 定义小鱼tail,eye,body的图片数组
var babyTail = [];
var babyEye = [];
var babyBody = [];

// 定义大鱼tail,eye,body的图片数组
var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];

// 分值变量
var data;

// 创建大鱼吃果实特效
var wave;

// 创建大鱼喂小鱼坐标
var halo;

// 定义漂浮物
var dust;
var dustPic = [];

var bgPic = new Image();

document.body.onload = game;

function game(){
	// 初始化工作
	init();

	// 初始化lastTime,deltaTime
	lastTime = Date.now();
	deltaTime = 0;

	gameLoop();
}


function init(){

    // canvas1绘制鱼，UI ，dust，circle
	canvas1 = document.getElementById("canvas1");
	// canvas2 绘制background，海葵(ane),果实
	canvas2 = document.getElementById("canvas2");

	context1 = canvas1.getContext("2d");
	context2 = canvas2.getContext("2d");


	bgPic.src = "./src/background.jpg";

    ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	dust = new dustObj();
	dust.init();

	data = new dataObj();

	// 初始化babyTail,eye,body图片数组
	for(var i=0; i<8; i++){
		babyTail[i] = new Image();
		babyTail[i].src = "./src/bigTail"+i+".png";
	}
	for(var i=0; i<2; i++){
		babyEye[i] = new Image();
		babyEye[i].src = "./src/babyEye"+i+".png";
	}
	for(var i=0; i<20; i++){
		babyBody[i] = new Image();
		babyBody[i].src = "./src/babyFade"+i+".png";
	}

	// 初始化momTail,eye,body图片数组
	for(var i=0;i<8;i++){
		momTail[i] = new Image();
		momTail[i].src = "./src/bigTail"+i+".png";
	}
	for(var i=0;i<2;i++){
		momEye[i] = new Image();
		momEye[i].src = "./src/bigEye"+i+".png";
	}

	// 初始化momBody图片
	for(var i=0;i<8; i++){
		momBodyOra[i] = new Image();
		momBodyOra[i].src = "./src/bigSwim"+i+".png";
		momBodyBlue[i] = new Image();
		momBodyBlue[i].src = "./src/bigSwimBlue"+i+".png";
	}

	// 初始化漂浮物图片
	for(var i=0; i<7;i++){
		dustPic[i] = new Image();
		dustPic[i].src = "./src/dust"+i+".png";
	}

// 初始化鼠标为canvas中点
	mx = canvas1.height*0.5;
	my = canvas1.height*0.5;

	canvas1.addEventListener('mousemove', onMouseMove,false);

}

function gameLoop(){
	window.requestAnimFrame(gameLoop);

	var now = Date.now();
	// console.log(now);
	deltaTime = (now - lastTime)/6;
    now = lastTime;

	if(deltaTime > 50) deltaTime = 50;

    // 绘制背景
	drawBg();

	// 绘制海葵
	ane.draw();

	// 绘制果实
	fruitMonitor();
	fruit.draw();

	// 绘制大鱼
	context1.clearRect(0,0,canvas1.width,canvas1.height);
	mom.draw();

	// 绘制小鱼
	baby.draw();

	// 绘制分值
	data.draw();

	// 绘制特效
	wave.draw();

	// 绘制大鱼喂小鱼特效
	halo.draw();

	// 漂浮物绘制
	dust.draw();

	// 碰撞检测
	momFruitsCollision();
	momBabyCollision();
}

// 检测鼠标滑动
function onMouseMove(e){
	// 如果gameOver=true鼠标不会控制小鱼
	if(!data.gameOver){
		if(e.offSetX||e.layerX){
		mx = e.offSetX == undefined ? e.layerX : e.offSetX;
		my = e.offSetY == undefined ? e.layerY : e.offSetY;
	   }
	}
}