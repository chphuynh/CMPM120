var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

//GLOBAL variables
var money = 10000000000;
var TILE_WIDTH = 50;
var TILE_HEIGHT = TILE_WIDTH/2;
var buildMenuState = 0;
var karma = 9000;
var karmaNeg = false;
var canCollectMarker = false;
var showInfoTarget = undefined;
var drawbox;
var gamePaused = false;
var gameStart = true;
var gameLost = false;
var game;
var paused;
var atOptionMenu = false;
var atCreditMenu = false;
var pauseText = 'PAUSED';
var regentPop = false;
var regentTimeCheck = 54;
var daysLeftCheck = regentTimeCheck;
var regentMoneyCheck = 0;
var curRMC;
var studentWarning = false;
var firstWarning = false;
var ching = true;
//********************************************
var worldView = {
    x: canvas.width / 2 - 20,
    y: 30
};

//var sound = new Array();
//sound.push('https://www.dropbox.com/s/6lzvu0jkui85qn9/blip.wav?dl=1');
var audio = new Audio('https://www.dropbox.com/s/6lzvu0jkui85qn9/blip.wav?dl=1');
var song = new Audio('https://www.dropbox.com/s/7z9gouv4imfaztg/Kevin_MacLeod_-_The_Forest_and_the_Trees.mp3?dl=1');
var construct = new Audio('https://www.dropbox.com/s/h8o8t6ugdc1rhuj/construction.mp3?dl=1');
var ching  = new Audio('https://www.dropbox.com/s/2597e6827yuoqj4/75235__creek23__cha-ching.wav?dl=1');
var ching2 = new Audio('https://www.dropbox.com/s/2597e6827yuoqj4/75235__creek23__cha-ching.wav?dl=1');

var source = new Array();
source.push('https://www.dropbox.com/s/gl14m3mv27jcovh/bg.jpg?raw=1');
source.push('https://www.dropbox.com/s/of0u3lfb15z9yij/button.png?raw=1');
source.push('https://www.dropbox.com/s/obawz7oi4mb0wx4/button_hover.png?raw=1');
source.push('https://www.dropbox.com/s/xol20l7n4ukubwf/button_pressed.png?raw=1');
source.push('https://www.dropbox.com/s/1y32r06j3kb6u06/HUD.png?raw=1');
source.push('https://www.dropbox.com/s/9ug64hf5ctz73um/buildingselect.png?raw=1');
source.push('https://i.imgur.com/vI2mJVh.png');

var miscSrc = new Array();
// added shit arrow
miscSrc.push('https://www.dropbox.com/s/lhujm9behhlasix/arrow.png?raw=1'); //1
miscSrc.push('http://i.imgur.com/BNASZ5o.png'); // cymenuimg 
miscSrc.push('http://i.imgur.com/maA7clk.png'); //pause

var menuimg = new Image();
menuimg.src = miscSrc[1];

var pauseImage = new Image();
pauseImage.src = miscSrc[2];



//######################## Array holding building images ######################

var tileSource = new Array();
tileSource.push('https://www.dropbox.com/s/tf1d7lj3twn4bae/land.png?raw=1'); //0
tileSource.push('https://www.dropbox.com/s/2ekwhnwgmh3a7u5/tree.png?raw=1'); //1

//Dorm building 1x1
tileSource.push('https://i.imgur.com/ruBCpkU.png'); //2

//Try this baytree building 2x1 tiles
tileSource.push('https://i.imgur.com/62Xk03F.png'); //3

//Darc building 2x2
tileSource.push('https://i.imgur.com/1tNFQDB.png'); //4

//Basketball Court
tileSource.push('https://www.dropbox.com/s/jnsh1g8swep4wy8/court.png?raw=1'); //5

//Bigger Dorm
tileSource.push('https://i.imgur.com/AykNklk.png'); //6

//Fountain
tileSource.push('https://i.imgur.com/czsdN9R.png'); //7

//dining hall 2x2
tileSource.push('https://www.dropbox.com/s/lmg6o2343zjvbo3/dininghall.png?raw=1'); //8

//Gym 2x2
tileSource.push('https://i.imgur.com/BHR2SFs.png?1'); //9

//Chancellor's House 2x2
tileSource.push('https://i.imgur.com/4BjNuBV.png'); //10

//Arboretum
tileSource.push('https://i1378.photobucket.com/albums/ah103/madetobore/arbor3_zpsqahxvq5j.png'); //11

//####################################################################################

var constructionImage = new Image();
constructionImage.src = 'https://www.dropbox.com/s/5hscv7yd95lxnbc/Ma9SjuT.png?raw=1';
constructionImage.xscale = 1; constructionImage.yscale = 0.8;
constructionImage.xspace = constructionImage.yspace = 1;

var collectImage = new Image();
collectImage.src = 'https://i.imgur.com/vI2mJVh.png';
collectImage.xscale = 1; collectImage.yscale = 0.8;
collectImage.xspace = collectImage.yspace = 1;

//################# Initializing building dimensions#################
var tileImage = new Array();

for (var i in tileSource) {
    var image = new Image();
    image.src = tileSource[i];
    tileImage.push(image);
}


//When inserting an image into the source, the image must have an xscale and yscale
//xscale is its width sideways. For a 1x1 this is usually 1. For 2x1 this is usually 1.5
//yscale is its height, For a 1x1 usually 1. If you dont know increment to 2 and either increase or decrease by .1
tileImage[2].xscale = tileImage[2].yscale = 1;
tileImage[3].xscale =  tileImage[3].yscale = 1.5;
tileImage[4].xscale = 2; tileImage[4].yscale =  3.2;
tileImage[5].xscale = 1.5; tileImage[5].yscale = 1.5;
tileImage[6].xscale = 2; tileImage[6].yscale =  2.8;
tileImage[7].xscale = tileImage[7].yscale = 1;
tileImage[8].xscale = 2; tileImage[8].yscale = 26;
tileImage[9].xscale = 2; tileImage[9].yscale =  4;
tileImage[10].xscale = 2; tileImage[10].yscale =  6.5;
tileImage[11].xscale = 2; tileImage[11].yscale = 2.874;




