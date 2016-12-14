var canvas = document.getElementById('mygame');
var context = canvas.getContext('2d');

var gridWidth = 10;

var gridObstacle = new Array();

makeGridCollision(gridObstacle);

var sources = new Array();
sources.push('https://www.dropbox.com/s/11v74kvt73kb39g/bg.jpg?raw=1');
sources.push('https://www.dropbox.com/s/l329oj11onuez69/player.png?raw=1');
sources.push('https://www.dropbox.com/s/axy4w5f29kabz2p/player2.png?raw=1');
sources.push('https://www.dropbox.com/s/h9sd8osg99fsit2/player3.png?raw=1');
sources.push('https://www.dropbox.com/s/oacsir65hzb3c6g/enemy.png?raw=1');

var bg = new Image();
bg.src = sources[0];

var score = 0;
var kill = 0;
var retry = 0;

var snakeArray = new Array();

//Keyboard Input
var keys = [];

document.body.addEventListener("keydown", function(e) {
	keys[e.keyCode] = true;
  	if(e.keyCode == 38 && snake.dir != 'down') snake.dir = 'up';
	else if(e.keyCode == 40 && snake.dir != 'up') snake.dir = 'down';
	else if(e.keyCode == 39 && snake.dir != 'left') snake.dir = 'right';
	else if(e.keyCode == 37 && snake.dir != 'right') snake.dir = 'left';
});

document.body.addEventListener("keyup", function(e){
	keys[e.keyCode] = false;
});

//

function Snake() {
	this.dir = 'right';
	//var image = new Image;
	//image.src = sources[1];
	//image.width = 10;
	//image.height = 10;
	
	var numFrames = 3;
  	var currentFrame = 0;
  	var counter = 0;
	var frameWidth = 32;
	var frameHeight = 32;
	var frameSpeed = 1;
	var endFrame = 3;
	this.row = 2;
	
	this.init = function(){
		this.dir = 'right';
		delete snakeArray;
		snakeArray = new Array();
		for(var i = 5; i >= 1; i--) {
			var image2 = new Image();
			image2.src = sources[Math.round((Math.random()*2))+1];
			snakeArray.push({x:i*gridWidth, y:200, row: this.row, image: image2});
		}
		score = 0;
		kill = 0;
		retry += 1;
	};
	
	this.update = function(){
		if (counter == (frameSpeed - 1)) {
      		currentFrame = (currentFrame + 1) % endFrame;
    	}

    	counter = (counter + 1) % frameSpeed;
	
		var head = {x:snakeArray[0].x,y:snakeArray[0].y};
		
		if(head.x < 0 ||
		   head.x >= canvas.width ||
		   head.y < 0 ||
		   head.y >= canvas.height || 
		   collision(head, snakeArray.slice(1)) ||
		   collision(head, gridObstacle) ||
		   obstaclecol(head, obstacles)){
			this.init();
			food.init();
			return;
		}
		
		if(this.dir == 'right'){
		 	head.x += gridWidth;
		 	this.row = 2;
		} else if(this.dir == 'left'){
		 	head.x -= gridWidth;
		 	this.row = 1;
		}else if(this.dir == 'up'){
			head.y -= gridWidth;
			this.row = 3;
		} else if(this.dir == 'down'){
			 head.y += gridWidth;
			 this.row = 0;
		}
		
		if((head.x == food.x && head.y == food.y) ||
			(head.x == food.x && head.y - 10 == food.y) ||
			(head.x + 10 == food.x && head.y == food.y) ||
			(head.x == food.x && head.y + 10 == food.y) ||
			(head.x - 10 == food.x && head.y == food.y)){
			var tail = {x:head.x,y:head.y,row:this.row ,image: food.image};
			food.init();
			score += 1;
		} else {
			var tail = snakeArray.pop();
			//var image = tail.image;
			tail.x = head.x;
			tail.y = head.y;
			tail.row = this.row;
			//image: image};
		}
		
		snakeArray.unshift(tail);
		
		snakeCheck();
		
	};
	
	this.draw = function(){
		var col = Math.floor(currentFrame % numFrames);
		if(this.dir != 'down'){
			for(var i in snakeArray){
				part = snakeArray[i];
				context.drawImage(part.image, col*frameHeight,  part.row* frameWidth, frameWidth, frameHeight, part.x, part.y-10, 20, 20);
			}
		} else {
			for(var i = snakeArray.length - 1; i >= 0; i--){
				part = snakeArray[i];
				context.drawImage(part.image, col*frameHeight, part.row * frameWidth, frameWidth, frameHeight, part.x, part.y-10, 20, 20);
			}
		}
	};

}

var snake = new Snake();
snake.init();

