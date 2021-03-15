var cfro,cbac,cmid;
var checkPoints = [-70,-45,0,45,70];
var width, heigth;
var press = 0;
var pause = true;
var k=[];
var colors = ["cyan","blue","teal","Indigo","Lime","Red"];
var playernumber = 5;
var map = [];
var alldead = false;
var menu = false;
onkeydown = onkeyup = function(e){
    e = e || event;
    map[e.keyCode] = e.type == 'keydown';
}

window.onload = function () {
  //siteSetup();

  document.getElementById('menuk').addEventListener("click",function () {
    pause = true;
    if (!menu) {menu = !menu;
      document.getElementById('menu').style.right = "0px";
    }else {menu = !menu;
      document.getElementById('menu').style.right = "-350px";
    }
  })

  CanSetup();
  for (var i = 0; i < playernumber; i++) {
    k.push(new snake());
    k[i].color = colors[i];
  }
  console.log(k);

  setInterval(loop ,1000/60);

  newpl(2,10);
  start();
}

function restart() {
  var count = 0;
  for (var i = 0; i < k.length; i++) {
    if (!k[i].alive) {
      count++;
    }
  }
  if (count >= k.length-1) {
    pause = true;
    alldead = true;
  }
}

function CanSetup() {
  console.log("CanSetup");
  console.log(window.innerWidth);
  console.log(window.innerHeight);
  width = window.innerWidth-50;
  heigth = window.innerHeight;
  efro = document.getElementById('fro');
  ebac = document.getElementById('bac');
  emid = document.getElementById('mid');
  efro.width = width;
  efro.height = heigth;
  ebac.width = width;
  ebac.height = heigth;
  emid.width = width;
  emid.height = heigth;
  cfro = efro.getContext('2d');
  cbac = ebac.getContext('2d');
  cmid = emid.getContext('2d');
}

function Draw(s) {
  cfro.clearRect(0,0,width,heigth);
  for (var i = 0; i < k.length; i++) {
    k[i].update();
    cfro.beginPath();
    cfro.fillStyle = "black" ;
    cfro.arc(k[i].x, k[i].y, k[i].size+2, 0, 2*Math.PI);
    cfro.fill();
    cfro.beginPath();
    cfro.fillStyle = k[i].color ;
    cfro.arc(k[i].x, k[i].y, k[i].size, 0, 2*Math.PI);
    cfro.fill();
    if (k[i].draw) {
      k[i].hit();
      cbac.save();
      cbac.translate(k[i].x,k[i].y);
      cbac.rotate(Math.PI/180*k[i].rotation);
      cbac.beginPath();
      cbac.fillStyle = k[i].color ;
      cbac.rect(0-k[i].size, 0-k[i].size, k[i].speed*2, k[i].size*2);
      cbac.fill();
      cbac.restore();
      k[i].draws--;
      if (k[i].draws < 0) {k[i].draw = false; k[i].draws = Math.random()*1000+10;}
    } else {
      k[i].space--;
      if (k[i].space < 0) {k[i].draw = true; k[i].space = Math.random()*20+15;}
    }
  }
}

function keypress() {
  if (map[32]) {
    if (alldead) {
      cbac.clearRect(0,0,width,heigth);
      alldead = false;
      start();
    }else
    if (press < 1) {
      if (pause) {
        document.getElementById('menu').style.right = "-350px";
        setTimeout(function() {
          pause = false;
        },1000)
      }else {
        document.getElementById('menu').style.right = "-0px";
        pause = !pause;
      }
    press = 1;
  }
  }else {
  press--;
  }
  if (!pause) {
    for (var i = 0; i < k.length; i++) {
      if (k[i].alive) {
        if (map[k[i].turnLeft]) {
          k[i].rotation+=k[i].rotspeed;
        }
        if (map[k[i].turnRight]) {
          k[i].rotation-=k[i].rotspeed;
        }
      }
    }
  }
}