//xspace and yspace is how much space on grid it takes
//e.g 1x1 has xspace yspace of 1 and 2x2 has xpsace yspace of 2
tileImage[2].xspace = tileImage[2].yspace = 1;
tileImage[3].xspace = 2; tileImage[3].yspace = 1;
tileImage[4].xspace = tileImage[4].yspace = 2;
tileImage[5].xspace = 2; tileImage[5].yspace = 1;
tileImage[6].xspace = tileImage[6].yspace = 2;
tileImage[7].xspace = tileImage[7].yspace = 1;
tileImage[8].xspace = tileImage[8].yspace =2;
tileImage[9].xspace = tileImage[9].yspace = 2;
tileImage[10].xspace = tileImage[10].yspace = 2;
tileImage[11].xspace = tileImage[11].yspace = 2;


//Add names for the building to be printed
tileImage[2].name = 'Small Dorm';
tileImage[3].name = 'Bookstore';
tileImage[4].name = 'Digital Arts Center';
tileImage[5].name = 'Basketball Court';
tileImage[6].name = 'Large Dorm';
tileImage[7].name = 'Fountain';
tileImage[8].name = 'Dining Hall';
tileImage[9].name = 'Gym';
tileImage[10].name = 'Chancellor House';
tileImage[11].name = 'Arboretum';

//Initial Prices of each building
tileImage[2].cost = 500000;
tileImage[3].cost = 750000;
tileImage[4].cost = 1000000;
tileImage[5].cost = 450000;
tileImage[6].cost =	800000;
tileImage[7].cost = 550000;
tileImage[8].cost = 650000;
tileImage[9].cost = 300000;
tileImage[10].cost = 100000000;
tileImage[11].cost = 750000;


//Karma Requirements for each building
function karmaRequirements(tileType){
    if(tileType == 2){ //Small Dorm
        return (money >= (tileImage[tileType]).cost);
    }
    if(tileType == 3){ //Bookstore
        return (money >= (tileImage[tileType]).cost && karma != 90);
    }
    if(tileType == 4){ //DRC
        return (money >= (tileImage[tileType]).cost && karma != 90);
    }
    if(tileType == 5){//BBALL
        return (money >= (tileImage[tileType]).cost && karma != 90);
    }
    if(tileType == 6){//large dorm
        return (money >= (tileImage[tileType]).cost && karma != 90);
    }
    if(tileType == 7){//fountain
        return (money >= (tileImage[tileType]).cost && karma != 90);
    }
    if(tileType == 8){//dining hall
        return (money >= (tileImage[tileType]).cost && karma != 90);
    }
    if(tileType == 9){//gym
        return (money >= (tileImage[tileType]).cost && karma != 90);
    }
    if(tileType == 10){//chancellor house
        return (money >= (tileImage[tileType]).cost && karma != 90);
    }
    if(tileType == 11){//arboretum
	    return (money >= (tileImage[tileType]).cost && karma != 90);
	}
    return true;
}


//################################################################

//###### Building Menu Descriptions ######

//Template for descriptions at https://www.dropbox.com/s/bmgzy6bnhyv4ro0/template.png?dl=0

var buildMenuDescSource = new Array();
buildMenuDescSource.push('https://www.dropbox.com/s/5nahgjmvrjtt3wr/dormdesc.png?raw=1');
buildMenuDescSource.push('https://www.dropbox.com/s/gp3yg8z62vcxgou/basketball%20court%20desc_zps9hinmg1r.PNG?raw=1'); //Basketball court
buildMenuDescSource.push('https://www.dropbox.com/s/trwag1hhrcl16ln/Bigger%20dorm%20desc_zps1okk5apf.png?raw=1'); //Bigger dorm
buildMenuDescSource.push('https://www.dropbox.com/s/9lleeigzeparqwd/Dining%20hall%20desc_zpswpmqjnuj.png?raw=1');//Dining Hall
buildMenuDescSource.push('https://i.imgur.com/k3aCtNZ.png'); // bookstore
buildMenuDescSource.push('https://www.dropbox.com/s/kqlbklbbs3tr66x/fountain%20desc_zpsd9gonwck.png?raw=1'); // fountain
buildMenuDescSource.push('https://i.imgur.com/jHXoTNV.png'); //darc
buildMenuDescSource.push('https://i1378.photobucket.com/albums/ah103/madetobore/Game%20desc/Gym%20desc_zpsqm2cqmg7.png'); // gym desc
buildMenuDescSource.push('http://i.imgur.com/pGEjE4j.png');
buildMenuDescSource.push('https://www.dropbox.com/s/fx6ca9b8kwt81ec/chancelhouse.png?raw=1');

var buildMenuDesc = new Array();

for(var i in buildMenuDescSource){
    var image = new Image();
    image.src = buildMenuDescSource[i];
    buildMenuDesc.push(image);
}
//#######################################


/*var bg = new Image();
bg.src = source[0];

var play = new Image();
play.src = source[1];

var bgm = document.getElementById('bgm');
*/

//############Builds Grid#

var worldData = [];

function buildWorld(worldData, worldSize) {
    for (var i = 0; i <= worldSize; i++) {
        worldData[i] = [];
        for (var j = 0; j <= worldSize; j++) {
            if (i == 0 || i == worldSize || j == 0 || j == worldSize) {
                worldData[i][j] = 1;
            }
            else {
                worldData[i][j] = 0;
            }
        }
    }
}
var worldSize = 18;
buildWorld(worldData, worldSize);

var HUD = new Image();
HUD.src = source[4];
var HUDArrow = new Image();
HUDArrow.src = miscSrc[0];

function renderWorld() {
    for (var i in worldData) {
        for (var j in worldData[i]) {
            var x = i * TILE_HEIGHT;
            var y = j * TILE_HEIGHT;
            var tileType = worldData[i][j];
            placeTile(tileType, twoDToIso(x, y));
        }
    }
}

function renderWorldBorder() {
    context.globalAlpha = 0.3;
    for (var i in worldData){
            var x = i * TILE_HEIGHT;
            var y = worldSize * TILE_HEIGHT;
            var tileType = worldData[i][worldSize];
            placeTile(tileType, twoDToIso(x, y));
    }
    for (var i in worldData){
            x = worldSize * TILE_HEIGHT;
            y = i * TILE_HEIGHT;
            tileType = worldData[worldSize][i];
            placeTile(tileType, twoDToIso(x, y));
    }
    context.globalAlpha = 1;
}


function drawHouse(target){
    var x = mouseOnGrid().x;
    var y = mouseOnGrid().y;
    var tileType = target;
    if(x < 1) x = 1;
    if(y < tileImage[tileType].yspace) y = tileImage[tileType].yspace;
    if(x > worldSize - tileImage[tileType].xspace) x = worldSize - tileImage[tileType].xspace;
    if(y > worldSize - 1) y = worldSize - 1;
    x *= TILE_HEIGHT;
    y *= TILE_HEIGHT;
    placeTile(tileType, twoDToIso(x, y));
}

