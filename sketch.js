var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup
var survivalTime=0;
var bananas=0;
var ground,groundImage,invisibleGround;
var PLAY=1;
var END=0;
var gameState = PLAY;

function preload(){
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.jpg");
}



function setup() {
  ground = createSprite(200,200,400,10);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;

  monkey = createSprite(44,10,20,200);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.2;
  
  invisibleGround = createSprite(200,345,400,10);
  invisibleGround.visible = false;
  
  FoodGroup = createGroup();
  obstacleGroup=createGroup();
  
   monkey.setCollider("circle",0,0,150);
}


function draw() {
background(255);
camera.y = monkey.y;
  
  if(gameState===PLAY){
     
    ground.velocityX = -4;
    if(ground.x<100){
     ground.x = ground.width/2;
    }
  if(keyDown("space")&&monkey.y >= 150){
    monkey.velocityY=-12;
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  monkey.collide(invisibleGround);
  
  
  
  if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      bananas++;
    switch(bananas){
    case 10:monkey.scale=0.3;
           break;
    case 20:monkey.scale=0.4;
           break;
   case 30:monkey.scale=0.5;
           break;
    case 40:monkey.scale=0.6;
           break;
    }
    }
    
    if(bananas===25){
      monkey.scale=0.2;
    }
  
  if(monkey.isTouching(obstacleGroup)){
    gameState=END;
  }
    
  
  spawnBanana();
  spawnObs();
  ST();
   }
  
  if(gameState===END){
    obstacleGroup.setLifetimeEach(-1);
    monkey.velocityY=monkey.velocityY+0.8;
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    monkey.collide(invisibleGround);
    ground.velocityX=0;
   }
 
  drawSprites();
  textSize(20);
  fill("black");
  text("Survival Time: "+survivalTime,20,50);
  text("Bananas: "+bananas,200,50);
  if(gameState===END){
    textSize(15);
    fill("black");
    text("YOU HAVE NOT SATISFIED THE MONKEY'S HUNGER",15,200);
    text("YOU LOSE!!!",150,250);
  }
  
}

function spawnBanana() {
  if(frameCount%90===0){
    banana=createSprite(400,170,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.y=Math.round(random(60,150)); 
    banana.velocityX=-4;
    banana.lifetime=200;
    FoodGroup.add(banana);
  }
}


function spawnObs() {
  if(frameCount%100===0){
    obstacle=createSprite(300,330,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.x=Math.round(random(250,350));
    obstacle.velocityX=-4;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }
}

function ST(){
  if(frameCount%20===0){
    survivalTime++;
  }
}

