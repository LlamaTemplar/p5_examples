function Enemy(pos) {
    this.rate = 0;
    this.sprite = loadImage('assets/enemy.png');
    

    if(pos)
    {
        this.pos = pos;
    }
    else{
        var cols = floor(width / gridScale);
        var rows = floor(height / gridScale);
        this.pos = createVector(floor(random(cols)), floor(random(rows)));
        this.pos.mult(gridScale);
    }
    
    this.xspeed = 0;
    this.yspeed = 0;

    this.update = function () {

        var dir = random(-1,1);
        if(dir > 0)
        {
            this.angle = radians(this.rate);
            this.xspeed = 0.2 * cos(this.angle);
            this.rate += 3;

            this.yspeed = 0;
        } 
        else
        {
            this.angle = radians(this.rate);
            this.yspeed = 0.2 * sin(this.angle);
            this.rate += 3;

            this.xspeed = 0;
        }
        
        

        this.pos.x = this.pos.x + this.xspeed * gridScale;
        this.pos.y = this.pos.y + this.yspeed * gridScale;

        this.pos.x = constrain(this.pos.x, 0, width - gridScale);
        this.pos.y = constrain(this.pos.y, 0, height - gridScale);


    }

    this.render = function () {
        push();
        fill(255, 0, 100);
        noStroke();
        //rect(this.pos.x, this.pos.y, gridScale, gridScale);
        image(this.sprite, this.pos.x, this.pos.y, 0);
        pop();
    }
}