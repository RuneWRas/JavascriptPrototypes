

var number = [
  ["01110","10001","10001","10001","10001","10001","10001","10001","01110"],
  ["00100","11100","00100","00100","00100","00100","00100","00100","11111"],
  ["01110","10001","00001","00001","00010","00100","01000","10000","11111"],
  ["01110","10001","00001","00001","01110","00001","00001","10001","01110"],
  ["00011","00101","00101","01001","01001","10001","11111","00001","00001"],
  ["11111","10000","10000","11110","00001","00001","00001","10001","01110"],
  ["00111","01000","10000","11110","10001","10001","10001","10001","01110"],
  ["11111","00001","00010","00010","00100","00100","01000","01000","10000"],
  ["01110","10001","10001","10001","01110","10001","10001","10001","01110"],
  ["01110","10001","10001","10001","01111","00001","00001","00010","11100"]
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
  pz = 20;
  pw = width/pz;
  ph = height/pz;

  for (var i = 0; i < (pw*ph/5); i++) {
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
//  console.log(dele);
kl = 0;
  setInterval(function() {
  cc.clearRect(0,0,width,height);
  back();
  loop();
  fnumber()
  kl++;
  if (kl > 9) {
    kl = 0;
  }
},1000/4);
  back();
  fnumber();
}

  function fnumber() {
    var mili = 0;
    var d = new Date();
    var hh = (d.getHours() < 10 ? "0"+d.getHours() : d.getHours());
    var mm = (d.getMinutes() < 10 ? "0"+d.getMinutes() : d.getMinutes());
    var ss = (d.getSeconds() < 10 ? "0"+d.getSeconds() : d.getSeconds());
    // console.log(d.getHours());
    // console.log(pw);
    var time = String(hh)+String(mm)+String(ss);
    // console.log(time);
    var nrx = Math.floor(width/2)-Math.floor(width/2)%pz-19*pz;
    var nry = Math.floor(height/2)-Math.floor(height/2)%pz-4*pz;
    for (var k = 0; k < time.length; k++) {
      nr = number[time[k]];
      numx = Math.floor(k / 2)*2;
      for (var i = 0; i < nr.length; i++) {
        for (var j = 0; j < nr[i].length; j++) {
          if (nr[i][j] == 1) {
            if (mili%2 == 0) {
              lifes.push(new life())
              lifes[lifes.length-1].x = (nrx+k*pz*6+pz*numx+j*pz)/pz;
              lifes[lifes.length-1].y = (nry+i*pz)/pz;
              lifes[lifes.length-1].r = 1;
            }
            cc.beginPath();
            cc.fillStyle = "black";
            cc.rect(nrx+k*pz*6+pz*numx+j*pz,nry+i*pz,pz,pz);
            cc.fill();
          }
        }
      }
    }
  }

  function back() {
    for (var w = 0; w < pw; w++) {
      for (var h = 0; h < ph; h++) {
        cc.beginPath();
        cc.fillStyle = ((w+h)%2 == 1 ? "#fff" : "#eee");
        cc.rect(w*pz,h*pz,pz,pz);
        cc.fill();
      }
    }
  }



  function life(nx,ny) {
    this.x = Math.floor(Math.random()*pw);
    this.y = Math.floor(Math.random()*ph);
    this.r = 1;
    //this.x = Math.floor(Math.random()*10);
    //this.y = Math.floor(Math.random()*10);
    this.dead = false;
    this.nabo = function() {
      var nabos = 0;
      var naboa = [];
      for (var i = -this.r; i <= this.r; i++) {
        for (var j = -this.r; j <= this.r; j++) {
          var x = this.x+i;
          var y = this.y+j;
          naboa.push(x+" "+y)
        }
      }
      for (var i = 0; i < lifes.length; i++) {
        if (lifes[i].x >= this.x-1 && this.x+1 >= lifes[i].x) {
          if (lifes[i].y >= this.y-1 && this.y+1 >= lifes[i].y) {
            nabos++;
            naboa[placement(this,lifes[i],this.r)] = lifes[i];
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
      cc.fillStyle = "#bbb";
      cc.rect(this.x*pz,this.y*pz,pz,pz);
      cc.fill();
    }
  }

  function loop() {
    // back();
    newlife();
    for (var i = 0; i < lifes.length; i++) {
      if (lifes[i].dead) {
        lifes.splice(i,1);
        i--;
      }
    }
    //console.log("loop "+lifes.length);
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
      if (-10 > koor[0] || koor[0] > (pw+10) || -10 > koor[1] || koor[1] > (ph+10)) {
        lifes[lifes.length-1].dead = true;
      }
    }
    newpl = [];
  }

    function placement(a,b,c) {
      var px = b.x-a.x;
      var py = b.y-a.y;
      var pl = 0;
      for (var i = -c; i <= c; i++) {
        for (var j = -c; j <= c; j++) {
          if (i == px && j == py) {
            return (pl*1);
          }
          pl++;
        }
      }
    }
