var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, player_running;
var ground;

var bg,bg_img;
var stump,stump_img;
var star,star_img;
var stumpsGroup,starGroup;
var score;

var gameOver, restart;

function preload(){
  player_running=loadAnimation("player1.png","player2.png","player3.png","player4.png","player5.png","player6.png","player7.png","player8.png")
  bg_img=loadImage("bg.jpg");
  star_img=loadImage("star.png");
  stump_img=loadImage("stump.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

}

function setup() {
  createCanvas(800, 800);
  
 bg=createSprite(400,400,800,800);
 bg.addImage("behind",bg_img);
 bg.x=bg.width/2;
 bg.velocityX=-3;

  player = createSprite(100,760,20,50);
  player.addAnimation("running", player_running);
  //player.addAnimation("collided", player_collided);
  //trex.scale = 0.5;
  
  ground = createSprite(400,780,800,20);
  //ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX =-6;
  
  stumpsGroup=new Group();
  starGroup=new Group();
  score=0;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  //trex.debug = true;
  background(255);

  text("Score: "+ score, 500,50);
  ground.velocityX = -6;
  bg.velocityX=-6;

  if (gameState===PLAY){
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
     
    if (bg.x < 0){
      bg.x = bg.width/2;
    }

   score = score + Math.round(getFrameRate()/60);
     

    console.log(player.y);
    if(keyDown("space") && player.y >= 159) {
      player.velocityY = -12;
    }
  
    player.velocityY = player.velocityY + 0.8
  
    player.collide(ground);
    spawnClouds();
    spawnstumps();
  
    if(stumpsGroup.isTouching(player)){
        gameState = END;
    }
  }
  
  if (gameState === END){
   
    gameOver.visible = true;
    restart.visible = true;

    //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityY = 0;
    stumpsGroup.setVelocityXEach(0);
    starGroup.setVelocityXEach(0);
    
    
    //set lifetime of the game objects so that they are never destroyed
    stumpsGroup.setLifetimeEach(-1);
    starGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 30 === 0) {
   var star = createSprite(800,120,40,10);
    star.y = Math.round(random(80,120));
    star.addImage("power",star_img);
    star.scale = 0.5;
    star.velocityX = -3;
    
     //assign lifetime to the variable
    star.lifetime = 268;
    
    //adjust the depth
    star.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    starGroup.add(star);
  }
  
}

function spawnstumps() {
  if(frameCount % 60 === 0) {
    var stump = createSprite(800,750,20,20);
    stump.velocityX = -6;
    stump.addImage("stone",stump_img)
    stump.lifetime=600;
    stumpsGroup.add(stump)
  }
}

function reset(){
  
  stumpsGroup.destroyEach();
  starGroup.destroyEach();
  
  //player.changeAnimation("running",player_running);
  
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  score = 0;
  
}