var can = document.getElementById('canvas');
var cc = can.getContext('2d');

var width = can.width = can.clientWidth;
var height = can.height = can.clientHeight;
var count = 0;

var lifesize = 100;
var part = [];
// for (var i = 0; i < lifesize; i++) {
//   part[i] = new particle();
//   part[i].y = Math.random()*width;
// }
var emitobj = new emitter();
function emitter() {
  this.x = 0;
  this.y = height;
  this.av = 15;
  this.dv = 5;
  this.aa = -45;
  this.da = 5;

  this.emit = function(col) {
    for (var i = 0; i < 3; i++) {
      var k = part.length;
      part.push(new particle())
      part[k].y = this.y;
      part[k].x = this.x;
      part[k].ya = Math.sin((this.aa+Math.random()*this.da-this.da/2)/180*Math.PI)*this.av+Math.random()*this.dv-this.dv/2;
      part[k].xa = Math.cos((this.aa+Math.random()*this.da-this.da/2)/180*Math.PI)*this.av+Math.random()*this.dv-this.dv/2;
      part[k].s = Math.random()*3+3;
      part[k].c = col;
    }
  }

  this.draw = function() {
    cc.fillStyle = "rgba(51, 102, 255,0.5)";
    cc.beginPath();
    cc.arc(this.x,this.y,(this.av-this.dv)*20,(this.aa-this.da)/180*Math.PI,(this.aa+this.da)/180*Math.PI);
    cc.lineTo(this.x,this.y);
    cc.fill();
    cc.beginPath();
    cc.arc(this.x,this.y,(this.av+this.dv)*20,(this.aa-this.da)/180*Math.PI,(this.aa+this.da)/180*Math.PI);
    cc.lineTo(this.x,this.y);
    cc.fill();
  }
}


function particle() {
  this.x = 0;
  this.y = 0;
  this.xa = 0;
  this.ya = 1;
  this.s = 5;
  this.c = 0;

  this.draw = function() {
    cc.beginPath();
    cc.fillStyle = "hsl("+this.c+", 100%, 40%)";
    // cc.fillStyle = "hsla(0, 100%, 40%, 1)";
    cc.arc(this.x,this.y,this.s,0,2*Math.PI);
    cc.fill();
  }

  this.dead = function() {
    return (this.y > height || this.x > width);
  }

  this.move = function() {
    this.x += this.xa
    this.y += this.ya
    this.ya += 0.1;
  }
}
function loop() {
   count++;
  if (count == 360/2) {
    count = 0
  }
  cc.clearRect(0,0,width,height);
  // emitobj.draw();
  emitobj.emit(Math.floor(count*2));
  for (var i = part.length-1; i >= 0; i--) {
    part[i].draw();
    part[i].move();
    if (part[i].dead()) {
      part.splice(i,1);
    }
  }
}
loop();
setInterval(loop, 10);
