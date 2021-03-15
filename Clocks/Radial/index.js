window.onload = function() {
  var can = document.getElementById('canvas');
  var cc = can.getContext('2d');

  var width = can.width = window.innerWidth;
  var height = can.height = window.innerHeight;


  //var length = Math.sqrt(Math.pow(width,2)+Math.pow(height,2));
  var length = (width > height ? height/2*0.95 : width/2*0.95);


  function seconds(t) {
    var x = Math.cos(2*t*Math.PI/60000-Math.PI/2)*length*0.95;
    var y = Math.sin(2*t*Math.PI/60000-Math.PI/2)*length*0.95;
    cc.beginPath();
    cc.lineWidth = 3;
    cc.moveTo(width/2-(x*0.13), height/2-(y*0.13));
    cc.lineTo(width/2+x,height/2+y);
    cc.strokeStyle="red";
    cc.stroke();
  }

  function minutes(t) {
    var x = Math.cos(2*t*Math.PI/3600000-Math.PI/2)*length*0.9;
    var y = Math.sin(2*t*Math.PI/3600000-Math.PI/2)*length*0.9;
    cc.beginPath();
    cc.lineWidth = 5;
    cc.moveTo(width/2-(x*0.13), height/2-(y*0.13));
    cc.lineTo(width/2+x,height/2+y);
    cc.strokeStyle="black";
    cc.stroke();
  }

  function hour(t) {
    var t = t + 3600000;
    var x = Math.cos(2*t*Math.PI/3600000/12-Math.PI/2)*length*0.8;
    var y = Math.sin(2*t*Math.PI/3600000/12-Math.PI/2)*length*0.8;
    cc.beginPath();
    cc.lineWidth = 7;
    cc.moveTo(width/2-(x*0.13), height/2-(y*0.13));
    cc.lineTo(width/2+x,height/2+y);
    cc.strokeStyle="blue";
    cc.stroke();
  }

  function back(d) {
    var hh = d.getHours();
    var hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    var ahours = [];
    for (var i = hh-6; i < hh+6; i++) {
      console.log(i);
      ahours[i+6-hh] = hours[i];
      if (i >= hours.length) {
        ahours[i+6-hh] = hours[i-hours.length];
      } else if (i < 0) {
        ahours[i+6-hh] = hours[hours.length+i];
      }
    }
    console.log(ahours);
    for (var i = 0; i < 60; i++) {
      var x = Math.cos(2*i*Math.PI/60-Math.PI/2)*length;
      var y = Math.sin(2*i*Math.PI/60-Math.PI/2)*length;
      cc.beginPath();
      cc.fillStyle = "HSL("+i*6+",50%,50%)";
      cc.strokeStyle = "HSL("+i*6+",50%,50%)";
      if (i%5 == 0) {
        cc.lineWidth = 10;
        cc.moveTo(width/2+(x*0.75), height/2+(y*0.75));
        cc.font= length/5+"px Verdana";
        cc.textAlign = "center";
        cc.textBaseline = "middle";
        //i/5 ? i/5 : 12
        // -8 +4
        if (i < 30+hh%12*5 ) {
          if (i/5%12+6-hh%12<0) {
            cc.fillText(ahours[(i/5%12+6-hh%12)+ahours.length],width/2+(x*0.62), height/2+(y*0.62));
          }else {
            cc.fillText(ahours[i/5%12+6-hh%12],width/2+(x*0.62), height/2+(y*0.62));
          }
          // console.log(i/5%12+6-hh%12);
        } else {
          cc.fillText(ahours[(i/5%12-6-hh%12)],width/2+(x*0.62), height/2+(y*0.62));

        }
      } else {
        cc.lineWidth = 8;
        cc.moveTo(width/2+(x*0.8), height/2+(y*0.8));
      }
      cc.lineTo(width/2+x,height/2+y);
      cc.stroke();

    }
  }

  function font() {
    for (var i = 0; i < 60; i++) {
      var x = Math.cos(2*i*Math.PI/60-Math.PI/2)*length;
      var y = Math.sin(2*i*Math.PI/60-Math.PI/2)*length;
      cc.beginPath();
      cc.moveTo(width/2, height/2);
      if (i%5 == 0) {
        cc.lineWidth = 3;
        cc.lineTo(width/2+(x*0.13),height/2+(y*0.13));
      } else {
        cc.lineWidth = 2;
        cc.lineTo(width/2+(x*0.12),height/2+(y*0.12));
      }
      cc.strokeStyle = "HSL("+i*6+",50%,50%)";
      cc.stroke();

    }
    //cc.beginPath();
    //cc.fillStyle = "grey";
    //cc.arc(width/2,height/2,length*0.05,0,2*Math.PI);
    //cc.fill();
  }

  setInterval(function() {
    cc.clearRect(0,0,width,height);
    var d = new Date();
    var t = d.getTime();
    var t = t%43200000;
    back(d);
    font();
    hour(t);
    minutes(t);
    seconds(t);
  },1000/60)
}
