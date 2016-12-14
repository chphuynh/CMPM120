canvas = document.getElementById('game');
context = canvas.getContext('2d');

var difficulty = 1;
var power = 1;
var score = 0;

var source = new Array();
source.push('https://www.dropbox.com/s/mr6k4ctq93hip2a/enemy.png?raw=1');
source.push('https://www.dropbox.com/s/v8dshqz2vcpdq4s/debris.png?raw=1');
source.push('https://www.dropbox.com/s/017i1diwixhhqkr/player_sprite.png?raw=1');
source.push('https://www.dropbox.com/s/vhoicim7ehxddke/planet.png?raw=1');
source.push('https://www.dropbox.com/s/zis8fbb9ou2op7c/planet2.png?raw=1');
source.push('https://www.dropbox.com/s/kh2s88iwauv0pbk/powerup.png?raw=1');

//Particle Background

function Particle(x, y, speed, lifetime) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.lifetime = lifetime;
  this.radius = speed * 0.5;

  this.draw = function() {
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    context.stroke();
    context.fill();
  }

  this.update = function() {
    if (this.y <= canvas.height + this.radius && this.lifetime > 0) {
      this.y += this.speed;
    } else {
      this.y = 0 - this.radius;
      this.lifetime = canvas.height;
    }
    this.lifetime -= this.speed;
  }

}

var particles = new Array();

function particle_system(numParticles) {
  for (var iter = 0; iter < numParticles; iter++) {
    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 5, canvas.height));
  }
}

particle_system(20);

//End of Particle Background

//Player Sprite Sheet
function PlayerSprite(url, frameWidth, frameHeight, frameSpeed, endFrame) {
  var image = new Image;
  var numFrames = 0;
  var currentFrame = 0;
  var counter = 0;
  image.src = url;

  this.hitX = this.x + 6;
  this.hitY = this.y + 3;
  this.hitWidth = 19;
  this.hitHeight = 35;

  this.row = 0;

  this.x = 300;
  this.y = 400;

  var velY = 0,
    velX = 0,
    speed = 5,
    friction = 0.9;

  image.onload = function() {
    numFrames = Math.floor(image.width / frameWidth);
  }

  this.update = function() {
    this.hitX = this.x + 6;
    this.hitY = this.y + 3;

    if (counter == (frameSpeed - 1)) {
      currentFrame = (currentFrame + 1) % endFrame;
    }

    counter = (counter + 1) % frameSpeed;

    if (keys[38]) { //up
      if (velY > -speed) {
        velY--;
      }
    }

    if (keys[40]) { //down
      if (velY < speed) {
        velY++;
      }
    }
    if (keys[39]) { //right
      if (velX < speed) {
        velX++;
      }
      this.row = 2;
    }
    if (keys[37]) { //left
      if (velX > -speed) {
        velX--;
      }
      this.row = 1;
    }

    if ((!keys[37] && !keys[39]) || (keys[37] && keys[39])) {
      this.row = 0;
    }

    velY *= friction;
    this.y += velY;
    velX *= friction;
    this.x += velX;

    if (this.x >= canvas.width - frameWidth) {
      this.x = canvas.width - frameWidth;
    } else if (this.x <= 0) {
      this.x = 0;
    }

    if (this.y > canvas.height - frameHeight) {
      this.y = canvas.height - frameHeight;
    } else if (this.y <= 0) {
      this.y = 0;
    }
  }

  this.draw = function(x, y) {
    //var row = Math.floor(currentFrame / numFrames);
    var col = Math.floor(currentFrame % numFrames);

    context.drawImage(image, col * frameWidth, this.row * frameHeight, frameWidth, frameHeight, x, y, frameWidth, frameHeight);
  }

}

player = new PlayerSprite(source[2], 32, 48, 5, 8);

function reset() {
  player.x = 300;
  player.y = 400;
  for (var i in enemyArray) {
    enemyArray[i].isLive = false;
  }
  for (var i in bulletArray) {
    bulletArray[i].isLive = false;
  }
  difficulty = 1;
  score = 0;
  power = 1;
  bgm.currentTime = 0;
  enemySpeed = 3;
}

//End of Player Sprite Sheet

