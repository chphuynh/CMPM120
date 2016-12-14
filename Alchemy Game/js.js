var canvas = document.getElementById('mygame');
var context = canvas.getContext('2d');

var bg = new Image();
bg.src = 'https://www.dropbox.com/s/ebcqvnj8925yb9d/tiling-cartoon-dirt-307x307.png?raw=1'

var buttonsrc = new Array();
buttonsrc.push('https://www.dropbox.com/s/1ov0m2actdxjlfy/clear.png?raw=1');
buttonsrc.push('https://www.dropbox.com/s/fx2zyn6frtxi0gg/clear_hover.png?raw=1');
buttonsrc.push('https://www.dropbox.com/s/lxymhu1muhyua49/clear_pushed.png?raw=1');

var button = new Image();
button.X = 92;
button.Y = 10;
button.width = 85;
button.height = 30;
button.src = buttonsrc[0];
button.hover = false;
button.pressed = true;

var source = new Array();
source.push('https://www.dropbox.com/s/721u9oym868of2t/larvae_1.png?raw=1');
source.push('https://www.dropbox.com/s/eu1n0nqdy5ab0rs/egg.png?raw=1');
source.push('https://www.dropbox.com/s/jkdj1b1dua3vrsa/drone.png?raw=1');
source.push('https://www.dropbox.com/s/69nez6p0vng4kva/overlord.png?raw=1');
source.push('https://www.dropbox.com/s/owrf156im8ve1lj/zergling.png?raw=1');
source.push('https://www.dropbox.com/s/bbohr1v9dl6pr0p/hydralisk.png?raw=1');
source.push('https://www.dropbox.com/s/njndwzymj4ydoei/mutalisk.png?raw=1');

var larvae = new Image();
larvae.X = 20;
larvae.Y = 75;
larvae.index = 0;
larvae.src = source[0];
larvae.name = 'larvae'

var images = new Array();
images.push(larvae);

function checkBounds(image, x, y) {
   if(x <= (image.X + image.width) &&
      x >= image.X &&
      y <= (image.Y + image.height) &&
      y >= image.Y) {
      return true;
   } else {
      return false;
   }
}

var drag = new Image();
drag.isDragging = false;
drag.dragOffsetX = 0;
drag.dragOffsetY = 0;


var index = 0;

function checkButton(){
   var rightside = new Image();
   rightside.X = 90;
   rightside.Y = 0;
   rightside.width = canvas.width - 90;
   rightside.height = canvas.height;
   if(button.pressed == false) {
   if(checkBounds(button, mousePos.X, mousePos.Y)){
      button.src = buttonsrc[2];
      button.pressed = true;
      while (true) {
         updateIndex();
         var isCollision = false;
         var collideInd = undefined;
         for(var image in images) {
            ind = image;
            image = images[image];
            if(!isCollision) {
               if(isCollide(image, rightside)) {
                  isCollision = true;
                  collideInd = ind;
              }
            }
         }
         if(isCollision) {
            images.splice(images[collideInd].index, 1);
         } else {
            break;
         }
      }
   }
   } else {
      button.pressed = false;
   }
}

function handleMouseDown(eventParams){
   checkButton();
   for(var image in images){
      index = image;
      image = images[image];
      if(checkBounds(image, eventParams.clientX - 8,
            eventParams.clientY - 8)){
         console.log("dragging " + image.name);
         drag.isDragging = true;
         target = index;
         drag.dragOffsetX = eventParams.clientX - 8 - images[index].X;
         drag.dragOffsetY = eventParams.clientY - 8- images[index].Y;
         break;
    
      }
   }
}

canvas.addEventListener("mousedown", handleMouseDown);

var mousePos = {X:0,Y:0}

function handleMouseMove(eventParams) {
   mousePos.X = eventParams.clientX - 8;
   mousePos.Y = eventParams.clientY - 8;
   if(checkBounds(button, mousePos.X, mousePos.Y)) {
      if(button.hover == false) {
         button.src = buttonsrc[1];
         button.hover = true;
      }
   } else {
      if(button.hover == true) {
         button.src = buttonsrc[0];
         button.hover = false;
         button.pressed = false;
      }
   }
}

canvas.addEventListener("mousemove", handleMouseMove)

function isCollide(a, b) {
    return (
        a.X < (b.X + b.width)  && 
        (a.X + a.width)  > b.X &&
		    a.Y < (b.Y + b.height) && 
        (a.Y + a.height) > b.Y
    );
}

