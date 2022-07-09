var PLAY = 1;
var END = 0;
var gamestate = PLAY;

var boy, boy_running;

var testpapers_group, good_test, bad_test

var score = 0;
var gameover, restart;

var backgroundImg

function preload() {

  backgroundImg = loadImage("park.jpg");

  boy_running = loadAnimation("boyrun2.jpg", "boyrun1.jpg", "boyrun3.png")

  good_test = loadImage("goodtest.png");
  bad_test = loadImage("badtest.png");

  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  boy = createSprite(50, height - 70, 20, 50);
  boy.addAnimation("running", boy_running);
  boy.setCollider('circle', 0, 0, 350);
  boy.scale = 0.25;

  gameOver = createSprite(width / 2, height / 2 - 50);
  gameOver.addImage(gameOverImg);

  restart = createSprite(width / 2, height / 2);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;

  score = 0;
}

function draw() {
  background(backgroundImg);
  textSize(35);
  fill("black");
  text("Score: " + score, 30, 50);

  if (gamestate === PLAY) {
    backgroundImg.velocityX = -(6 + 3 * score / 4)

    if ((touches.length > 0 || keyDown("SPACE")) && boy.y >= height - 120) {
      touches = []
    }

    if (backgroundImg.x < 0) {
      backgroundImg.x = backgroundImg.width / 2;
    }

    boy.collide(invisibleGround);
    spawnPapers();

    if (good_test.isTouching(boy)) {
      score = score + 1;
    }
      if (bad_test.isTouching(boy)){
        gamestate = END;
      }
  
  }

  else if (gamestate === END) {
    gameover.visible = true;
    restart.visible = true;


    background.velocityX = 0;
    boy.velocityY = 0;
    testpapers_group.setVelocityXEach(0);

    testpapers_group.seLifetimeEach(-1);

    if (touches.length > 0 || keyDown("SPACE") || mousePressedOver(restart)) {
      reset();
      touches = []
    }

  }
  drawSprites();
}


function spawnPapers() {
  if (frameCount % 60 === 0) {
    var paper = createSprite(600, height - 95, 20, 30);
    paper.setCollider('circle', 0, 0, 45)


    paper.velocityX = -(6 + 3 * score / 4);


    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: paper.addImage(good_test);
        break;
      case 2: paper.addImage(bad_test);
        break;
      default: break;
    }


    paper.scale = 0.3;
    paper.lifetime = 300;
    paper.depth = boy.depth;
    boy.depth += 1;

    testpapers_group.add(paper);
  }
}


function reset() {
  gamestate = PLAY;
  gameover.visible = false;
  restart.visible = false;

  testpapers_group.destroyEach();

  boy.changeAnimation("running", boy_running);

  score = 0;
}