function snake() {
  this.x = Math.random()*width;
  this.y = Math.random()*heigth;
  this.size = 5;
  this.color = "#00fa0f";
  this.draw = false;
  this.alive = true;
  this.name = "unamed"
  this.turnRight = 65;
  this.turnLeft = 68;
  this.draws = Math.random()*500+10;
  this.space = 20;
  this.speed = 2;
  this.rotation = Math.random()*360;
  this.rotspeed = 3;

  this.update = function () {
    if (this.alive) {

    this.x += (this.speed) * Math.cos(Math.PI/180 * this.rotation);
	  this.y += (this.speed) * Math.sin(Math.PI/180 * this.rotation);
    //console.log("x:"+this.x+" y:"+this.y);
    if (this.x > width+this.size+2) {this.x = 0-this.size;}
    if (this.x < -this.size-2) {this.x = width+this.size;}
    if (this.y > heigth+this.size+2) {this.y = 0-this.size;}
    if (this.y < -this.size-2) {this.y = heigth+this.size;}
    }
  }
  this.hit = function () {
    if (this.alive) {

    //console.log("x: "+this.x+"  y: "+this.y);
    for (var i = 0; i < checkPoints.length; i++) {
      var xx = this.x+Math.cos(Math.PI/180 * (this.rotation+checkPoints[i]))*2
      var yy = this.y+Math.sin(Math.PI/180 * (this.rotation+checkPoints[i]))*2
      this.check = cbac.getImageData(xx,yy,1,1).data.join("");
      //console.log("x: "+xx+"  y: "+yy+" color"+this.check);
      if (this.check != 0) {
        this.alive = false;
      }
    }
  }
}
}

function loop(s) {
  keypress();
  if (!pause) {
    Draw();
    restart();
  }
  if (alldead) {
    winner();
  }
}

function winner() {
  cfro.font = "70px Arial";
  cfro.textAlign = "center";

  for (var i = 0; i < k.length; i++) {
    if (k[i].alive) {
        cfro.fillStyle = k[i].color;
        cfro.fillText("Winner: "+k[i].name,width/2,heigth/2);
        cfro.strokeText("Winner: "+k[i].name,width/3,heigth/2);
    }
  }
}

function butk(s) {
  var k = true;
  document.addEventListener("keydown", function test(event) {
    if (k) {k=!k;
      s.innerHTML = event.key;
    }
  });
}

function newpl(x,y) {
  var divplay = document.createElement("div");
  //divplay.style.left = x+"px";
  //divplay.style.top = y+"px";
  //console.log(x,y);
  //divplay.style.position = "absolute";
  divplay.className = "player";
  var in1 = document.createElement("input");
  in1.type = "color";
  in1.value = "#aaaaaa";
  in1.addEventListener("change", function () {
    divplay.style.background = in1.value;
  })
  divplay.appendChild(in1);
  var in2 = document.createElement("input");
    divplay.appendChild(in2);
  var in3 = document.createElement("button");
  in3.innerHTML = "click";
  in3.addEventListener("click", function () {
    var k = true;
    document.addEventListener("keydown", function test(event) {
      if (k) {k=!k;
        in3.innerHTML = event.key;
        in3.setAttribute("kode",event.keyCode)
      }
    });
  });
    divplay.appendChild(in3);
  var in4 = document.createElement("button");
  in4.innerHTML = "click";
  in4.addEventListener("click", function () {
    var k = true;
    document.addEventListener("keydown", function test(event) {
      if (k) {k=!k;
        console.log(event);
        in4.innerHTML = event.key;
        in4.setAttribute("kode",event.keyCode)
      }
    });
  });
    divplay.appendChild(in4);
  document.getElementById('players').appendChild(divplay);
}

function start() {
  k = [];
  var playerss = document.getElementsByClassName('player');

  for (var i = 0; i < playerss.length; i++) {
    k.push(new snake());
    k[i].color = playerss[i].getElementsByTagName('input')[0].value;
    k[i].name = playerss[i].getElementsByTagName('input')[1].value;
    k[i].turnRight = playerss[i].getElementsByTagName('button')[0].getAttribute("kode");
    k[i].turnLeft = playerss[i].getElementsByTagName('button')[1].getAttribute("kode");
  }
    Draw(1);
}