function mouseOnGrid(){
    var x = Math.floor(((mouseY - worldView.y) / TILE_HEIGHT) + ((mouseX - worldView.x - TILE_WIDTH) / TILE_WIDTH));
    var y = Math.floor(((mouseY - worldView.y + 0.4*TILE_HEIGHT) / TILE_HEIGHT) - ((mouseX - worldView.x) / TILE_WIDTH));
    //var x = Math.floor(mouseX/TILE_WIDTH - mouseY/TILE_HEIGHT);
    //var y = Math.floor(mouseY/TILE_HEIGHT + mouseX/TILE_WIDTH);
    //if(x < 1) x = 1;
    //if(y < 1) y = 1;
    //if(x > worldSize - 1) x = worldSize - 1;
    //if(y > worldSize - 1) y = worldSize - 1;
    return {x: x, y: y};
}

function placeTile(tileType, location) {
    if ((location.x >= -50 && location.x < canvas.width) && (location.y >= -20 && location.y < canvas.height)) {
        if (tileType == 0) {
            context.drawImage(tileImage[0], location.x, location.y, TILE_WIDTH, TILE_HEIGHT);
        }
        else if (tileType == 1) {
            context.drawImage(tileImage[1], location.x, location.y - (heightScale(tileImage[1]) - TILE_HEIGHT), TILE_WIDTH, heightScale(tileImage[1]));
        }
        else if (tileType >= 2) {
            context.drawImage(tileImage[tileType], location.x, location.y - tileImage[tileType].yscale*(heightScale(tileImage[tileType]) - TILE_HEIGHT), tileImage[tileType].xscale*TILE_WIDTH, tileImage[tileType].xscale*heightScale(tileImage[tileType]));
        } else if (tileType == 'construct') {
            context.drawImage(constructionImage, location.x, location.y - constructionImage.yscale*(heightScale(constructionImage) - TILE_HEIGHT), constructionImage.xscale*TILE_WIDTH, constructionImage.xscale*heightScale(constructionImage));
        }
    }

}

function heightScale(image){
    var widthScale = image.width/TILE_WIDTH;
    var newHeight = image.height/widthScale;
    return newHeight;
}

function twoDToIso(pointX, pointY) {
    var Point = {
        x: pointX - pointY + worldView.x,
        y: (pointX + pointY) / 2 + worldView.y
    };
    return Point;
}


function isCollide(a, b) {
    return (
        a.x < (b.x + b.width)  && 
        (a.x + a.width)  > b.x &&
		a.y < (b.y + b.height) && 
        (a.y + a.height) > b.y
    );
}



