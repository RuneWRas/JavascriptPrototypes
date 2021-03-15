var map = [];
onkeydown = onkeyup = function(e){
    e = e || event;
    map[e.keyCode] = e.type == 'keydown';
}
window.onload = function() {

var front = document.getElementById('front');
var back = document.getElementById('back');
var cf = front.getContext('2d');
var cb = back.getContext('2d');
var height = front.height = back.height = window.innerHeight;
var width = front.width = back.width = window.innerWidth;
console.log(height +" "+ width);
console.log(document.getElementById('front').style);
var k = [];
for (var i = 0; i < 1000; i++) {
  k.push(new bird());
  k[i].id = i;
  k[i].alive = false;
}

cb.rect(0,0,width,height);
cb.fill();

  function bird() {
    this.x = Math.random()*width;
    this.y = Math.random()*width;
    this.r = 1;
    this.death = false;
    this.alive = false;
    this.time = 200+Math.random()*50;
    this.start = function() {
      this.draw();
      this.time--;
      if (this.time < 0) {
        this.r--;
        if (this.r < 1) {
          this.time = 100+Math.random()*50;
          this.x = Math.random()*width;
          this.y = Math.random()*width;
          this.r = 1;
          this.alive = false;
          this.death = false;
        }
      }
      if (this.r > 100) {
        this.death = true;
      }
      if (!this.alive) {
        for (var i = 0; i < k.length+1; i++) {
          if (i == k.length) {
            this.alive = true;
          } else if (this.id != k[i].id) {
          if (Math.sqrt( (this.x-k[i].x)*(this.x-k[i].x) + (this.y-k[i].y)*(this.y-k[i].y) )<(k[i].r+this.r+10)) {
            this.x = Math.random()*width;
            this.y = Math.random()*width;
            break;
          }
        }
        }
      } else if (!this.death) {
        this.move();
      }
    }
    this.move = function() {
        this.r++;
      for (var i = 0; i < k.length; i++) {
        if (k[i].id==this.id && !this.death) {
        }else if (Math.sqrt( (this.x-k[i].x)*(this.x-k[i].x) + (this.y-k[i].y)*(this.y-k[i].y) )<((k[i].r+this.r)+1)&&k[i].alive) {
          this.death = true;
          break;
        }
    }
    }
    this.draw = function() {
      if (this.alive) {
      cf.beginPath();
      cf.fillStyle ='white';
      cf.arc(this.x,this.y,this.r,0,2*Math.PI);
      cf.fill();
    }
    }
  }

   function update() {
     cf.clearRect(0,0,width,height)
     for (var i = 0; i < k.length; i++) {
       k[i].start();
     }
   }
   update();
   setInterval(update,1000/100);
}
