var c, ctx;
var centerx, centery;
var height, width;
var boxsize;
var halfbox;
var lowtarget;

class point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  gpos() {
    var pos = [x,y];
    return pos;
  }
  Vector(b) {
    var pos = new point(b.x-this.x,b.y-this.y);
    return pos;
  }
  DotP(b) {
    return this.x*b.x + this.y*b.y;
  }
  Perpen() {
    return new point(this.y,-this.x);
  }
  getAngle(b,c) {
    var vb = this.Vector(b);
    var vc = this.Vector(c);
    var pvb = vb.Perpen();
    return (0 >= vc.DotP(pvb));
  }

  draw(s) {
    ctx.beginPath();
    ctx.arc(this.x,this.y,4,0,2*Math.PI);
    ctx.strokeStyle=s;
    ctx.stroke();
  }
}

class polygon {
  constructor(x,y) {
    this.points = [new point(x,y)];
  }

  addPoint(x,y) {
    this.points.push(new point(x,y));
  }
  draw(s) {
    ctx.clearRect(0,0,width,height);
    var f = poly.points[poly.points.length-1];
    ctx.moveTo(f.x,f.y);
    for (var i = 0; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x,this.points[i].y);
    }
    ctx.fillStyle = "#FFF000";
    ctx.fill();
    for (var i = 0; i < this.points.length; i++) {
      this.points[i].draw(s);
    }
  }
}


var poly = null;
var check;

function Checkinside() {
  if (poly == null) {
    return -1;
  }
  var sum = 0;
  var old = poly.points[poly.points.length-1];
  for (var i = 0; i < poly.points.length; i++) {
    var k = check.getAngle(old, poly.points[i]);
    if (k) {
      sum++;
    } else {
      sum--;
    }
    old = poly.points[i];
  }
  console.log(sum);
}

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
  check = new point(centerx,centery);
  c.onclick = function(e) {
    if (poly == null) {
      poly = new polygon(e.layerX,e.layerY);
      ctx.clearRect(0,0,width,height);
      poly.draw("red");
      check.draw("black");
    } else if (e.shiftKey) {
      check = new point(e.layerX,e.layerY);
      ctx.clearRect(0,0,width,height);
      poly.draw("red");
      check.draw("black");
      Checkinside();
    } else {
      poly.addPoint(e.layerX,e.layerY);
      poly.draw();
    }
  }
}
