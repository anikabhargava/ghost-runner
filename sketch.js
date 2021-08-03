var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300,600,600);
  tower.addImage(towerImg);
  tower.velocityY = 2;
  
  ghost = createSprite(300,300,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3

  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleBlockGroup = createGroup();
}

function draw() {
  if(gameState==="play"){
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("space")){
      ghost.velocityY=-12;
    }
    ghost.velocityY=ghost.velocityY+1; 
    if(keyDown("left")){
      ghost.x=ghost.x-5;
    }
    if(keyDown("right")){
      ghost.x=ghost.x+5;
    }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    if(ghost.y>600 || invisibleBlockGroup.isTouching(ghost)){
      gameState="end"
    }
  
    spawnDoors();
    drawSprites();
  }  
  if(gameState==="end"){
    ghost.destroy();
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
    background(0);
    fill("white");
    stroke("white");
    textSize(30);
    text("Game Over!",230,250)
  } 

}

function spawnDoors(){
if(frameCount%200===0){
    var door=createSprite(Math.round(random(80,320)),0,30,50)
    door.addImage(doorImg);
    door.velocityY=2;
    door.lifetime=300;
    doorsGroup.add(door);
    

    var railing = createSprite(door.x,door.y+50,40,20);
    railing.addImage(climberImg);
    railing.velocityY=2;
    railing.lifetime=300;
    climbersGroup.add(railing);
    
    door.depth=ghost.depth;
    railing.depth=door.depth+1
    ghost.depth=door.depth+2

    var invisRail = createSprite(railing.x,railing.y+15,70,10)
    invisRail.velocityY=2;
    invisRail.visible=false;
    invisibleBlockGroup.add(invisRail);
  }
}