function buildingsMenu(){
    
    this.click = function(){
        var currentNumberOfMenuStates = 2;
        var arrowCol = {x: 1100, y: 520, width:40, height:40};
        var mouseA = {x:mouseX, y:mouseY, width:0, height:0};
        if(isCollide(mouseA, arrowCol) && buildMenuState < 2) {
            buildMenuState = buildMenuState + 1;
            if(buildMenuState > currentNumberOfMenuStates - 1){
                buildMenuState = 0;
            }
        }
        
        var itemsPerMenuState = 6;
        if(buildMenuState == 0) {
            for(i = 2; i < itemsPerMenuState + 2; i++){
                var mouse = {x:mouseX, y:mouseY, width: 0, height: 0};
                var image = tileImage[i];
                var collisionBox = {x:220 + 150 * (i - 2), y: 530 - tileImage[i].yscale*(heightScale(tileImage[i]) - TILE_HEIGHT), width: image.xscale*TILE_WIDTH, height: image.yscale*heightScale(image)};
                if(isCollide(mouse, collisionBox) && karmaRequirements(i) ){
                    target = i;
                    break;
                } else if(isCollide(mouse, collisionBox) && !karmaRequirements(i)){
                    var floating = new floatingText('karmaReq', mouseX, mouseY);
                    floatingTextArray.push(floating);
                    break;
                } else if(mouseY > 490){
                    target = undefined;
                }
            }
        }else if(buildMenuState == 1) {
            // select the second page of images (make a new arr to hold them)
            for(i = 8; i < itemsPerMenuState + 8; i++){
                if(i < tileImage.length){
                    var mouse = {x:mouseX, y:mouseY, width: 0, height: 0};
                    var image = tileImage[i];
                    var collisionBox = {x:220 + 150 * (i - 8), y: 530 - tileImage[i].yscale*(heightScale(tileImage[i]) - TILE_HEIGHT), width: image.xscale*TILE_WIDTH, height: image.yscale*heightScale(image)};
                    if(isCollide(mouse, collisionBox)){
                        target = i;
                        break;
                    } else if(mouseY > 490){
                        target = undefined;
                    }
                }
            }
        }
    };
    
    this.update = function(){
    };
    
    this.hover = function(){
        if(buildMenuState == 0) {
            for(i = 2; i < tileImage.length; i++){
                var mouse = {x:mouseX, y:mouseY, width: 0, height: 0};
                var image = tileImage[i];
                var collisionBox = {x:220 + 150 * (i - 2), y: 530 - tileImage[i].yscale*(heightScale(tileImage[i]) - TILE_HEIGHT), width: image.xscale*TILE_WIDTH, height: image.yscale*heightScale(image)};
                if(isCollide(mouse, collisionBox)){
                    //draws building info
                    if(i == 2){
                        context.drawImage(buildMenuDesc[0], mouseX - 20, mouseY - buildMenuDesc[0].height);
                        context.fillStyle = 'red';
                        context.font = "17px 'Comic Sans MS'";
                        context.fillText(numberWithCommas(tileImage[i].cost), mouseX - 20 + 64, mouseY - buildMenuDesc[0].height + 156, 87);
                    }
                    if(i == 3){
                        context.drawImage(buildMenuDesc[4], mouseX - 20, mouseY - buildMenuDesc[4].height);
                        context.fillStyle = "rgba(255,254,236,1)";
                        context.fillRect(mouseX - 20 + 64, mouseY - buildMenuDesc[4].height + 125, 80, 25);
                        context.fillStyle = 'red';
                        context.font = "17px 'Comic Sans MS'";
                        context.fillText(numberWithCommas(tileImage[i].cost), mouseX - 20 + 66, mouseY - buildMenuDesc[4].height + 145, 87);
                    }
                    if(i == 4){
                        context.drawImage(buildMenuDesc[6], mouseX - 20, mouseY - buildMenuDesc[6].height);
                        context.fillStyle = "rgba(255,254,236,1)";
                        context.fillRect(mouseX - 20 + 64, mouseY - buildMenuDesc[6].height + 125, 80, 25);
                        context.fillStyle = 'red';
                        context.font = "17px 'Comic Sans MS'";
                        context.fillText(numberWithCommas(tileImage[i].cost), mouseX - 20 + 64, mouseY - buildMenuDesc[6].height + 145, 87);
                    }
                    if(i == 5){
                        context.drawImage(buildMenuDesc[1], mouseX - 20, mouseY - buildMenuDesc[1].height);
                        context.fillStyle = "rgba(255,254,236,1)";
                        context.fillRect(mouseX - 20 + 64, mouseY - buildMenuDesc[1].height + 125, 80, 25);
                        context.fillStyle = 'red';
                        context.font = "17px 'Comic Sans MS'";
                        context.fillText(numberWithCommas(tileImage[i].cost), mouseX - 20 + 66, mouseY - buildMenuDesc[1].height + 140, 87);
                    }
                    if(i == 6){
                        context.drawImage(buildMenuDesc[2], mouseX - 20, mouseY - buildMenuDesc[2].height);
                        context.fillStyle = "rgba(255,254,236,1)";
                        context.fillRect(mouseX - 20 + 64, mouseY - buildMenuDesc[2].height + 125, 80, 25);
                        context.fillStyle = 'red';
                        context.font = "17px 'Comic Sans MS'";
                        context.fillText(numberWithCommas(tileImage[i].cost), mouseX - 20 + 66, mouseY - buildMenuDesc[2].height + 140, 87);
                    }
                    if(i == 7){
                        context.drawImage(buildMenuDesc[5], mouseX - 20, mouseY - buildMenuDesc[5].height);
                        context.fillStyle = "rgba(255,254,236,1)";
                        context.fillRect(mouseX - 20 + 64, mouseY - buildMenuDesc[5].height + 125, 80, 25);
                        context.fillStyle = 'red';
                        context.font = "17px 'Comic Sans MS'";
                        context.fillText(numberWithCommas(tileImage[i].cost), mouseX - 20 + 66, mouseY - buildMenuDesc[5].height + 145, 87);
                    }
                }
            }
        }
        
        if(buildMenuState == 1) {
            for (i = 8; i < tileImage.length; i++){
                var mouse = {x:mouseX, y:mouseY, width: 0, height: 0};
                var image = tileImage[i];
                var collisionBox = {x:220 + 150 * (i - 8), y: 530 - tileImage[i].yscale*(heightScale(tileImage[i]) - TILE_HEIGHT), width: image.xscale*TILE_WIDTH, height: image.yscale*heightScale(image)};
                if(isCollide(mouse,collisionBox)){
                    if(i == 8){
                        context.drawImage(buildMenuDesc[3], mouseX - 20, mouseY - buildMenuDesc[3].height);
                        context.fillStyle = "rgba(255,254,236,1)";
                        context.fillRect(mouseX - 20 + 64, mouseY - buildMenuDesc[3].height + 125, 80, 25);
                        context.fillStyle = 'red';
                        context.font = "17px 'Comic Sans MS'";
                        context.fillText(numberWithCommas(tileImage[i].cost), mouseX - 20 + 66, mouseY - buildMenuDesc[3].height + 139, 87);
                    }
                    if(i == 9){
                        context.drawImage(buildMenuDesc[7], mouseX - 20, mouseY - buildMenuDesc[7].height);
                        context.fillStyle = "rgba(255,254,236,1)";
                        context.fillRect(mouseX - 20 + 64, mouseY - buildMenuDesc[7].height + 125, 80, 25);
                        context.fillStyle = 'red';
                        context.font = "17px 'Comic Sans MS'";
                        context.fillText(numberWithCommas(tileImage[i].cost), mouseX - 20 + 66, mouseY - buildMenuDesc[7].height + 139, 87);
                    }
                    if(i == 10){
                        context.drawImage(buildMenuDesc[9], mouseX - 20, mouseY - buildMenuDesc[9].height);
						context.fillStyle = 'red';
                        context.font = "17px 'Comic Sans MS'";
                        context.fillText(numberWithCommas(tileImage[i].cost), mouseX - 20 + 64, mouseY - buildMenuDesc[9].height + 156, 87);
                    }
                    if(i == 11){
						context.drawImage(buildMenuDesc[8], mouseX - 20, mouseY - buildMenuDesc[8].height);
						context.fillStyle = 'red';
                        context.font = "17px 'Comic Sans MS'";
                        context.fillText(numberWithCommas(tileImage[i].cost), mouseX - 20 + 64, mouseY - buildMenuDesc[8].height + 156, 87);
					}
                }
                
            }
        }
    };
    
    this.draw = function(){
        context.drawImage(HUDArrow, 1100, 520);
        
        var itemsPerMenuState = 6;
        if(buildMenuState == 0) {
            for(var i = 2; i < itemsPerMenuState + 2; i++){
                //var image = tileImage[i];
                //context.drawImage(image, x, 510);
                //x += 100;
                if(!karmaRequirements(i)){
                    context.globalAlpha = 0.3;   
                }
                placeTile(i, {x:220 + 150*(i - 2) ,y: 530});
                if(!karmaRequirements(i)){
                    context.globalAlpha = 1;
                }
                context.font = "15px 'Comic Sans MS'";
                if(karmaNeg == true){
                    context.fillStyle = 'red';
                }else if(karmaNeg == false){
                    context.fillStyle = 'blue';
                }
                context.fillText(tileImage[i].name, 220 + 150*(i-2), 580);
            }
        }else if(buildMenuState == 1) {
            // draw the second page of buildings
            for(var i = 8; i < itemsPerMenuState + 8; i++){
                if(i < tileImage.length){
                    placeTile(i, {x:220 + 150*(i - 8) ,y: 530});
                    context.font = "15px 'Comic Sans MS'";
                    if(karmaNeg == true){
                        context.fillStyle = 'red';
                    }else if(karmaNeg == false){
                        context.fillStyle = 'blue';
                    }
                    if(i == 8){
                        context.fillText(tileImage[i].name, 235, 580);  
                    } else if(i == 9){
                        context.fillText(tileImage[i].name, 220 + 180*(i-8), 580);       
                    } else if (i == 11){
                        context.fillText(tileImage[i].name, 220 + 155*(i-8), 580);  
                    } else{
                        context.fillText(tileImage[i].name, 220 + 150*(i-8), 580);                       
                    }
                }
            }
        }
        
        this.hover();
    };
}