function merge(a,b) {
   if(a.name == 'larvae' && b.name == 'larvae') {
      images.splice(a.index,1);
      images.splice(b.index - 1, 1);
      var egg = new Image();
      egg.X = mousePos.X - 16;
      egg.Y = mousePos.Y - 16;
      egg.name = 'egg';
      egg.index = images.length;
      egg.src = source[1];
      images.push(egg);
      console.log(a.name + " and " + b.name + " " + "merged to make egg"
)
   } else if ((a.name == 'larvae' && b.name == 'egg') || (a.name == 'egg' && b.name == 'larvae')) {
      images.splice(a.index,1);
      images.splice(b.index - 1, 1);
      var drone = new Image();
      drone.X = mousePos.X - 16;
      drone.Y = mousePos.Y - 16;
      drone.name = 'drone';
      drone.index = images.length;
      drone.src = source[2];
      images.push(drone);
      console.log(a.name + " and " + b.name + " " + "merged to make drone");
   } else if (a.name == 'egg' && b.name == 'egg') {
      images.splice(a.index,1);
      images.splice(b.index - 1, 1);
      var overlord = new Image();
      overlord.X = mousePos.X - 16;
      overlord.Y = mousePos.Y - 16;
      overlord.name = 'overlord';
      overlord.index = images.length;
      overlord.src = source[3];
      images.push(overlord);
      console.log(a.name + " and " + b.name + " " + "merged to make overlord");
   } else if ((a.name == 'drone' && b.name == 'larvae') || (a.name == 'larvae' && b.name == 'drone')) {
      images.splice(a.index,1);
      images.splice(b.index - 1, 1);
      var zergling = new Image();
      zergling.X = mousePos.X - 16;
      zergling.Y = mousePos.Y - 16;
      zergling.name = 'zergling';
      zergling.index = images.length;
      zergling.src = source[4];
      images.push(zergling);
      console.log(a.name + " and " + b.name + " " + "merged to make zergling");
   } else if ((a.name == 'zergling' && b.name == 'larvae') || (a.name == 'larvae' && b.name == 'zergling')) {
      images.splice(a.index,1);
      images.splice(b.index - 1, 1);
      var hydralisk = new Image();
      hydralisk.X = mousePos.X - 16;
      hydralisk.Y = mousePos.Y - 16;
      hydralisk.name = 'hydralisk';
      hydralisk.index = images.length;
      hydralisk.src = source[5];
      images.push(hydralisk);
      console.log(a.name + " and " + b.name + " " + "merged to make hydralisk");
   } else if ((a.name == 'hydralisk' && b.name == 'overlord') || (a.name == 'overlord' && b.name == 'hydralisk')) {
      images.splice(a.index,1);
      images.splice(b.index - 1, 1);
      var mutalisk = new Image();
      mutalisk.X = mousePos.X - 16;
      mutalisk.Y = mousePos.Y - 16;
      mutalisk.name = 'mutalisk';
      mutalisk.index = images.length;
      mutalisk.src = source[6];
      images.push(mutalisk);
      console.log(a.name + " and " + b.name + " " + "merged to make mutalisk");
   }
   
}

