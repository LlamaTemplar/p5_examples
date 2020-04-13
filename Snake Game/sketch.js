var snake;
var gridScale = 20;
var food;

function setup() {
  createCanvas(600,600);
  snake = new Snake;
  pickLocation();
  frameRate(10);
}

function pickLocation() {
  var cols = floor(width/gridScale);
  var rows = floor(height/gridScale);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(gridScale);
}


function draw() {
  background(51);
  snake.death();
  snake.update();
  snake.render();

  if(snake.eat(food))
  {
    pickLocation();
  }

  fill(255,0,100);
  noStroke();
  rect(food.x, food.y, gridScale, gridScale);

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

