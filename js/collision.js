// 碰撞检测，判断大鱼和果实的距离
// function calLength2(x1, y1, x2, y2) {
// return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
// }得到大鱼和小鱼之间距离的平方
function momFruitsCollision(){
  if(!data.gameOver){
	for (var i = 0; i < fruit.num; i++) {
		if(fruit.alive[i]){

			var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
			if(l<900){
				// fruit eaten
				fruit.dead(i);
				data.fruitNum++;
				mom.momBodyCount++
				if(mom.momBodyCount > 7){
					mom.momBodyCount = 7;
				}
				// 如果是蓝色果实加倍
				if( fruit.fruitType[i] == "blue"){
					data.double = 2
				}
				// 碰撞时产生特效
				wave.born(fruit.x[i],fruit.y[i]);
			}
		}
	 }
  }
}

// mom baby collision
function momBabyCollision(){
 if(data.fruitNum > 0 && !data.gameOver){
	var l = calLength2(mom.x,mom.y,baby.x,baby.y);
	if(l<900){
		// baby recover
		baby.babyBodyCount = 0;
		// data 重置
		// data.reset();
		mom.momBodyCount = 0;
		// score
		data.addScore();
		// draw halo
		halo.born(baby.x,baby.y);

	}
  }
}