var buildingMenu = new buildingsMenu();

// draw info box when click on building
function infoBox(){
    this.draw = function() {
        if(showInfoTarget != undefined){
            var descr = new Image();
            descr.src = 'https://www.dropbox.com/s/9ug64hf5ctz73um/buildingselect.png?raw=1';
            context.drawImage(descr, 0, 50, 250, 130);
            context.fillStyle = 'black';
            context.font = "10px Arial";
            context.fillText('building name: ',50, 80 );
            context.fillText(tileImage[showInfoTarget.tileType].name, 150, 80);
            context.fillText('Building created on: ', 50, 100);
            context.fillText("Day " + showInfoTarget.timeBuilt, 150, 100);
            if(showInfoTarget.isConstruction){
                context.fillText('Days until built: ', 50, 130);
                context.fillText(Math.floor(1 + showInfoTarget.timeBuilt + showInfoTarget.constructionTime - timeing.time), 150, 130);
            } else {
                context.fillText('Days until collection: ', 50, 130);
                if(Math.floor(showInfoTarget.timer + showInfoTarget.collectTime - timeing.time) >= 0){
                    context.fillText(Math.floor(1 + showInfoTarget.timer + showInfoTarget.collectTime - timeing.time), 150, 130);
                } else {
                    context.fillText("Collect now!", 150, 130);
                }
            }
        }
    };
}

drawbox = new infoBox();


function building(tileType, x, y){
    this.tileType = tileType;
    this.x = x;
    this.y = y;
    this.isActive = false;
    this.isConstruction = true;
    this.timeBuilt = Math.floor(timeing.time);
    this.timer;
    this.collectable = false;
    this.constructionTime;
    this.collectTime;
    this.moneyToCollect;
    this.built = false;

    if(this.tileType == 2){ //Small Dorm
    	this.constructionTime = 3;
    	this.collectTime = 3;
    	this.moneyToCollect = 50000;
    }
    if(this.tileType == 3){ //Bookstore
    	this.constructionTime = 5;
    	this.collectTime = 5;
    	this.moneyToCollect = 70000;
    }
    if(this.tileType == 4){ //DARC
    	this.constructionTime = 14;
    	this.collectTime = 28;
    	this.moneyToCollect = 100000;
    }
    if(this.tileType == 5){ // BasketBall
    	this.constructionTime = 3;
    	this.collectTime = Infinity; //cant be collected from
    	this.moneyToCollect = 0;
    }
    if(this.tileType == 6){ //Large Dorm
    	this.constructionTime = 32;
    	this.collectTime = 32;
    	this.moneyToCollect = 200000;
    }
    if(this.tileType == 7){ //Fountain
    	this.constructionTime = 1;
    	this.collectTime = Infinity; //cant be collected from
    	this.moneyToCollect = 0;
    }
    if(this.tileType == 8){ //Dining Hall
    	this.constructionTime = 14;
    	this.collectTime = 14;
    	this.moneyToCollect = 60000;
    }
    if(this.tileType == 9){ //Gym
    	this.constructionTime = 32;
    	this.collectTime = 64;
    	this.moneyToCollect = 300000;
    }
    if(this.tileType == 10){ //Chancellor House
    	this.constructionTime = 192;
    	this.collectTime = 192;
    	this.moneyToCollect = 30000000;
    }
    if(this.tileType == 11){ //Arboretum
        this.constructionTime = 24;
        this.collectTime = 24;
        this.moneyToCollect = 50000;
    }

    this.click = function(){
    	for(var i = 0; i < tileImage[tileType].xspace; i++){
            for(var j = 0; j < tileImage[tileType].yspace; j++){
               	if(mouseOnGrid().x == (this.x + i) && mouseOnGrid().y == (this.y - j)){
               	    //if(!this.isConstruction) {
               	      //  showInfo = true;
               	    //}
               	    //console.log(Math.floor((this.timeBuilt + this.constructionTime) - timeing.time));
               	    if(target == undefined){
               	        showInfoTarget = this;
               	    }
               	    

    				if(this.collectable){
                        ching.play();
    					this.isActive = true;
    					this.collectable = false;
    					this.timer = Math.floor(timeing.time);
    					money += this.moneyToCollect;
    				} else if (this.built == false){
    				    construct.play();
    				    this.built = true;
    				}
    			}
            }
        }
    };

    
    
    this.update = function(){
        //console.log('updating');
        
    	if(this.isConstruction){
    	    //console.log(this.timeBuilt + this.constructionTime);
    		if(timeing.time >= (this.timeBuilt + this.constructionTime)){
    			this.isConstruction = false;
    			//console.log('construction done!');
    			this.isActive = true;
    			buildingMap[x][y] = this.tileType;
    			this.timer = Math.floor(timeing.time);
    		}

    	} else {
    		if(this.isActive){
    		    //if(showInfo == true) {
    		        //drawbox = new infoBox(this.tileType, this.timeBuilt, ((this.timer + this.collectTime) - timeing.time));
    		    //}
    			if(timeing.time >= (this.timer + this.collectTime)){
    			    audio.play();
    				this.collectable = true;
    				this.isActive = false;
    				//console.log("can collect!");
    				
    			}
    		} 

    	}

    };
    
    
    this.draw = function(){
        if(this.isConstruction){
            for(var i = 0; i < tileImage[tileType].xspace; i++){
                for(var j = 0; j < tileImage[tileType].yspace; j++){
                    var x1 = (this.x + i) * TILE_HEIGHT;
                    var y2 = (this.y - j) * TILE_HEIGHT;
                    placeTile('construct', twoDToIso(x1, y2));
                }
            }
                    
        }
        //console.log(this.timeBuilt);
        //if(showInfo == true){
            //drawbox.draw();
        //}

    };
    
    
    
}

var buildingArray = new Array();




var buildingMap = new Array(worldSize).fill(0);
for(var i in buildingMap){
    buildingMap[i] = new Array(worldSize).fill(0);
}
//buildWorld(buildingMap, worldSize);
var target = undefined;