//Shooting
function Bullet(x, y) {
  var image = new Image;
  this.x = x + 10;
  this.y = y + 24;
  this.speed = 10;
  this.isLive = true;
  image.src = source[2];

  this.hitX = this.x;
  this.hitY = this.y;
  this.hitWidth = 9;
  this.hitHeight = 16;

  this.draw = function() {
    context.drawImage(image, 54, 204, 9, 16, this.x, this.y, 9, 16);
  }

  this.update = function() {
    this.hitX = this.x;
    this.hitY = this.y;
    this.y -= this.speed;

    if (this.y + 16 < 0) {
      this.isLive = false;
    }
  }

}

var bulletArray = new Array();
var bulletDelay = 2;

function bulletArrayUpdate() {
  if (keys[32]) { //spacebar   
    if (bulletDelay >= 2) {
      var shootSFX = document.getElementById('shootSFX');
      shootSFX.currentTime = 0;
      shootSFX.play();
      if (power != 2) {
        var bullet = new Bullet(player.x, player.y);
        bulletArray.push(bullet);
      }

      if (power == 2 || power >= 4) {
        var bullet4 = new Bullet(player.x, player.y);
        bullet4.update = function() {
          this.hitX = this.x;
          this.hitY = this.y;
          this.y -= this.speed;
          this.x -= 1;

          if (this.y + 16 < 0) {
            this.isLive = false;
          }
        }
        bulletArray.push(bullet4);
        var bullet5 = new Bullet(player.x, player.y);
        bullet5.update = function() {
          this.hitX = this.x;
          this.hitY = this.y;
          this.y -= this.speed;
          this.x += 1;

          if (this.y + 16 < 0) {
            this.isLive = false;
          }
        }
        bulletArray.push(bullet5);
      }
      if (power >= 3) {
        var bullet2 = new Bullet(player.x, player.y);
        bullet2.update = function() {
          this.hitX = this.x;
          this.hitY = this.y;
          this.y -= this.speed;
          this.x -= 2;

          if (this.y + 16 < 0) {
            this.isLive = false;
          }
        }
        bulletArray.push(bullet2);
        var bullet3 = new Bullet(player.x, player.y);
        bullet3.update = function() {
          this.hitX = this.x;
          this.hitY = this.y;
          this.y -= this.speed;
          this.x += 2;

          if (this.y + 16 < 0) {
            this.isLive = false;
          }
        }
        bulletArray.push(bullet3);
      }

      bulletDelay = 0;
    } else {
      bulletDelay += 1;
    }
  }

  var newBulletArray = new Array();

  for (var i in bulletArray) {
    bulletArray[i].update();

    for (var j in enemyArray) {
      if (isCollide(bulletArray[i], enemyArray[j])) {
        bulletArray[i].isLive = false;
        enemyArray[j].health -= 1;
      }
    }

    if (bulletArray[i].isLive) {
      newBulletArray.push(bulletArray[i]);
    }
  }

  delete bulletArray;
  bulletArray = newBulletArray;
}

//End of Shooting

//Player Arrow Key movement

var keys = [];

document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});

//End of Arrow Key movement

function object(x, y, xspeed, source) {
  this.image = new Image();
  this.x = x;
  this.y = y;
  this.xspeed = xspeed;
  this.image.src = source;

  this.draw = function() {
    context.drawImage(this.image, this.x, this.y);
  }
}

var bg = new object(0, 0, 1.5, source[1]);
bg.update = function() {
  this.y += this.xspeed;
  if (this.y > canvas.width) {
    this.y = -500;
  }
}

var planet = new object(-100, 0, 0.4, source[3]);
planet.update = function() {
  this.y += this.xspeed;
  if (this.y > canvas.width) {
    var choice = Math.floor(Math.random() * 3);
    if (choice == 1) {
      this.x = -100;
    } else {
      this.x = canvas.width - 270
    }
    this.y = -400;
    var choice2 = Math.floor(Math.random() * 3);
    if (choice2 == 1) {
      this.image.src = source[3];
    } else {
      this.image.src = source[4];
    }
  }
}

function PowerUp(x, y) {
  this.x = x + 15;
  this.y = y + 15;
  var image = new Image;
  image.src = source[5];
  this.isLive = true;

  this.hitX = this.x;
  this.hitY = this.y;
  this.hitWidth = image.width;
  this.hitHeight = image.height;

  this.update = function() {
    this.hitX = this.x;
    this.hitY = this.y;
  }

  this.draw = function() {
    context.drawImage(image, this.x, this.y)
  }

}

var powerUpArray = new Array();

