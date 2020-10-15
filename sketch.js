var trex, trex_running, trex_collidedImage;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var obstacleGroup;

var gameover,gameoverImage;

var restart,restartImage;

var score=0;

var jumpSound,dieSound,checkpointSound;

//if i dont make a variable then i have to make play in "" also because variables cannot have ""
var PLAY= 1;

var END= 0;

var gamestate= PLAY;

var newImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collidedImage = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  
  gameoverImage = loadImage("gameOver.png");
  
  restartImage = loadImage("restart.png");
  
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkpointSound=loadSound("checkPoint.mp3");
 
}

function setup() {
  createCanvas(600, 200);
  
  var message= "I LOVE WATCHING NETFLIX";
 

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collidedImage);
  trex.scale = 0.5;
  trex.debug=false;
  trex.setCollider("rectangle",0,0,70,trex.height);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstacleGroup=new Group();
  cloudsGroup=new Group();
  
  gameover= createSprite(300,50,10,10);
  gameover.addImage("gameover", gameoverImage);
  gameover.scale=0.7;
  
  restart= createSprite(300,100,10,10);
  restart.addImage("restart", restartImage);
  restart.scale=0.5;
  
  console.log("Hello"+ 5)
  
}

function draw() {
  background("white");

  
  text("Score : " + score,500,50);
  
  
  
if(gamestate===PLAY)
  {
    score=score+ Math.round(getFrameRate()/60);
    if((score%100===0)&& score>0)
    {
       checkpointSound.play();
      }
    
    
    //jump for trex
    if(keyDown("space")&& trex.y >= 150) {
    trex.velocityY = -12;
    jumpSound.play();  
  }
  
  trex.velocityY = trex.velocityY + 0.8
   ground.velocityX = -(4+score/100);
    
    if (ground.x < 0){
    ground.x = ground.width/2;  
  }
    
    gameover.visible=false;
    restart.visible=false;
    
  spawnClouds();
  spawnObstacles();
  
   if(trex.isTouching(obstacleGroup))
     {
       
       dieSound.play();
       
       gamestate=END;
       
     }
  }
  
else
  if(gamestate===END)
    {
      ground.velocityX = 0;
      cloudsGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
      trex.velocityY=0;
      gameover.visible=true;
    restart.visible=true;
      trex.changeAnimation("collided",trex_collidedImage);
      if(mousePressedOver(restart))
        {
          reset();
           }
    }
  
  trex.collide(invisibleGround);
  
  //spawn the clouds
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
    }
}

function spawnObstacles() 
{
  if(frameCount % 60===0)
  {
    obstacle = createSprite(600,155,20,50);
    obstacle.velocityX= -(5+2*score/100);
    var rand= Math.round(random(1,6));
    switch(rand)
    {
      case 1 :obstacle.addImage(obstacle1);
              break; 
      case 2 :obstacle.addImage(obstacle2);
              break; 
      case 3 :obstacle.addImage(obstacle3);
              break; 
      case 4 :obstacle.addImage(obstacle4);
              break;
      case 5 :obstacle.addImage(obstacle5);
              break; 
      case 6 :obstacle.addImage(obstacle6);
              break; 
              default: break;         
              
     }        
  obstacle.scale=0.5;  
  obstacle.lifetime=600/3; 
  obstacleGroup.add(obstacle);  
  }   
}

function reset()
{
  obstacleGroup.destroyEach();
          cloudsGroup.destroyEach();
          gamestate=PLAY;
          score=0;
  trex.changeAnimation("running",trex_running);
}

