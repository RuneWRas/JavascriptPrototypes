var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var c, ctx;
var centerx, centery;
var height, width;
var boxsize;
var halfbox;
var lowtarget;

class opbject {
  constructor(c,t,x,y,r) {
    this.c = c
    this.t = t
    this.x = x
    this.y = y
    this.r = r

    this.i = 1;
    this.k = 0;
    this.fails = 0;
    this.trees = [new tree(x,y)];
    this.trees[0].draw();
  }

  spawnSingel() {
    var plant = true;
    while (this.t >= 0 && this.c >= 0) {
      this.t--;
      plant = true;
      var newx = Math.random()*50-25 + this.trees[this.k].x;
      var newy = Math.random()*50-25 + this.trees[this.k].y;
      for (var j = 0; j < this.trees.length; j++) {
        if (!this.trees[j].distance(newx,newy)) {
          this.fails++;
          plant = false;

        }
      }
      if (this.fails > 3) {
        this.fails = 0;
        this.k = Math.floor(Math.random()*this.trees.length);
      }
      if (plant) {
        this.trees.push(new tree(newx,newy))
        this.trees[this.i].draw("green");
        this.c--;
        if (this.trees[this.i].realdist(this.x,this.y)>this.r) {
          this.c = 0;
        }
        this.i++;
        return true;
      }
    }
    return false;
  }

  spawnCount() {
    for (var i = 0; i <this.c; i++) {
      if (this.t <= 0) {
        break;
      }
      this.spawnSingel();
    }
  }

  left() {

  }

  best(test) {
    var tree
    for (var i = 0; i < trees.length; i++) {
      if (this.trees[i].x > this.trees[pox].x) {
        tree = i;
      }
    this.trees[tree].draw("red");
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
  container = new opbject(999999,999999999,centerx,centery,100000);
  var firsttime = Date.now();
  container.spawnCount();
  var finishtime = Date.now();
  var stop = ((finishtime-firsttime)/1000);
  document.getElementById('data').innerHTML = "Number of Objects: " + container.i + ", time: " + stop;
  console.log(stop);
  // outerstroke(container);
}
