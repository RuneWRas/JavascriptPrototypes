var over,o,can,c;
var mouseDown = -1;
var oldX,oldY,newX,newY;
var msize = 6


window.onload = function() {
  colorsetup()
  can = document.getElementById('myCanvas');
  c = can.getContext('2d');
  over = document.getElementById('overlay');
  o = over.getContext('2d');

  over.width = can.width = window.innerWidth;
  over.height = can.height = window.innerHeight;
  c.lineWidth = 6;

  document.addEventListener('keydown', function(event) {

    if(event.keyCode == 107) {
      msize++;
      picchange(can,oldX,oldY);
    }
    else if(event.keyCode == 109) {
      msize--;
      if (msize < 1) {
        msize = 1;
      }
      picchange(can,oldX,oldY);
    }
  });

  over.onpointerdown = function(button) {
    mouseDown = button.button;
    picchange(button,0,0);
    // console.log(button);
  }
  document.body.onmouseup = function(button) {
    mouseDown = -1;
  }

  over.addEventListener("pointermove", function(ev) {
    picchange(ev,0,0);
  }, false);

  function picchange(box,shX,shY) {
    c.fillStyle = 'hsl('+ hue +','+saturation+'%,'+illumination+'%)';
    if (box.pressure) {
      var size = Math.round(msize*(box.pressure==0.5?1:box.pressure) );
    } else {
      var size = msize;
    }
    var halfsize = size/2;
    console.log(size);
    if (shX == 0 && shY == 0) {
      console.log("test2");
    newX = box.pageX//(e.pageX - div.offsetLeft);
    newY = box.pageY//(e.pageY - div.offsetTop);
  } else {
    newX = oldX;
    newY = oldY;
  }


  o.clearRect(0,0,over.width,over.height)
  o.beginPath();
  o.arc(newX,newY,msize,0,2*Math.PI);
  o.strokeStyle = 'white';
  o.lineWidth = 1;
  o.stroke();
  o.beginPath();
  o.arc(newX,newY,msize,0,2*Math.PI);
  o.strokeStyle = 'hsl('+ hue +','+saturation+'%,'+illumination+'%)';;
  o.lineWidth = 0.5;
  o.stroke();
  console.log(box);
  if (box.pressure || box.button == 0) {
    if (shY == 0) {
      var l = pyt(oldX,oldY,newX,newY);
      for (var i = 0; i < Math.floor(l); i++) {
        var xx = oldX + (newX-oldX)/l*i;
        var yy = oldY + (newY-oldY)/l*i;
        c.beginPath();
        c.arc(xx,yy,size,0,2*Math.PI);
        c.fill();

      }
    }
    c.beginPath();
    c.arc(newX,newY,size,0,2*Math.PI);
    c.fill();
  }
  oldX = newX;
  oldY = newY;
};
}




  function pyt(oldX,oldY,newX,newY) {
    return Math.sqrt(Math.pow(oldX-newX,2)+Math.pow(oldY-newY,2));
  }
