var pig
var pig_run
var pig_collide
var bg,bgImg
var red1
var red2
var yellow1
var black1
var blue1
var white1
var score = 0
var gameState = "play"


function preload(){
  pig_run = loadImage("pig.png");
  
  bgImg = loadImage("background.jpg");
  
  red1 = loadImage("red.png");
  red2 = loadImage("red1.png");
  yellow1 = loadImage("chuck.png");
  black1 = loadImage("bomb.png");
  white1 = loadImage("white.png");
  blue1 = loadImage("blue.png");
}

function setup() {
createCanvas(400, 300);

bg = createSprite(200,150,400,300);
bg.addImage("background",bgImg);
bg.scale = 2

bg.velocityX = 2

pig = createSprite(350,200,20,50);
pig.addImage("running", pig_run);
pig.scale = 0.5;

invisibleGround = createSprite(200,280,400,10)
invisibleGround.visible = false

birdsGroup = createGroup()

score = 0;
pig.setCollider("circle",0,0,40);
}

function draw() {
background("black")

if(gameState === "play"){
//add score - refere to the trex game
score = score + Math.round(getFrameRate()/60);
spawnBirds()

 if(bg.x> 250){
 bg.x = bg.width /2;
 }
 if(keyDown("space")){
pig.velocityY = -10
 }
 pig.velocityY = pig.velocityY + 0.5

 if(pig.isTouching(birdsGroup)){
gameState = "end"
 }
 pig.collide(invisibleGround)
 drawSprites();

 fill("white")
 text("Score: " + score, 290,50)
}
else if(gameState === "end"){
fill("white")
text("Game Over ", 150,150)
}

}



function spawnBirds(){
    if (frameCount % 100 === 0){
      var bird = createSprite(-10,165,10,40);
      bird.y = Math.round(random(100,200))
      bird.velocityX = (6 + score/100);
      

       var rand = Math.round(random(1,6));
       switch(rand) {
         case 1: bird.addImage("red1",red1);
                 break;
         case 2: bird.addImage("red2",red2);
                 break;
         case 3: bird.addImage("blue1",blue1);
                 break;
         case 4: bird.addImage("yellow1",yellow1);
                 break;
         case 5: bird.addImage("white1",white1);
                 break;
         case 6: bird.addImage("black1",black1);
                 break;
         default: break;
       }
         
       bird.scale = 0.2;
       bird.lifetime = 300;
      
       birdsGroup.add(bird);
    }
   }