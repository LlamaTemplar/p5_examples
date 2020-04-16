var snake;
var gridScale = 30;
var food;
var enemies = [];
var bg;
var personInAidSprite; 

function setup() {
  createCanvas(600,600);
  bg = loadImage('assets/middleeastmap.png');
  personInAidSprite = loadImage('assets/helpless.png');
  snake = new Snake;
  pickLocation();
  
 
  for(var i = 0; i < 10; i++)
  {
    enemies.push(new Enemy());
  }

  frameRate(10);
}

function pickLocation() {
  var cols = floor(width/gridScale);
  var rows = floor(height/gridScale);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(gridScale);
}

function draw() {
  background(bg);

  for(var i = 0; i < enemies.length; i++)
  {
    enemies[i].update();
    enemies[i].render();
  }

  snake.death(enemies);
  snake.update();
  snake.render();

  if(snake.eat(food))
  {
    pickLocation();
  }

  fill(127, 255, 0);
  noStroke();
  //rect(food.x, food.y, gridScale, gridScale);
  image(personInAidSprite, food.x, food.y);

}

function keyPressed() {
  if(keyCode == UP_ARROW) {
    snake.dir(0,-1);
  } else if(keyCode == DOWN_ARROW) {
    snake.dir(0, 1);
  } else if (keyCode == RIGHT_ARROW) {
    snake.dir(1,0);
  } else if (keyCode == LEFT_ARROW) {
    snake.dir(-1,0);
  }
}

