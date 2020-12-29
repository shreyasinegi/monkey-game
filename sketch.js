var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var score ;
var BillieSound;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  BillieSound = loadSound("Tones and I - Dance Monkey.mp3")
}



function setup() {
  createCanvas(600,600);
  
   var survivalTime=0;
  
  
  BillieSound.play();
  
  //creating our hero(monkey)
  monkey = createSprite(50,525,20,30);
  monkey.addAnimation("jumping",monkey_running);
  monkey.scale = 0.2;
  
  SurvivalTime = 0;
  score = 0;
 
  

  //creating ground
  ground = createSprite(600,560,600,15);
  ground.x = ground.width /2;
  
 
  //setting collider 
  monkey.setCollider("rectangle",0,0 ,monkey.width,monkey.height);
  monkey.debug = true
}


function draw() {
  
  background("lavender")
  
  //colliding monkey to the ground
  monkey.collide(ground);   
  
  //displaying score 
  stroke("red");
  textSize(20);
  fill("yellow");
 text("Score : "+ score, 5,60);
  //displaying Survival Time 
  stroke("yellow");
  textSize(20);
  fill("red");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime,5,30);

 
  
  if(gameState===PLAY){
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
 
  spawnFood();
  spawnObstacles();
  
  
 //making the monkey able to jump
  if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
  
    
  //adding gravity
 monkey.velocityY = monkey.velocityY + 0.8;
  
 //creating FoodGroup, obstacleGroup, 
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  
 
  }
    if (obstaclesGroup.isTouching(monkey)) {
     gamestate=END
     obstaclesGroup.destroyEach();
  
  } if(gameState===END){
    
    monkey.destroy();
    ground.destroy();
    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    stroke("black");   
    textSize(20);
    fill("black");
    text("Gameover: " + gameover,180,200);

    
  }

  
  drawSprites();
}

  

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -10;
    
     //assign lifetime to the variable
    banana.lifetime = 400;
    monkey.depth = banana.depth + 1;
    
    //adding image of banana
     banana.addImage(bananaImage);
     banana.scale=0.09;
    
    monkey.depth = banana.depth  - 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
    
   
  }
}
 
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(600,525,10,40);
    obstacle.velocityX = -12;
    
    //add image to the obstacle 
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
         
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
     monkey.depth = obstacle.depth;
  }      




}