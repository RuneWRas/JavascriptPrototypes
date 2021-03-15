var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var c, ctx;
var centerx, centery;
var height, width;
var boxsize;
var halfbox;
var lowtarget;

class opbject {
  constructor(c,t,x,y,r,s) {
    this.c = c;
    this.t = t;
    this.x = x;
    this.y = y;
    this.r = r;
    this.s = s;

    this.ran = 20;//Densitet
    this.fails = 0;
    this.i = 0;
    this.lx = this.r;
    this.ly = this.r;
    this.array = [];
    for (var i = 0; i < 2*this.r+1; i++) {
      this.array.push([]);
      for (var j = 0; j < 2*this.r+1; j++) {
        var x = 0;
        if ((j < this.ran || j > 2*this.r-this.ran) || (i < this.ran || i > 2*this.r-this.ran)){
          x = -1;
        }
      this.array[i].push(x);
      }

    }
  }
  spawnSingel() {
    while (this.t >= 0 && this.c >= 0) {
      this.t--;
      var newx = Math.round(Math.random()*this.ran - this.ran/2) + this.lx;
      var newy = Math.round(Math.random()*this.ran - this.ran/2) + this.ly;
      if (this.array[newx][newy] == 0) {
        this.array[newx][newy] = 1;
        this.i++;
        this.c--;
        break;
      } else if (this.array[newx][newy]==-1) {
        this.array[newx][newy] = 1;
        // console.log("k");
        this.t = this.c = 0;
      } else {
        this.array[newx][newy] +=1
        // console.log(this.fails);
        this.fails += 1;
        if (this.fails > 1) {//Densitet
          this.fails = 0;
          // console.log("k");
          var loop = true;
          while (loop) {
            var rx = Math.floor(Math.random()*2*this.r+1)
            var ry = Math.floor(Math.random()*2*this.r+1)
            if (this.array[rx][ry] == 1) {
              // console.log("rx");
              this.lx = rx;
              this.ly = ry;
              loop = false;
            }
          }
        }
      }
    }
  }

  spawnCount() {
    for (var i = 0; i <this.c; i++) {
      if (this.t <= 0) {
        break;
      }
      this.spawnSingel();
    }
  }

  draw() {
    for (var i = 0; i < this.array.length; i++) {
      for (var j = 0; j < this.array[i].length; j++) {
        var c = this.array[i][j]
        if (c > 0) {
          if (c > 15) {
            c = 15;
          }
          ctx.fillStyle = "hsl(130, 100%, "+(80-5*c) +"%)";
          ctx.fillRect(i*this.s,j*this.s,this.s,this.s);
          // ctx.strokeStyle = "black";
          // ctx.strokeRect(i*this.s,j*this.s,this.s,this.s);
        }
      }
    }
  }
}

class tree {
  constructor(x,y) {
    this.r = 1;
    this.y = y;
    this.x = x;
  }

  realdist(x,y) {
    return ((x-this.x)**2 + (y-this.y)**2 )
  }

  distance(x,y) {
    var difx = Math.abs(x-this.x);
    if (difx > 5) {
      return true;
    }
    var dify = Math.abs(y-this.y);
    if (dify > 5) {
      return true;
    }
    if (Math.min(difx,dify)*1.4 > 5) {
      return true;
    }
    return false;
  }

  draw(color) {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
    ctx.strokeStyle=color;
    ctx.stroke();
  }
}

function outerstroke(con) {
  var pox = 1,poy = 1,nex = 1,ney = 1;
  var point = con.trees;
  var x = 0;
  var k = 0;
  while (x < width) {
    x += 2;
    k = 0;
    console.log("test");
    for (var i = 0; i < point.length; i++) {
      if (!point[i].distance(x,point[i].y)) {
        if (point[i].y>point[k].y) {
          k = i;
        }
      }
      if (!point[i].distance(x,point[i].y)) {
        if (point[i].y>point[k].y) {
          k = i;
        }
      }
    }
    point[k].draw("red");
  }
}

var container;
var timer;
function animate() {
  ctx.clearRect(0,0,width,height);
  let h = 0;
  timer = setInterval(function () {
    if (h > container.trees.length) {
      clearInterval(timer);
      console.log("ts");
      return -1;
    }
    container.trees[h++].draw();
  }, 10);

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
  container = new opbject(200000,200000,centerx,centery,200,3);
  var firsttime = Date.now();
  container.spawnCount();
  container.draw();
  var finishtime = Date.now();
  var stop = ((finishtime-firsttime)/1000);
  document.getElementById('data').innerHTML = "Number of Objects: " + container.i + ", time: " + stop;
  console.log(stop);
  // outerstroke(container);
}