function buildingsOnMap(){
    
    this.click = function() {
        if(target != undefined){
            var x = mouseOnGrid().x;
            var y = mouseOnGrid().y;
            var tileType = target;
            if(x < 1) x = 1;
            if(y < tileImage[tileType].yspace) y = tileImage[tileType].yspace;
            if(x > worldSize - tileImage[tileType].xspace) x = worldSize - tileImage[tileType].xspace;
            if(y > worldSize - 1) y = worldSize - 1;
            if(mouseOnGrid().x < 0 || mouseOnGrid().x > worldSize || mouseOnGrid().y < 0 || mouseOnGrid().y > worldSize){
                target = undefined;
            } else {
                var hasA = false;
                for(var i = 0; i < tileImage[tileType].xspace; ++i){
                    for(var j = 0; j < tileImage[tileType].yspace; ++j){
                        if(buildingMap[x + i][y - j] == 'b' || buildingMap[x + i][y - j] > 0) {
                            hasA = true;
                        }
                    }
                }
                
                
                if(hasA == false){
                    for(var i = 0; i < tileImage[tileType].xspace; i++){
                        for(var j = 0; j < tileImage[tileType].yspace; j++){
                            buildingMap[x + i][y - j] = 'b';
                        }
                    }
                    //buildingMap[x][y] = target;
                    var build = new building(target, x, y);
                    buildingArray.push(build);
                    
                    var floating = new floatingText(target, x, y);
                    
                    if(target == 2){ //Price of Small Dorm
                        money -= tileImage[target].cost;
                        karma += 3;
                        var floating = new floatingText(target, x, y);
                        tileImage[target].cost = Math.floor(tileImage[target].cost * 1.2);
                        
                    }
                    if(target == 3){ // Price of Bookstore
						money -= tileImage[target].cost;
						karma -= 2;
						tileImage[target].cost = Math.floor(tileImage[target].cost * 1.4);
						
					}
					if(target == 4){ // Price of DRC
						money -= tileImage[target].cost;
						karma -= 2;
						tileImage[target].cost = Math.floor(tileImage[target].cost * 1.4);
						
					}
					if(target == 5){ // Price of BBall court
						money -= tileImage[target].cost;
						karma += 2;
						tileImage[target].cost = Math.floor(tileImage[target].cost * 1.1);
						
					}
					if(target == 6){ // Price of large dorm
						money -= tileImage[target].cost;
						karma += 3;
						tileImage[target].cost = Math.floor(tileImage[target].cost * 1.5);
						
					}
					if(target == 7){ //Price of Fountain
						money -= tileImage[target].cost;
						karma += 2;
						tileImage[target].cost = Math.floor(tileImage[target].cost * 1.05);
						
					}
					if(target == 8) {
					    money -= tileImage[target].cost;
					    karma += 10;
					    tileImage[target].cost = Math.floor(tileImage[target].cost * 1.75);
					    
					}
					if(target == 9) {
					    money -= tileImage[target].cost;
					    karma += 3;
					    tileImage[target].cost = Math.floor(tileImage[target].cost * 2);
					}
					if(target == 10) {
					    money -= tileImage[target].cost
					    karma -= 100;
					    tileImage[target].cost = Math.floor(tileImage[target].cost * 5);
					}
					if(target == 11){//Arboretum
					    money -= tileImage[target].cost;
					    karma -= 3;
					    tileImage[target].cost = Math.floor(tileImage[target].cost * 2.8);
					}
                    floatingTextArray.push(floating);
                    target = undefined;
                }
            }
        }
    };
    
    this.draw = function() {
        if(target != undefined){
            drawHouse(target);
        }
        //var i = 0;
        for(var j = 0; j < buildingMap.length; j++){
            for(var i=0; i < buildingMap.length; i++){
                if(buildingMap[i][j] >= 2){
                    if(target != undefined){
                        if(mouseOnGrid().x < i || mouseOnGrid().y < j){
                            drawHouse(target);
                        }
                        context.globalAlpha = 0.4;
                    }
                    var x = i * TILE_HEIGHT;
                    var y = j * TILE_HEIGHT;
                    var tileType = buildingMap[i][j];
                    //if(tileType == 2) money += 1000;
                    placeTile(tileType, twoDToIso(x, y));
                    if((i+2) > worldSize && (j-1) > 0 && tileImage[tileType].yspace != 1){
                        var othertileType = buildingMap[i+2][j-1];
                        if(tileImage[tileType].yspace == 2 && (i + 2) >= 0 && (j - 1) <= worldSize && othertileType != 'b'){
                            if(tileImage[othertileType].yspace == 1){
                                var newX = (i+2) * TILE_HEIGHT;
                                var newY = (j-1) * TILE_HEIGHT;
                                placeTile(othertileType,twoDToIso(newX, newY));
                            }
                        }
                    }
                    var succ = 1;
                    while(i + succ < worldSize){
                        var next = buildingMap[i+succ][j-1];
                        if(next != 'b' && next >= 2){
                            var succX = (i + succ) * TILE_HEIGHT;
                            var succY = (j-1) * TILE_HEIGHT;
                            placeTile(next,twoDToIso(succX,succY));
                        }
                        succ += 1;
                    }
                    context.globalAlpha = 1;
                    if(target != undefined){
                        if(mouseOnGrid().x > i || mouseOnGrid().y > j){
                            drawHouse(target);
                        }
                    }
                    var clone = buildingMap;
                    buildingMap = clone;
                }
            }
            
        }
    };
}

var buildingOnMap = new buildingsOnMap();

function collectNoftification(){
    
    for(var i in buildingArray){
        if(buildingArray[i].collectable){
            var image = new Image();
            image.src = source[6];
            var X = buildingArray[i].x * TILE_HEIGHT;
            var Y = buildingArray[i].y * TILE_HEIGHT;
            context.drawImage(image,twoDToIso(X,Y).x - 5 + tileImage[buildingArray[i].tileType].yspace*TILE_HEIGHT/4 + tileImage[buildingArray[i].tileType].xspace*TILE_HEIGHT/2, twoDToIso(X,Y).y - 10, 42, 50);
        }
    }
    
}





var mouseX;
var mouseY;

canvas.addEventListener('mousemove', function(e){
    var rect = canvas.getBoundingClientRect();
    mouseX = Math.floor(e.clientX - rect.left + 8);
    mouseY = Math.floor(e.clientY - rect.top + 8);
});

canvas.addEventListener('click', function(e){
    if(mouseY > 490) buildingMenu.click();
    else{
        if(mouseOnGrid().x < 0 || mouseOnGrid() < 0 || mouseOnGrid().x > worldSize || mouseOnGrid().y > worldSize){
            showInfoTarget = undefined;
        }
        buildingOnMap.click();
        for(var i in buildingArray){
//            audio.play();
            buildingArray[i].click();
        }
    }
});

