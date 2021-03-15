var c, ctx;
var width, height;
var test;
var savWhat = [];
var kna;
// console.log("");
function trap(x,max) {
  if (x >= 0 && x <= max) {
    return x;
  }
  if (x > max) {
    return (x%(max+1));
  } if (x < 0) {
    return ((max+1)+x);
  }
}

function pDist(fst,snd) {
  return (fst.x-snd.x)*(fst.x-snd.x)+(fst.y-snd.y)*(fst.y-snd.y);
}

window.onload = function() {
  c = document.getElementById('canvas');
  ctx = c.getContext("2d");
  width = ctx.width = c.width = window.innerWidth;
  height = ctx.height = c.height = window.innerHeight;
  // test = new plot([
    // new point(10,10),
    // new point(100,10),
    // new point(100,100),
    // new point(10,100)
  // ]);
  test = new plot([
    new point(100,100),
    new point(500,100),
    new point(500,500),
    new point(100,500),
  ]);
  test.draw();
  var shiftss = 0;
  c.onmousemove = function(e) {
    var mY = e.layerY;
    var mX = e.layerX;
    // var mX = (Math.round(e.layerX/20)*20);
    // var mY = (Math.round(e.layerY/20)*20);
    //console.log(mY);
    console.log(e.ctrlKey);
    if ((e.buttons >= 1) && (!kna)) {

      if (e.ctrlKey) {
        shiftss = 30;
      }
    }
    if (e.buttons >= 1) {
      var k = test.point(mX,mY);
      console.log(k);
      if (k.length != 0) {
        console.log("t");
        savWhat = test.point(mX,mY)
      };
      test.resize(savWhat,mX,mY,shiftss);

      ctx.clearRect(0,0,width,height);
      test.draw();
      kna = true;
    } else {
      savWhat = [];
      kna = false;
      shiftss = 0;
    }
    shiftss--;
    if (shiftss < 0) {
      shiftss = 0;
    }
    // console.log(e);
  }
}
class wall {
  constructor(x,y,xx,yy) {
    this.x = x;
    this.y = y;
    this.xx = xx;
    this.yy = yy;
    this.wi = xx-x;
    this.he = yy-y;
    this.d = ((this.he) == 0 ? "h" : "v");
  }
  toString () {
    return (this.x+" "+this.y+" "+this.xx+" "+this.yy+" "+this.d);
  }
  flip () {
    var xx = this.x;
    var yy = this.y;

    this.x = this.xx;
    this.y = this.yy;
    this.xx = xx;
    this.yy = yy;
    this.wi = this.xx-this.x;
    this.he = this.yy-this.y;
    this.d = ((this.he) == 0 ? "h" : "v");
  }
}

class point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}

class plot {
  constructor(arr) {
    this.points = arr;
    this.Awalls = [];
  }

  pDelete(point) {
    var remain = [];
    for (var i = 0; i < this.points.length; i++) {
      if (this.points[i] != point) {
        remain.push(this.points[i])
      }
      else {
        // console.log(i);
      }
    }
    this.points = remain;
  }

  colapse() {
    if (this.points.length < 5) {
      return;
    }
    var fst = this.points[this.points.length-1]
    for (var i = 0; i < this.points.length; i++) {
      var snd = this.points[i];
      if (pDist(fst,snd) < 2) {
        // console.log(i);
        this.pDelete(snd);
        this.pDelete(fst);
        savWhat = [];
        return;
      }
      fst = snd;
    }

  }
  change(wal) {
    var fst = wal[wal.length-1];
    // console.log("first");
    for (var i = 0; i < wal.length; i++) {
      var snd = wal[i];
      if ((i%2) == 0) {
        this.points[trap(i-1,wal.length-1)] = new point(snd.x,fst.y);
      } else {
        this.points[trap(i-1,wal.length-1)] = new point(fst.x,snd.y);
      }
      fst = snd;

      // console.log(this.points[i].x);
    }
  }

  resize(what,x,y,shift){
    if (what[what.length-1] > this.Awalls.length-1) {
      return;
    }

    for (var i = 0; i < what.length; i++) {
      if (this.Awalls[what[i]].d == "v") {
        this.Awalls[what[i]].x = this.Awalls[what[i]].xx = Math.round(x/20)*20;
        // console.log("test");
      } else {
        this.Awalls[what[i]].y = this.Awalls[what[i]].yy = Math.round(y/20)*20;
      }

    }
    if (shift == 30) {
      this.add(what,x,y);
      this.change(this.Awalls);
    }
    this.change(this.Awalls);
    if (shift == 0) {
      this.change(this.Awalls);
      this.colapse();
    }
  }

  add(what) {
    var temp_arr = this.Awalls;
    if (what.length == 1) {
      var vall = temp_arr[what[0]];
      var momo = 0;
      if (vall.d == "h") {
        momo = 2;
      }

      var count = this.Awalls.length;
      // temp_arr.push(new wall(0,0,0,0));
      // temp_arr.push(new wall(0,0,0,0));
      for (var i = count+1; i >= what[0]; i--) {
        switch (i) {
          case what[0]+momo:
            temp_arr[i] = new wall(vall.x,vall.y,vall.wi/2+vall.x,vall.he/2+vall.y);
            break;
          case what[0]+1:
            temp_arr[i] = new wall(vall.wi/2+vall.x,vall.he/2+vall.y,vall.wi/2+vall.x,vall.he/2+vall.y);
            break;
          case what[0]+2-momo:
            temp_arr[i] = new wall(vall.wi/2+vall.x,vall.he/2+vall.y,vall.xx,vall.yy);
            break;
          default:
            temp_arr[i] = temp_arr[i-2];
        }
      }
      console.log(temp_arr);
    }
  }

  walls() {
    var wal = [];
    var arr = this.points;
    var tpl = arr.length-1;
    var fst = arr[tpl];
    for (var i = 0; i < arr.length; i++) {
      var snd = arr[i];
      wal.push(new wall(fst.x,fst.y,snd.x,snd.y));
      fst = snd;
    }
    this.Awalls = wal;
  }

  point(x,y) {
    var what = [];
    var wal = this.Awalls;

    for (var i = 0; i < wal.length; i++) {
      var t = wal[i];
      if (t.wi < 0 || t.he < 0) {
        t.flip();
      }
      if (t.d == "h") {
        if ((t.x-10 < x && x < t.xx+10) && 10 > Math.abs(y - t.y)) {
          what.push(i);
        }
      } else {
        if ((t.y-10 < y && y < t.yy+10) && 10 > Math.abs(x - t.x)) {
          what.push(i);
        }
      }
    }
    return what;
  }

  draw() {
    this.walls();
    for (var i = 0; i < this.Awalls.length; i++) {
      var k = this.Awalls[i];
      ctx.strokeRect(k.x,k.y,k.wi,k.he);
      ctx.fillText(i+" w",k.x+k.wi/2,k.y+k.he/2)
    }
    for (var i = 0; i < this.points.length; i++) {
      this.points[i]
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.fillText(i+" p",this.points[i].x+5,this.points[i].y+5);
      ctx.arc(this.points[i].x,this.points[i].y,10,0,2*Math.PI);
      ctx.stroke();

    }
  }
}
