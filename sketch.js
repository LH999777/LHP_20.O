var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var arrowGroup, arrowImage, arrow;
var fireGroup

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
  
}

function setup(){
  createCanvas(1366,657);
  spookySound.loop();
  tower = createSprite(700,400);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  fireGroup = new Group();

  
  
  ghost = createSprite(700,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);

 
}
function fire() {
  if(frameCount % 60 === 0){
  rect = createSprite(random(0,1000),random(0,1000),10,10);
  rect.velocityY = -2;
  fireGroup.add(rect)
  }
}


function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }

   fire()

   

      

    
     
    spawnDoors();

    
    if(fireGroup.isTouching(ghost)){
      ghost.destroy();
      gameState = "end"
    }
    
    //climbersGroup.collide(ghost);
    
      if(climbersGroup.isTouching(ghost)){
        ghost.destroy();
        gameState = "end"
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();

      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("red");
    fill("red");
    textSize(50);
    text("Game Over", 450,300)
    text("press space to go up", 250,240)
    text("press left and right arrow key to go left and right",250,350)
    
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 180 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(700,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY =  1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}