//Pauses and unpauses when 'P' is pressed
document.addEventListener('keydown', keyDown, false);

function keyDown(e){
	if(e.keyCode == 80) audio.play(), pauseGame();
	if(regentPop && (!gameLost) && e.keyCode == 32) regentPop = false;
	//if(gameLost && e.keyCode == 32) init();
	if(e.keyCode == 13) audio.play(), startGame();
	if(e.keyCode == 27 && startGame == true)drawmenuimg.draw();;
/*	
	if(atOptionMenu) {
	    if(e.keyCode == 27) {
	        atOptionMenu = false;
	    }
	}
	
	if(atCreditMenu) {
	    if(e.keyCode == 27) {
	        atCreditMenu = false;
	    }
	}
*/
}

/*
document.addEventListener('click', menuclick);

function menuclick(e){
    if(e.clientX >= 790 && e.clientX <= 950 && e.clientY >= 340 && e.clientY <= 380) {
        startGame();
    }
    
    if(e.clientX >= 790 && e.clientX <= 950 && e.clientY >= 425 && e.clientY <= 460 && gameStart == true) {
        atOptionMenu = true;
		drawOption();
    }
    
    if(e.clientX >= 790 && e.clientX <= 950 && e.clientY >= 500 && e.clientY <= 540 && gameStart == true) {
        atCreditMenu = true;
		drawCredit();
    }
    console.log('mousex:', e.clientX);
    console.log('mousey: ', e.clientY);
}
*/

function pauseGame(){
    if(gameLost) {

    }
    console.log(gamePaused);
	if(!gamePaused){
		clearInterval(game);
		gamePaused = true;
		song.pause();
		paused = setInterval(pauseMenu(), 30);
	} else if(gamePaused){
	    song.play();
		game = setInterval(game_loop, 30);
		gamePaused = false;
		clearInterval(paused);
		
	}
}

function startGame(){
	if(gameStart){
		game = setInterval(game_loop, 30);
		gameStart = false;
		gamePaused = false;
	}
}

function drawMenu() {
    //context.fillRect(0,0,1200,600);
    this.draw = function() {
        context.drawImage(menuimg, 0,0);
    }
    
        console.log('mousex: ',mouseX);
        console.log('mousey: ',mouseY);
}

var drawmenuimg = new drawMenu();

function pauseMenu() {
    
    context.font = '60px Arial';
    context.fillStyle = 'red';
    context.fillText(pauseText, 500, 250);


}



function drawOption() {
    
    context.fillStyle = 'black';
    context.fillRect(0,0,1200,600);
    context.fillStyle = 'white';
    var optiontext = 'placeholder, press esc to go back';
    context.fillText(optiontext, 500, 250);

}

function drawCredit() {
    
    context.fillStyle = 'black';
    context.fillRect(0,0,1200,600);
    context.fillStyle = 'white';
    var optiontext = 'placeholder, press esc to go back';
    context.fillText(optiontext, 500, 250);
}


function floatingText(tileType, x, y){
    this.tileType = tileType;
    this.x = twoDToIso(x * TILE_HEIGHT, y * TILE_HEIGHT).x;
    this.y = twoDToIso(x * TILE_HEIGHT, y * TILE_HEIGHT).y;
    this.alpha = 1;
    this.isLive = true;
    var moneyText;
    var karmaText;
    
    if(tileType == 'karmaReq'){
        this.x = x;
        this.y = y;
    } else {
        moneyText = "-" + numberWithCommas(tileImage[tileType].cost);
    }
    
    this.update = function(){
        this.alpha -= .02;
        this.y -= 1;
        if(this.alpha <= 0){
            this.alpha = 0;
            this.isLive = false;
        }
    };
    
    this.draw = function(){
        if(tileType == 'karmaReq'){
            context.globalAlpha = this.alpha;
            context.font = "15px 'Comic Sans MS'";
            context.fillStyle = 'red';
            context.fillText('Not enough Money/Karma!', this.x - 100, this.y);
            context.globalAlpha = 1;
        } else {
            if(tileType == 2){
                //moneyText = numberWithCommas(tileImage[tileType].cost);
                karmaText = 'Karma: +3';
            }
            if(tileType == 3){
                //moneyText = '-750,000';
                karmaText = 'Karma: -1';
            }
            if(tileType == 4){
                //moneyText = '-1,000,000';
                karmaText = 'Karma: +5';
            }
            if(tileType == 5){
                //moneyText = '-450,000';
                karmaText = 'Karma: +2';
            }
            if(tileType == 6){
                //moneyText = '-800,000';
                karmaText = 'Karma: +3';
            }
            if(tileType == 7){
                //moneyText = '-550,000';
                karmaText = 'Karma: +2';
            }
            if(tileType == 8){
                //moneyText = '-650,000';
                karmaText = 'Karma: +10';
            }
            if(tileType == 9) {
                //moneyText = '-300,000';
                karmaText = 'Karma: +3';
            }
            if(tileType == 10) {
                //moneyText = '-100,000,000'
                karmaText = 'Karma: -100'
            }
            if(tileType == 11){
                //moneyText = '-750,000';
                karmaText = 'Karma: -3';
            }
        
            context.globalAlpha = this.alpha;
            context.font = "15px 'Comic Sans MS'";
            context.fillStyle = 'red';
            context.fillText(moneyText, this.x + 1.5*tileImage[tileType].yspace*TILE_HEIGHT + TILE_HEIGHT, this.y);
            context.fillStyle = 'blue';
            context.fillText(karmaText, this.x + 1.5*tileImage[tileType].yspace*TILE_HEIGHT + TILE_HEIGHT, this.y + 17);
            context.globalAlpha = 1;
        }
    };
}

var floatingTextArray = new Array();

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function HUDscore(){
    context.font = "30px 'Comic Sans MS'";
    context.fillStyle = "black";
    context.fillText(numberWithCommas(money), 50,30, 240);
    if(karmaNeg == false) {   
        context.fillStyle = 'blue';
        context.fillText(karma, 1050, 30);
    }else if(karmaNeg == true){
        context.fillStyle = 'red';
        context.fillText(karma, 1050, 30);
    }
}

// timer

