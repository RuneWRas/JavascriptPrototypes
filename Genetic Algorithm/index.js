var front = document.getElementById('front');
var back = document.getElementById('back');
var cf = front.getContext('2d');
var cb = back.getContext('2d');
var height = front.height = back.height = window.innerHeight;
var width = front.width = back.width = window.innerWidth;
console.log(height +" "+ width);

function background(opacity) {
  cb.beginPath();
  cb.fillStyle = "rgba(0,0,0,"+opacity+")"
  cb.rect(0,0,width,height);
  cb.fill();
  cb.beginPath();
  cb.fillStyle = "white"
  cb.rect(15,5,80,45);
  cb.fill();
}
background(1);

var lifespan = 4000;
var count = 0;
var generation = 0;
var color = 0;
var popi = new pop();
var lastcount = lifespan;

function Bird(nedna,nr) {
  this.x = 8*width/10;
  this.y = height;
  this.a = 45;
  this.point = 0;
  this.complete = false;
  this.dead = false;
  if (nedna) {
    if (nr == popi.win) {
      this.dna = nedna;
    } else {
      this.dna = new DNA(nedna);
    }
  }else {
    this.dna = new DNA();
  }

  this.tdist = function() {
    return Math.pow(this.x-target.x,2)+Math.pow(this.y-target.y,2);
  }

  this.hit = function() {
    if (this.tdist() < Math.pow(target.r,2)) {
      this.complete = true;
    }
    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.dead = true;
    }
  }

  this.move = function () {
    this.a +=(2*Math.PI/360)*this.dna[count];
    this.x += Math.sin(this.a);
    this.y -= Math.cos(this.a);
    this.hit();
  }

  this.draw = function(kk) {
    cb.beginPath();
    cb.rect(this.x,this.y,1,1);
    cb.fillStyle = 'hsl('+color*360/popi.popsiz+', 60%, 70%)';
    cb.fill();

    cf.save();
    cf.translate(this.x, this.y);
    //cf.fillText(kk,10,10);
    //cf.fillText(this.point,10,30);
    cf.rotate(this.a);
    cf.beginPath();
    cf.rect(-5,-10,10,20);
    cf.fillStyle = 'hsla('+color*360/popi.popsiz+', 60%, 70%, 0.7)';
    color++;
    cf.fill();
    cf.restore();
  }
}
var target = new Target();
function Target() {
  this.x = width/10;
  this.r = 20;
  this.y = 80;

  this.draw = function() {
    cf.beginPath();
    cf.arc(this.x,this.y,this.r,0,Math.PI*2);
    cf.strokeStyle = "white";
    cf.stroke();
    cf.fill();
  }
}

function DNA(nedna) {
  genes = [];
  if (nedna) {

    for (var i = 0; i < nedna.length; i++) {
      if (Math.random()*1000 < 50) {
        nedna[i] += Math.random()*2-1;
        if (nedna[i] > 20) {
          nedna[i]=20;
        } else if (nedna[i] < -2) {
          nedna[i]=-2;
        }
      }
    }
    genes = nedna;
  }else {
    for (var i = 0; i < lifespan; i++) {
      genes[i] = Math.random()*2-1;
    }
  }
  return genes;
}

function pop() {
  this.win = 0;
  this.lifespan = 1000;
  this.count = 0;
  this.popsiz = 50;
  this.bird = [];
  for (var i = 0; i < this.popsiz; i++) {
    this.bird.push(new Bird());
  }
  this.eval = function() {
    var total = 0;
    var maxdist = 0;
    for (var i = 0; i < this.bird.length; i++) {
      total += this.bird[i].tdist();
      if (this.bird[i].tdist()>maxdist) {
        maxdist = this.bird[i].tdist();
      }
    }
    for (var i = 0; i < this.bird.length; i++) {
      if (!this.bird[i].dead) {
        this.bird[i].point += maxdist/this.bird[i].tdist();
        if (this.bird[i].complete) {
          this.bird[i].point *=2;
        }
        this.bird[i].point = Math.floor(this.bird[i].point);
      }else {
        //this.bird[i].point--;
      }
    }

    //for (var i = 0; i < this.bird.length; i++) {
    //  this.bird[i].point = count;
    //  for (var j = 0; j < this.bird.length; j++) {
    //    if (this.bird[i].tdist()<this.bird[j].tdist()) {
    //      this.bird[i].point++;
    //    }
    //  }
    //  var ll = 1;
    //  if (this.bird[i].dead) {
    //    ll = 0.1
    //  } else if (this.bird[i].complete) {
    //    ll = 10;
    //  }
    //  this.bird[i].point = Math.floor(ll*2*this.bird[i].point+total/(this.bird.length*this.bird[i].tdist()));
    //}
  }

  this.findwin = function() {
    this.win = 0;
    for (var i = 0; i < this.bird.length; i++) {
      if (this.bird[i].point > this.bird[this.win].point) this.win = i;
    }
  }

  this.pool = [];
  this.matingpool = function() {
    this.pool = [];
    var tot = 0;
    for (var i = 0; i < this.bird.length; i++) {
      tot += this.bird[i].point;
    }
    for (var i = 0; i < this.bird.length; i++) {
      if (i == this.win) {
        this.bird[i].point *= 2;
      }
      for (var j = 0; j < 1000*this.bird[i].point/tot; j++) {
        this.pool.push(this.bird[i].dna);
      }
    }
  }

  this.newgen = function(k) {
    //console.log(this.bird.length);
      var para = this.bird[k].dna;
      //console.log(this.pool.length);
      var parb = this.pool[Math.floor(Math.random()*this.pool.length)];
      var l = Math.random()*count;
      this.newgenes = [];
      for (var i = 0; i <= lifespan; i++) {
          if (i > l) this.newgenes.push(para[i]);
          else this.newgenes.push(parb[i]);
        //this.newgenes[i] = (para[i]+parb[i]/2);
      }
    return this.newgenes;
  }

  this.alldead = function () {
    var alldead = 0;
    for (var i = 0; i < this.bird.length; i++) {
      if (this.bird[i].dead) {
        alldead++;
      } else if (this.bird[i].complete) {
        return true;
      }
    }
    return (alldead == this.bird.length);
  }

  this.draw = function() {
    this.eval();
    if (count >= lifespan || this.alldead()) {
      background(0.3);
      this.findwin();
      lastcount = count;
      generation++;
      this.matingpool();
      console.log(this.win);
      for (var i = 0; i < this.bird.length; i++) {
        if (i == this.win) this.bird[i] = new Bird(this.bird[this.win].dna,i);
        else this.bird[i] = new Bird(this.newgen(i),i);
      }
      count = 0;
    } else {
    cf.clearRect(0,0,width,height);
    target.draw();
    color = 0;
    for (var i = 0; i < this.popsiz; i++) {
      this.bird[i].draw(i);
      if (!this.bird[i].complete) {
        if (!this.bird[i].dead) {
          this.bird[i].move();
        }
      }
    }
    count++;
  }
    cf.fillText(count,20,20);
    cf.fillText(lastcount,55,20);
    cf.fillText("generation "+ generation,20,40);
  }
}


setInterval(function () {
  popi.draw();
},1);
