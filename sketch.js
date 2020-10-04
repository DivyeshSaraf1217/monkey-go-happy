var monkey,banana,stone,score,background_a,ground,gameOver;
var bananaImage,stoneImage,monkeyImage,backImage,obstacleGroup,bananaGroup,gameOimage;
var gameState,PLAY,END,obstacleTouch;
function preload(){
  backImage=loadImage("jungle.jpg");
bananaImage=loadImage("banana.png");
 stoneImage=loadImage("stone.png");
monkeyAnimation=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  gameOimage=loadImage("gameOver.png");
}

function setup() {
  createCanvas(400, 400);
   PLAY=1;
   END=0;
  obstacleTouch=0;
  gameState=PLAY;
  background_a = createSprite (150,180,50,50);
  monkey=createSprite(120,350);
   background_a.addImage(backImage);
  score=0;
  monkey.addAnimation("running",monkeyAnimation);
  monkey.scale=0.1;
  monkey.visible=true;
  bananaGroup=new Group();
  obstacleGroup=new Group(); 
   obstacleGroup=new Group();
ground=createSprite(200,400,400,10);
  ground.visible=false;
  gameOver=createSprite(200,200,50,50);
  gameOver.visible=false;
  gameOver.addImage(gameOimage);
}
function draw() {
  background(220);
  monkey.velocityY=monkey.velocityY+0.8
  monkey.collide(ground);
  background_a.velocityX=-3;
  if (background_a.x<0){
   background_a.x=background_a.width/2; 
  }
   if (gameState===PLAY){
  //ground moves
 
  //monkey jumps
  if (keyDown("space")){
   monkey.velocityY=-17; 
  }
  
  if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    score=score+2
  }
  switch (score){
    case 10:monkey.scale=0.12;
      break;
          case 20:monkey.scale=0.14;
      break;
          case 30:monkey.scale=0.16;
      break;
          case 40:monkey.scale=0.18;
      break;
      default:break;
  }
     if (obstacleGroup.isTouching(monkey)){
   obstacleTouch=obstacleTouch+1;
    monkey.scale=0.1;
    obstacleGroup.destroyEach ();
    
    }
  if (obstacleTouch===2){
    gameState=END;
  }
  //food and obstacles called
  food();
  functionobstacles();
   }  
    else if (gameState===END){
           bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.velocityY=0;
    background_a.velocityX=0;
      gameOver.visible=true;
      monkey.visible=false;
  }
  

drawSprites();
  stroke("white")
  textSize(20);
  fill("white")
  text("score :"+score,200,50);
}
function food() {
   if (World.frameCount % 80 === 0) {
  banana = createSprite(400,(random(120,200)));
  banana.addImage(bananaImage);
  banana.scale = 0.075;
   banana.velocityX=-4;
   banana.lifetime = 100;
     bananaGroup.add(banana);
   }
}
//function for obstacles made
function functionobstacles() {
  if (World.frameCount%300===0) {
  stone = createSprite(400, 345);
   stone.addImage(stoneImage);
    stone.scale = 0.2;
    stone.velocityX = -4;
    stone.lifetime = 100;   
    obstacleGroup.add(stone);
  }
}