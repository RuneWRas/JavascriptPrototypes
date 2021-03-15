var number = [
  ["01110","10001","10001","10001","10001","10001","10001","10001","01110"],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  []
]


var can;
var cc;
var width;
var height;
var pw;
var ph;
var lifes = [];
var newpl = [];
var cpl = [];
window.onload = function() {
  can = document.getElementById('canvas');
  cc = can.getContext('2d');
  width = can.width = window.innerWidth;
  height = can.height = window.innerHeight;
  pw = width/10;
  ph = height/10;

  for (var i = 0; i < 800; i++) {
    lifes[i] = new life();
  }
  var dele = 0;
  for (var i = 0; i < lifes.length; i++) {
    for (var j = i+1; j < lifes.length; j++) {
      if (lifes[j].x == lifes[i].x && lifes[j].y == lifes[i].y) {
        lifes.splice(i,1);
        i--;
      }
    }
  }
  console.log(dele);
  setInterval(function() {
    loop();
  },1000/4);
}

  function back() {
    for (var w = 0; w < pw; w++) {
      for (var h = 0; h < ph; h++) {
        cc.beginPath();
        cc.fillStyle = ((w+h)%2 == 1 ? "#666" : "#aaa");
        cc.rect(w*20,h*20,20,20);
        cc.fill();
      }
    }
  }



  function life(nx,ny) {
    this.x = Math.floor(Math.random()*pw);
    this.y = Math.floor(Math.random()*ph);
    //this.x = Math.floor(Math.random()*10);
    //this.y = Math.floor(Math.random()*10);
    this.dead = false;
    this.nabo = function() {
      var nabos = 0;
      var naboa = [];
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          var x = this.x+i;
          var y = this.y+j;
          naboa.push(x+" "+y)
        }
      }
      for (var i = 0; i < lifes.length; i++) {
        if (lifes[i].x >= this.x-1 && this.x+1 >= lifes[i].x) {
          if (lifes[i].y >= this.y-1 && this.y+1 >= lifes[i].y) {
            nabos++;
            naboa[placement(this,lifes[i])] = lifes[i];
          }
        }
      }
      for (var i = 0; i < naboa.length; i++) {
        if (typeof naboa[i] === 'string') {
          newpl.push(naboa[i]);
        }
      }
      if (nabos <= 2 || nabos >= 5) {
        this.dead = true;
      }
    }

    this.draw = function() {
      this.nabo();
      cc.beginPath();
      cc.fillStyle = "black";
      cc.rect(this.x*20,this.y*20,20,20);
      cc.fill();
    }
  }

  function loop() {
    back();
    newlife();
    for (var i = 0; i < lifes.length; i++) {
      if (lifes[i].dead) {
        lifes.splice(i,1);
        i--;
      }
    }
    console.log("loop "+lifes.length);
    for (var i = 0; i < lifes.length; i++) {
      lifes[i].draw();
    }
  }

  function newlife() {
    newpl.sort();
    cpl = [];
    tis = [];
    //console.log(newpl);
    for (var i = 0; i < newpl.length; i++) {
      tis[i] = 1;
      for (var j = i+1; j < newpl.length; j++) {
        if (newpl[i] == newpl[j]) {
          newpl.splice(j,1);
          tis[i]++;
          j--;
        }
      }
    }
    //console.log(newpl);
    //console.log(tis);
    for (var i = 0; i < newpl.length; i++) {
      if (tis[i] == 3) {
        //console.log(newpl[i]);
        cpl.push(newpl[i])
      }
    }

    for (var i = 0; i < cpl.length; i++) {
      var koor = cpl[i].split(" ");
      lifes.push(new life())
      lifes[lifes.length-1].x = Number(koor[0]);
      lifes[lifes.length-1].y = Number(koor[1]);
      if (-10 > koor[0] || koor[1] > (pw+10) || -10 > koor[1] || koor[1] > (ph+10)) {
        lifes[lifes.length-1].dead = true;
      }
    }
    newpl = [];
  }

    function placement(a,b) {
      var px = b.x-a.x;
      var py = b.y-a.y;
      var pl = 0;
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          if (i == px && j == py) {
            return (pl*1);
          }
          pl++;
        }
      }
    }


//[(this.x-1)+" "+(this.y-1),this.x+" "+(this.y-1),(this.x+1)+" "+(this.y-1),(this.x-1)+" "+this.y,this.x+" "+this.y,(this.x+1)+" "+this.y,(this.x-1)+" "+(this.y+1),this.x+" "+(this.y+1),(this.x+1)+" "+(this.y+1)];
