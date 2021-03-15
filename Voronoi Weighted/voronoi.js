var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var c, ctx;
var centerx, centery;
var height, width;
var boxsize;
var halfbox;
var lowtarget;

class map {
  constructor(c) {
    this.c = c

    this.points = [];
  }

  allpoint() {
    while (this.c > 0) {
      this.newpoint()
    }
  }
  newpoint() {
    if (this.c > 0) {
      var x = Math.random()*(width-100)+50;
      var y = Math.random()*(height-100)+50;
      this.points.push(new point(x,y));
      this.c--;
    }
  }

  closest(x,y) {
    var k = this.points[0].sqDist(x,y);
    var h = 0;
    for (var i = 1; i < this.points.length; i++) {
      var next = this.points[i].sqDist(x,y)
      if (next < k) {
        k = next;
        h = i;
      }
    }
    return h;
  }

  draw() {
    var sz = 2;
    var hsz = sz/2;
    for (var i = 0; i < width/sz; i++) {
      for (var j = 0; j < height/sz; j++) {
        var h = this.closest(i*sz-hsz,j*sz-hsz);
        // if (this.points[h].border(i*4-2,j*4-2)) {
          // ctx.fillStyle = "hsl("+this.points[h].c+", 100%, 10%)";
        // } else {
          ctx.fillStyle = "hsl("+this.points[h].c+", 100%, 50%)";
        // }
        ctx.fillRect(i*sz,j*sz,sz,sz);
      }
    }
    for (var i = 0; i < this.points.length; i++) {
      this.points[i].draw();
      console.log("r");
    }
  }
}

class point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.s = Math.floor(Math.random()*25)/50+0.50;
    this.c = Math.floor(Math.random()*360);
  }

  sqDist(x,y) {
    return ((this.x-x)**2 + (this.y-y)**2)*this.s;
  }

  border(x,y) {
    return ((x*2 < this.x) || (x*2 > this.x+width) ||
            (y*2 < this.y) || (y*2 > this.y+height));
  }

  draw(color) {
    ctx.beginPath();
    ctx.arc(this.x,this.y,10,0,2*Math.PI);
    ctx.strokeStyle="hsl("+this.c+", 100%, 20%)";
    ctx.stroke();
  }
}
var m;
window.onload = function() {
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");
  width = ctx.width = c.width = window.innerWidth;
  height = ctx.height = c.height = window.innerHeight;
  console.log(height +" "+ ctx.height +" "+ c.height);
  console.log(window.innerWidth);
  centerx = width / 2;
  centery = height / 2;
  boxsize = 50;
  halfbox = boxsize/2;
  m = new map(20);
  m.allpoint();
  m.draw("red");


}