function updatePowerUpArray() {
  var newArray = new Array();

  for (var i in powerUpArray) {
    powerUpArray[i].update();

    if (isCollide(player, powerUpArray[i])) {
      var getpower = document.getElementById('getpower');
      getpower.currentTime = 0;
      getpower.play();
      powerUpArray[i].isLive = false;
      power += 1;
    }

    if (powerUpArray[i].isLive) {
      newArray.push(powerUpArray[i]);
    }
  }


  delete powerUpArray;
  powerUpArray = newArray;

}


function Enemy(x, y, speed) {
  this.x = x;
  this.y = y;
  var image = new Image;
  image.src = source[0];
  this.isLive = true;

  this.health = 1;

  var numFrames;
  var frameHeight = 126;
  var frameWidth = 109;
  var frameSpeed = 3;
  var endFrame = 8;
  var currentFrame = 0;
  var counter = 0;
  this.hitX = this.x + 9;
  this.hitY = this.y + 16;
  this.hitWidth = 27;
  this.hitHeight = 36;


  image.onload = function() {
    numFrames = Math.floor(image.width / frameWidth);
  }

  this.draw = function() {
    var row = Math.floor(currentFrame / numFrames);
    var col = Math.floor(currentFrame % numFrames);

    context.drawImage(image, col * frameWidth, row * frameHeight, frameWidth, frameHeight, this.x, this.y, 60, 69);
  }

  this.update = function() {
    this.hitX = this.x + 9;
    this.hitY = this.y + 16;

    if (counter == (frameSpeed - 1)) {
      currentFrame = (currentFrame + 1) % endFrame;
    }

    counter = (counter + 1) % frameSpeed;


    this.y += speed;

    if (this.y > canvas.height) {
      this.isLive = false;
    }

    if (this.health <= 0) {
      var edeath = document.getElementById('edeath');
      edeath.currentTime = 0;
      edeath.play();
      this.isLive = false;
      score += 50;
      if (Math.random() * 50 > 45) {
        var powerup = new PowerUp(this.x, this.y);
        powerUpArray.push(powerup);
      }
    }
  }
}

var enemyArray = new Array();
var enemyDelay = 2;
var enemySpeed = 3;

function enemyArrayUpdate() {
  if (enemyArray.length == 0) {
    for (var i = 1; i <= Math.floor(difficulty); i++) {
      var enemy = new Enemy(Math.random() * (canvas.width - 50), Math.random() * -50 * difficulty, enemySpeed);
      enemy.health = difficulty / 8;
      enemyArray.push(enemy);
    }
    difficulty *= 2;
    enemySpeed += .5;
  }

  var newEnemyArray = new Array();

  for (var i in enemyArray) {
    enemyArray[i].update();

    if (enemyArray[i].isLive) {
      newEnemyArray.push(enemyArray[i]);
    }
  }

  delete enemyArray;
  enemyArray = newEnemyArray;
}

function isCollide(a, b) {
  return (
    a.hitX < (b.hitX + b.hitWidth) &&
    (a.hitX + a.hitWidth) > b.hitX &&
    a.hitY < (b.hitY + b.hitHeight) &&
    (a.hitY + a.hitHeight) > b.hitY
  );
}


function update() {
  if (document.hasFocus()) {
    bgm.play();
  } else {
    bgm.pause();
  }
  for (var i in particles) {
    particles[i].update();
  }
  bg.update();
  bulletArrayUpdate();
  enemyArrayUpdate();
  updatePowerUpArray();
  player.update();
  planet.update();
  for (var i in enemyArray) {
    if (isCollide(player, enemyArray[i])) {
      //console.log("collision!");
      reset();
    }
  }

}

function draw() {
  canvas.width = canvas.width;
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fill();
  planet.draw();
  bg.draw();

  for (var i in particles) {
    particles[i].draw();
  }

  for (var i in bulletArray) {
    bulletArray[i].draw();
  }

  for (var i in enemyArray) {
    enemyArray[i].draw();
  }

  for (var i in powerUpArray) {
    powerUpArray[i].draw();
  }

  player.draw(player.x, player.y)

  context.font = "30px 'Comic Sans MS'"
  context.fillStyle = "rgb(255,215,0)";
  context.fillText("Score: " + Math.floor(score), 10, 30);
  score += 0.25;

}

function game_loop() {
  update();
  draw();
}

preloadArray = new Array();

function preload() {
  for (var i in source) {
    load = new Image();
    load.src = source[i];
    preloadArray.push(load);
  }
}

function init() {
  var bgm = document.getElementById('bgm');
  preload();
  setInterval(game_loop, 30);
}

init();