function columnCheck() {
   var isLarvae = false;
   var eggCreated = false;
   var isEgg = false;
   var droneCreated = false;
   var isDrone = false;
   var overlordCreated = false;
   var isOverlord = false;
   var zerglingCreated = false;
   var isZergling = false;
   var hydraliskCreated = false;
   var isHydralisk = false;
   var mutaliskCreated = false;
   var isMutalisk = false;
   for(var image in images) {
      image = images[image];
      if(checkBounds(image,25,80)){
         isLarvae = true;
      }
      if(image.name == 'egg'){
         eggCreated = true;
      }
      if(eggCreated) {
         if(checkBounds(image,25,105)) {
            isEgg = true;
         }
      }
      if(image.name == 'drone') {
         droneCreated = true;
      }
      if(droneCreated) {
         if(checkBounds(image,25, 145)){
            isDrone = true;
         }
      }
      if(image.name == 'overlord') {
         overlordCreated = true;
      }
      if(overlordCreated) {
         if(checkBounds(image, 25, 180)) {
            isOverlord = true;
         }
      }
      if(image.name == 'zergling') {
         zerglingCreated = true;
      }
      if(zerglingCreated){
         if(checkBounds(image, 35, 255)) {
            isZergling = true;
         }
      }
      if(image.name == 'hydralisk') {
         hydraliskCreated = true;
      }
      if(hydraliskCreated){
         if(checkBounds(image, 35, 285)) {
            isHydralisk = true;
         }
      }
      if(image.name == 'mutalisk') {
         mutaliskCreated = true;
      }
      if(mutaliskCreated){
         if(checkBounds(image, 25, 330)) {
            isMutalisk = true;
         }
      }
   }
   if(!isLarvae) {
      var larvae2 = new Image();
			larvae2.X = 20;
			larvae2.Y = 75;
      larvae2.index = images.length;
			larvae2.src = source[0];
			larvae2.name = 'larvae'
      images.push(larvae2);
    }
    if(mutaliskCreated) {
       if(!isMutalisk) {
          var mutalisk = new Image();
			    mutalisk.X = 20;
			    mutalisk.Y = 325;
          mutalisk.index = images.length;
			    mutalisk.src = source[6];
			    mutalisk.name = 'mutalisk'
          images.push(mutalisk);
       }
       overlordCreated = true;
       hydraliskCreated = true;
    } 
    if(overlordCreated) {
       if(!isOverlord) {
          var overlord = new Image();
			    overlord.X = 20;
			    overlord.Y = 180;
          overlord.index = images.length;
			    overlord.src = source[3];
			    overlord.name = 'overlord'
          images.push(overlord);
       }
       eggCreated = true;          
    } 
    if(hydraliskCreated) {
       if(!isHydralisk) {
          var hydralisk = new Image();
			    hydralisk.X = 30;
			    hydralisk.Y = 280;
          hydralisk.index = images.length;
			    hydralisk.src = source[5];
			    hydralisk.name = 'hydralisk'
          images.push(hydralisk);
       }
       zerglingCreated = true;
    }
    if(zerglingCreated) {
       if(!isZergling) {
          var zergling = new Image();
			    zergling.X = 30;
			    zergling.Y = 250;
          zergling.index = images.length;
			    zergling.src = source[4];
			    zergling.name = 'zergling'
          images.push(zergling);
       }
       eggCreated = true;
       droneCreaed = true;
    }
    if(droneCreated) {
       if(!isDrone) {
          var drone = new Image();
			    drone.X = 25;
			    drone.Y = 138;
          drone.index = images.length;
			    drone.src = source[2];
			    drone.name = 'drone'
          images.push(drone);
       }
       eggCreated = true;
    }
    if(eggCreated) {
       if(!isEgg) {
          var egg = new Image();
			    egg.X = 25;
			    egg.Y = 105;
          egg.index = images.length;
			    egg.src = source[1];
			    egg.name = 'egg'
          images.push(egg);
       }
    }
         
}


function handleMouseUp() {
   drag.isDragging = false;
   target = undefined;
   var isCollision = false;
   for(var image in images) {
      image = images[image];
      for(var image2 in images) {
         image2 = images[image2];
         if(isCollide(image, image2) && image != image2) {
            console.log("collision between " + image.name + " and " + image2.name);
            isCollision = true;
            merge(image, image2);
            break;
         }
     }
     if(isCollision) {
        break;
     }
   }
   columnCheck();
   if(button.pressed == true) {
      button.src = buttonsrc[1];
      button.pressed = false;
   }
}

canvas.addEventListener("mouseup", handleMouseUp)

function dragUpdate(){
   if(drag.isDragging){
      if(images[target] != undefined){
        images[target].X = mousePos.X - drag.dragOffsetX;
        images[target].Y = mousePos.Y - drag.dragOffsetY;
    }
  }   
}

function updateIndex() {
   for(var image in images) {
      var ind = image;
      image = images[image];
      image.index = ind;
   }
}

function update() {
   dragUpdate();
   updateIndex();
}

function draw(){
   canvas.width = canvas.width;
   context.drawImage(bg,0,0,canvas.width,canvas.height)
   context.drawImage(button, button.X, button.Y, button.width, button.height);
   for(var image in images) {
      image = images[image];
      context.drawImage(image, image.X, image.Y)
   }
}

function game_loop(){
   update();
   draw();
}

var loadImages = new Array();

function preload(){
   for(var sources in buttonsrc) {
      var preImage = new Image();
      preImage.src = buttonsrc[sources];
      loadImages.push(preImage);
   }
   for(var sources in source) {
      var preImage = new Image();
      preImage.src = source[sources];
      loadImages.push(preImage);
   }
}

function init() {
   preload();
   setInterval(game_loop, 1);
}

init();