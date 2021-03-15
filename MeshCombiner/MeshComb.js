var c, ctx;
var width, height;
var test;

let world = [];

console.log("tes");

function init() {
  let x = Math.floor(width*0.1);
  let y = Math.floor(height*0.1);
  let half = Math.floor(Math.min(x,y)/2);

  console.log(half);
  for (var i = 0; i < x; i++) {
    world[i] = [];
    for (var j = 0; j < y; j++) {
      world[i][j] = 0;
    }
  }
  console.log("width: " + world.length);
  console.log("height: " + world[0].length);
  world[half][half] = 1;
}

function PointToChange(x,y) {
  // console.log("R");
  let cx = Math.floor(x*0.1);
  let cy = Math.max(1,Math.floor(y*0.1));
  var test = 1;
  if (world[cx+1][cy] == 1) {test = 0;}
  if (world[cx][cy+1] == 1) {test = 0;}
  if (world[cx][cy-1] == 1) {test = 0;}
  if (world[cx-1][cy] == 1) {test = 0;}
  if (world[cx][cy] == 1) {test = 1;}
  if (test) {return;}
  world[cx][cy] = 1;
  ctx.beginPath();
  ctx.rect(cx*10,cy*10,10,10);
  ctx.fillStyle = "Green";
  ctx.fill();
}

function ColorWalls() {
  for (var i = 1; i < world.length-1; i++) {
    for (var j = 1; j < world[i].length-1; j++) {
      if (world[i][j] = 1) {
        var test = 4;
        if (world[i+1][j] > 1) {test--;}
        if (world[i][j+1] > 1) {test--;}
        if (world[i][j-1] > 1) {test--;}
        if (world[i-1][j] > 1) {test--;}
        if (!test) {
          world[i][j] = 2;
          continue
        } else {
          ctx.beginPath();
          ctx.rect(i*10,j*10,10,10);
          ctx.fillStyle = "yellow";
          ctx.fill();
        }
      }
    }
  }
}

var boxes = [];
class Box {
  constructor(x,y,w,h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  valid () {
    if (this.w > 0) {
      return true;
    }
    return false;
  }

  inside(x,y) {
    var distx = x - this.x;
    var disty = y - this.y;
    if (0 < distx && distx < w) {
      if (0 < disty && disty < h) {
        return true;
      }
    }
    return false;
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.x*10,this.y*10,this.w*10,this.h*10);
    ctx.fillStyle = "red";
    ctx.stroke();
    ctx.fill();
  }
}

function draw() {
  ctx.clearRect(0,0,width,height);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].draw();
  }
  ColorWalls();
}

function FewestBoxes() {
  var nboxes = [];
  var x = 0;
  var y = 1;
  var qy = -1;
  // console.log(world.length);
  while (x < world.length) {
    qy = 0;
    y = 1;
    // console.log(world[0].length);

    while (y < world[0].length) {

      // console.log("TY");
      if (qy == -1) {
        if (world[x][y] == 0  ) {
          qy = y;
        }
      } else {
        if (world[x][y] != 0  ) {
          // console.log(x);
          // console.log(y);
          nboxes.push(new Box(x,qy,1,y-qy));
          qy = -1;
        }
      }
      y++;
    }
    if (qy != -1) {
      if (world[x][y] != 0  ) {
        nboxes.push(new Box(x,qy,1,y-qy));
        qy = -1;
      }
    }
    x++;
    // console.log(x);
  }
  for (var i = 0; i < nboxes.length-1; i++) {
    var k = 5
    // console.log(i);
    for (var j = i+1; (j < nboxes.length) && (j < k + i); j++) {
      if (nboxes[i].y == nboxes[j].y) {
        if (nboxes[i].x + nboxes[i].w == nboxes[j].x) {
          if (nboxes[i].h == nboxes[j].h) {
            nboxes[i].w +=1;
            nboxes[j].w = 0;
            k +=5
          }
        }
      }
    }
  }
  boxes = [];
  for (var i = 0; i < nboxes.length; i++) {
    if (nboxes[i].valid()) {
        boxes.push(nboxes[i]);
    }
  }
  draw();
}

var k = 0;
window.onload = function() {
  c = document.getElementById('canvas');
  ctx = c.getContext("2d");
  width = ctx.width = c.width = window.innerWidth;
  height = ctx.height = c.height = window.innerHeight;
  console.log("Test");
  init();
  FewestBoxes();
  boxes.push(new Box(5,5,100,100));
  // draw();


  // ctx.rect(4,4,4,4);
  // ctx.stroke();

  // test.draw();
  // var shiftss = 0;
  c.onmousemove = function(e) {
    // var mY = e.layerY;
    // var mX = e.layerX;

    // console.log(mY +" " + mX);
    // console.log(mY);
    // console.log(e.ctrlKey);
    // if ((e.buttons >= 1) && (!kna)) {

      // if (e.ctrlKey) {
        // shiftss = 30;
      // }
    // }
    // console.log(e.buttons);
    if (e.buttons == 1) {
      // boxes.push(new Box(mX/4,mY/4,100,100));
      PointToChange(e.layerX,e.layerY);
      PointToChange(e.layerX+1,e.layerY+1);
      PointToChange(e.layerX+1,e.layerY);
      PointToChange(e.layerX,e.layerY+1);
      // FewestBoxes();
      k = 1;
      // draw();
      // console.log(k);
      // if (k.length != 0) {
        // console.log("t");
        // savWhat = test.point(mX,mY)
      };
      if ((e.buttons == 0) && (k == 1)) {
        k = 0;
        FewestBoxes();
      }


      if (e.buttons == 2) {
        FewestBoxes();
      }
    }
      // test.resize(savWhat,mX,mY,shiftss);

      // ctx.clearRect(0,0,width,height);
      // test.draw();
      // kna = true;
    // } else {
      // savWhat = [];
      // kna = false;
      // shiftss = 0;
    // }
    // shiftss--;
    // if (shiftss < 0) {
      // shiftss = 0;

    // console.log(e);
  // }
}