function time2(){
    this.time = 0;
    this.increment = .018;
       
    this.update = function(){
         this.time += this.increment;
         daysLeftCheck = daysLeftCheck - .018;
         if (Math.abs(this.time - regentTimeCheck) < 1) {
             regentPop = true;
             if(money < regentMoneyCheck) {
                 gameLost = true;
                 pauseGame();
             }
             if((studentWarning) && karma < 5){
                 gameLost = true;
                 pauseGame();
             }
            if(firstWarning && karma < 5) {
                 studentWarning = true;
             }
             if((!firstWarning) && karma < 5) {
                 firstWarning = true;
             }
             curRMC = regentMoneyCheck;
             regentTimeCheck = regentTimeCheck + 54;
             daysLeftCheck = curRMC;
             regentMoneyCheck = regentMoneyCheck * 1.2;
             console.log('regentpop:', regentPop);
         }
    };
    
    this.draw = function(){
        console.log('time:', this.time);
        var current = Math.floor(this.time);
        var year = Math.floor(current/365);
        current = current - 365*year;
        var month = Math.floor(current/32);
        current = current - 32*month;
        var week = Math.floor(current/7);
        current = current - 7*week;
        var day = Math.floor(current);
        
        context.fillStyle = 'black';
        context.font = "15px 'Comic Sans MS'";
        context.fillText("Year: " + (year + 1), 350, 30);
        context.fillText("Month: " + (month + 1), 450, 30);
        context.fillText("Week: " + (week + 1), 700, 30);
        context.fillText("Day: " + (day + 1), 800, 30);
        context.fillText('You need   $', 900, 400);
        context.fillText(regentMoneyCheck, 990, 400);
        context.fillText('for next checkup', 1060, 400);
        
        context.fillText(Math.floor(daysLeftCheck), 900, 420);
        context.fillText('days until next checkup', 930, 420);
        
    };
    
    
}

var timeing = new time2();



/*
function update(){
    buildingMenu.update();
    
    console.log('updating');
    
    var updateArray = new Array();
    
    for(var i in floatingTextArray){
        if(floatingTextArray[i].isLive){
            updateArray.push(floatingTextArray[i]);
        }
        floatingTextArray[i].update();
    }
    
    floatingTextArray = updateArray;
}
*/

function update2() {
    //watch.update();
    if(karma < 0) {
        karmaNeg = true;
    }else{
        karmaNeg = false;
    }
    buildingMenu.update();
    

    timeing.update();
    //console.log('xxxx');
    
    for(var i in buildingArray){
            buildingArray[i].update();
    }
    
    
    var updateArray = new Array();
    
    for(var i in floatingTextArray){
        if(floatingTextArray[i].isLive){
            updateArray.push(floatingTextArray[i]);
        }
        floatingTextArray[i].update();
    }
    
    floatingTextArray = updateArray;
    
    if(money < 0) {
        money = 0;
    }    
    
}

var temp = 0;


function draw(){

    canvas.width = canvas.width;
    
    //Draw Background
    context.fillStyle = "rgb(240,255,240)";
    context.fillRect(0,0,canvas.width, canvas.height);
    
    //Draws Grid
    renderWorld();
    
    for(var i in buildingArray){
        buildingArray[i].draw();
    }
    buildingOnMap.draw();
    
    
    //Draws trees above the grid
    renderWorldBorder();
    //Draws HUD
    context.drawImage(HUD, 0,0, canvas.width, canvas.height);
    
    drawbox.draw();
    collectNoftification();
    
    
    //Draws Money, Happiness
    HUDscore();
    
    buildingMenu.draw();

    for(var i in floatingTextArray){
        floatingTextArray[i].draw();
    }
    
    //Draws screen border
    context.strokeStyle = 'black';
    context.strokeRect(0, 0, canvas.width, canvas.height);
    
    //watch.draw();
    timeing.draw();
    
    temp += 1;
    //console.log(temp);
    
/*    if(gameStart) {
        drawmenuimg.draw();
    }*/
    
  //  if(atOptionMenu) {
    //    drawOption();
 //   }
 /*   if(atCreditMenu) {
        drawCredit();
    }
    */
    
    if(regentPop) {
        if(money < curRMC) {
            context.drawImage(pauseImage, 300,100);
            context.font = '15px Arial';
            context.fillStyle = 'red';
            context.fillText('Progress check!', 450, 150);
            context.fillText('Regent wants ', 450, 200);
            context.fillText(curRMC, 550, 200);
            context.fillText('You do not have enough money!', 450, 250);
            context.fillText('You are fired! Hit that F5.', 450, 300);
            
        }else if((!studentWarning) && karma < 5) {
            context.font = '15px Arial';
            context.fillStyle = 'red';
            context.drawImage(pauseImage, 300, 100);
            context.fillText("Progress check!", 450,150);
            context.fillText('Regent wants ', 450, 180);
            context.fillText(curRMC, 550, 180);
            context.fillText('You have enough money!', 450, 210);
            context.fillText('You can keep your job.', 450, 240);
            context.fillText('Warning! Students are protesting, improve your karma!', 350, 270);
            context.fillText('If your karma is below 5 by next check, you will be removed!', 350, 300);
            context.fillText('Press space to exit', 470, 380);
        }else if(studentWarning && karma < 5){
            context.drawImage(pauseImage, 300,100);
            context.font = '15px Arial';
            context.fillStyle = 'red';
            context.fillText('Progress check!', 450, 150);
            context.fillText('Your karma is still below 5!', 450, 200);
            context.fillText('The student protests are out of control!', 450, 250);
            context.fillText('We have no choice but to remove you', 450, 300);
            context.fillText('Better hit that F5.', 450, 350);
        }else{
            context.font = '15px Arial';
            context.fillStyle = 'red';
            context.drawImage(pauseImage, 300, 100);
            context.fillText("Progress check!", 400,150);
            context.fillText('Regent wants ', 400, 200);
            context.fillText(curRMC, 550, 200);
            context.fillText('You have enough money!', 400, 250);
            context.fillText('You can keep your job.', 400, 300);
            context.fillText('Remember, keep your karma above 5!', 400, 350);
        }
    }
}

function game_loop() {
    //update();
    update2();
    draw();
}


var preloadArray = new Array();


function preloadAssets() {
    for (var i in source) {
        var image = new Image();
        image.src = source[i];
        preloadArray.push(image);
    }
    drawmenuimg.draw();
}

function init() {
    
    song.play();
    song.loop = true;
    preloadAssets();
    gameLost = false;
//    game = setInterval(game_loop, 30);
	//gamePaused = true;
	game = clearInterval(game);
	
}



window.onload = function(e) {
    init();
};