function Food(){
	this.x;
	this.y;
	this.image = new Image();
	this.image.width = 20;
	this.image.height = 20;
	
	this.init = function() {
			this.x = Math.round(Math.random()*(canvas.width-gridWidth)/gridWidth)*gridWidth;
			this.y = Math.round(Math.random()*(canvas.height-gridWidth)/gridWidth)*gridWidth;
			this.image.src = sources[Math.round((Math.random()*2))+1];
			this.update();
	};
	
	this.update = function() {
		for(var i in gridObstacle){
			if(this.x == gridObstacle[i].x && this.y == gridObstacle[i].y){
				this.init();
			}
		}
	};
	
	this.draw = function() {
		//context.fillStyle = 'red';
		//context.fillRect(this.x, this.y, gridWidth, gridWidth);
		context.drawImage(this.image, 32, 0, 32,32, this.x, this.y - 10, 20, 20);
	};
}

food = new Food();
food.init();

function collision(a,array){
	for(var i in array){
		if(a.x == array[i].x && a.y == array[i].y)
			return true;
	}
	return false;
}

function obstaclecol(a,array){
	for(var i in array){
		if(a.x <= array[i].x + 15 && a.y <= array[i].y + 15
		   && a.x >= array[i].x - 15 && a.y >= array[i].y - 15)
			return true;
	}
	return false;
}

function obstacle(x,y, speed){
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.d = 0;
	var image = new Image();
	image.src = sources[4];
	
	var numFrames = 3;
  	var currentFrame = 0;
  	var counter = 0;
	var frameWidth = 32;
	var frameHeight = 32;
	var frameSpeed = 1;
	var endFrame = 3;
	this.row = 2;
	
	
	this.update = function(){
		if (counter == (frameSpeed - 1)) {
      		currentFrame = (currentFrame + 1) % endFrame;
    	}

    	counter = (counter + 1) % frameSpeed;
		
		if(this.d == 1) {
			if(this.y > 300) this.y = 300;
		} else if(this.d == 2) {
			if(this.x > 450) this.x = 450;
		} else if(this.d == 3) {
			if(this.y < 90) this.y = 90;
		} else if(this.d == 4) {
			if(this.x < 150) this.x = 150;
		}
				
		if(this.x == 150 && this.y == 90) this.d = 1;
		else if(this.x == 150 && this.y == 300) this.d = 2;
		else if(this.x == 450 && this.y == 300) this.d = 3;
		else if(this.x == 450 && this.y == 90) this.d = 4;
		
		if(this.d == 1){
			this.row = 0;
			this.y += this.speed;
		} else if(this.d == 2){
			this.row = 2;
			this.x += this.speed;
		} else if(this.d == 3){
			this.row = 3;
			this.y -= this.speed;
		} else if(this.d == 4){
			this.row = 1;
			this.x -= this.speed;
		}
	};
	
	this.draw = function(){
		var col = Math.floor(currentFrame % numFrames);
		context.drawImage(image, col*frameHeight, this.row * frameWidth, frameWidth, frameHeight, this.x, this.y, 20, 20);
	};
}

var obstacles = new Array();

function obstacle_create(){
	var obstacle1 = new obstacle(150, 90, 2);
	var obstacle2 = new obstacle(150, 300, 4);
	var obstacle3 = new obstacle(450, 300, 8);
	var obstacle4 = new obstacle(450, 90, 12);
	obstacles.push(obstacle1);
	obstacles.push(obstacle2);
	obstacles.push(obstacle3);
	obstacles.push(obstacle4);
}

obstacle_create();

function snakeCheck(){
	for(var i in snakeArray){
		if(i != 0){
			c = snakeArray[i];
			if(obstaclecol(c, obstacles)){
				kill += snakeArray.length - i;
				snakeArray.splice(i, snakeArray.length - i);
				break;
			}
		}
	}
}

function update() {
	food.update();
	snake.update();
	if(keys[16]) snake.update();
	for(var i in obstacles){
		var c = obstacles[i];
		c.update();
	}
}

function draw() {
	canvas.width = canvas.width;
	context.drawImage(bg,0,0);
	context.strokeStyle = 'black';
	context.strokeRect(0,0,canvas.width, canvas.height);
	food.draw();
	snake.draw();
	for(var i in obstacles){
		var c = obstacles[i];
		c.draw();
	}
	
	context.font = "20px 'Comic Sans MS'";
    context.fillStyle = "rgb(255,0,0)";
    context.fillText("Retry #" + retry, 10, 340);
    context.fillText("People Collected: " + score, 10, 360);
    context.fillText("People Killed: " + kill, 10, 380);
	
}

function game_loop(){
	bgm.play();
	update();
	draw();
}

var preloadA = new Array();

function preload(){
	for(var i in sources){
		var image = new Image();
		image.src = sources[i];
		preloadA.push(image);
	}
}

function init() {
	preload();
	var bgm = document.getElementById('bgm');
	setInterval(game_loop, 100);
}

init();