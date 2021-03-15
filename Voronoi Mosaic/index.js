window.onload = function() {

var front = document.getElementById('front');
var back = document.getElementById('back');
var cf = front.getContext('2d');
var cb = back.getContext('2d');
var height = front.height = back.height = window.innerHeight;
var width = front.width = back.width = window.innerWidth;
console.log(height +" "+ width);

var row,col,siz;
siz = 1;
col = Math.floor(width/siz);
row = Math.floor(height/siz);
lsiz = 200;
lcol = Math.floor(width/lsiz);
lrow = Math.floor(height/lsiz);
ltot = lcol * lrow;
console.log(ltot);
function pyt(a,b,c,d) {
  var length = Math.pow((a-c), 2)+Math.pow((b-d), 2);
  //console.log(length);
  return length
}

var lp = [];
var leadPoints = 500;
for (var i = 0; i < leadPoints; i++) {
  lp.push(new leadPoint())
  lp[i].c = 'hsl('+ ((360/leadPoints)*i) +',100%,50%)';
  //console.log(lp[i].x);
  //console.log(lp[i].c);
}
var inter
var i = 0;
var j = 0;
for (var i = 0; i < col; i++) {
for (var j = 0; j < row; j++) {
    cf.beginPath();
    cf.rect(i*siz,j*siz,siz,siz);
    var l = 0;
    for (var k = 1; k < lp.length; k++) {
      if (pyt(lp[l].x, lp[l].y, i*siz, j*siz) > pyt(lp[k].x, lp[k].y, i*siz, j*siz)) {
        l = k;
        //console.log(l);
      }
    }
    cf.fillStyle = lp[l].c;
    cf.fill();
    cf.closePath();
}
}

function leadPoint() {
  this.x = Math.random()*width;
  this.y = Math.random()*height;
}

}
