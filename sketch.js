var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sanitizer,germs,peolpe,lives,ground,invisibleGround;
var germsGroup,germs1,germs2,germs3;
var people,people_walking,people_collided;
var groundImg,snitzrImg,germsImg,peopleImg,livesImg;

var score = 0;

var gameOver,restart;

function preload() {
  people_walking = loadAnimation("people1.png","people2.png","people3.png","people4.png","people5.png","people6.png","people7.png","people8.png");
  groundImg2 = loadImage("background2.jpg");
  lives = loadImage("lives.png");
  snitzr1 = loadImage("sanitizer1.png");
  snitzr2 = loadImage("sanitizer2.png");
  germs1 = loadImage("germs1.png");
  germs2 = loadImage("germs2.png");
  germs3 = loadImage("germs3.png");
  gameOverImg = loadImage("gameOver2.png");
}
function setup() {
  createCanvas(800,600);

  //ground = createSprite(0,0,800,600);
  //ground.addImage("ground",groundImg2);
  //ground.x = ground.width /2;
  //ground.velocityX = -(6 + 3*score/100);
  //ground.scale = 2.5;

  people = createSprite(200,350,20,50);
  people.addAnimation("walking",people_walking);
  people.scale = 0.3;
  people.debug = true;
  people.setCollider("rectangle",0,0,50,70)

  snitzr2 = createSprite(50,100);
  snitzr2.addImage(snitzr1);
  snitzr2.scale = 0.10;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  gameOver.scale = 0.5;

  gameOver.visible = false;
  
  invisibleGround = createSprite(210,360,400,10);
  invisibleGround.visible = false;

  germsGroup = new Group();
}

function draw() {
  background(255);
  image(groundImg2,0,0,width,height);
  text("Score: "+ score, 600,50);

  
  if (gameState===PLAY){
    //score = score + Math.round(getFrameRate()/60);
    //ground.velocityX = -(6);
  
  
    //people.velocityY = people.velocityY + 0.8
  
    //if (ground.x < 0){
    //  ground.x = ground.width/2;
    //}
  
    people.collide(invisibleGround);
    spawnGerms();
  
    if(germsGroup.isTouching(people)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    
    //ground.velocityX = 0;
    people.velocityY = 0;
    germsGroup.setVelocityXEach(0);
    
    people.changeAnimation("collided",people_collided);
    
    germsGroup.setLifetimeEach(-1);
    
    if(keyDown("R")) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnGerms() {
  if(frameCount % 60 === 0) {
    var germ = createSprite(800,350,10,40);
    germ.velocityX = -(6 + 3*score/100);

    germ.y = Math.round(random(50,500))
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: germ.addImage(germs1);
              break;
      case 2: germ.addImage(germs2);
              break;
      case 3: germ.addImage(germs3);
              break;
      default: break;
    }

    germ.debug = true;
    germ.setCollider("circle",0,0,20)
               
    germ.scale = 0.2;
    germ.lifetime = 300;
    germsGroup.add(germ);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  germsGroup.destroyEach();
  
  people.changeAnimation("walking",people_walking);
  
  score = 0;
  
}

