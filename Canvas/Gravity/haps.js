partic = [];
var color = ["cyan","blue","teal","Indigo","Lime","Red"];
var can;
var c;
var newpl = [];
window.onload = function() {
  can = document.getElementById('canvas');
  c = can.getContext('2d');
  can.width = window.innerWidth;
  can.height = window.innerHeight;
  for (var i = 0; i < 200; i++) {
    partic.push(new particle());
  }
  setInterval(draw,1000/40);
}

function particle() {
  //this.c = color[Math.floor(Math.random()*color.length)];
  this.c = Math.floor(Math.random()*360);
  this.s = Math.floor(Math.random()*5+5);
  this.x = this.s+(can.width-2*this.s)*Math.random();
  //can.width/2;
  this.y = this.s+(can.height-2*this.s)*Math.random();
  //can.height/2;
  this.xx = Math.random()*10-5;
  this.yy = Math.random()*10-5;
  this.move = function() {
    if (this.x > can.width-this.s || this.x < this.s) {
      this.xx = -this.xx;
      this.yy = this.yy;
      this.x += this.xx;
    }
    if (this.y > can.height-this.s || this.y < this.s) {
      this.yy = -this.yy;
      this.xx = this.xx;
      this.y += this.yy;
    }if ((this.y > can.height || this.y < 0)||(this.x > can.width || this.x < 0)) {
      this.x = can.width/2;
      this.y = can.height/2;
    }
    this.x += this.xx;
    this.y += this.yy;
    //if (this.y > can.height-this.s-2) {
    //} else
    //this.yy+= 0.1;
  }

  this.colide = function() {
    for (var i = 0; i < partic.length; i++) {
      partic[i].x
      if (Math.sqrt( (this.x-partic[i].x)*(this.x-partic[i].x) + (this.y-partic[i].y)*(this.y-partic[i].y) )<(this.s+partic[i].s) && this.x != partic[i].x) {
        var xx = this.xx;
        var yy = this.yy;
        this.xx = (partic[i].xx);
        partic[i].xx = (xx);
        this.yy = (partic[i].yy);
        partic[i].yy = (yy);
        this.x += this.xx;
        this.y += this.yy;
        partic[i].x += partic[i].xx;
        partic[i].y += partic[i].yy;
      }
    }
  }
}

function draw() {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
  for (var i = 0; i < partic.length; i++) {
    partic[i].move();
    partic[i].colide();
    c.beginPath();
    c.fillStyle = 'hsl('+ partic[i].c +',23%, 31%)';
    c.arc(partic[i].x, partic[i].y, partic[i].s, 0, 2*Math.PI, true)
    c.fill();
  }
  backgroundc();
}
var bagg = 0;
function backgroundc() {
  document.body.style.background = 'hsl('+ bagg +',23%, 31%)';
  bagg +=2 ;
  if (bagg > 360) {
    bagg = 0;
  }
}
