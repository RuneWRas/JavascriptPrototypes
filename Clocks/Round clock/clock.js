window.onload = function() {
  var classes = ["hour1","hour2","min1","min2","sec1","sec2"];
  var maxnumb = [3,10,6,10,6,10];

  for (var i = 0; i < classes.length; i++) {
    var circle = document.createElement("div");
    //STYLE
    circle.style.position = "absolute";
    circle.style.width  = 150+50*i+"px"
    circle.style.height = 150+50*i+"px"
    circle.style.top  = 100-25*i+"px"
    circle.style.left = 100-25*i+"px"
    //Numbers
    var deginc = 360/maxnumb[i];
    for (var j = 0; j < maxnumb[i]; j++) {
      var number = document.createElement("div");
      number.innerHTML = j;
      //STYLE
      number.style.position = "absolute";
      number.style.left = 70+25*i+"px";
      number.style.transform = "translateY("+(65+(25*i))+"px) rotate("+deginc*j+"deg) translateX("+(65+(25*i))+"px)";
      //APPEND
      circle.appendChild(number);
    }
    //CLASS, ID AND APPEND
    circle.id = deginc;
    circle.className = classes[i]+" circle";
    document.getElementById('wrap').appendChild(circle);
  }

  timerote();
  setInterval(function() {
  timerote();
  },100);
}

function timerote() {
  var circles = document.getElementsByClassName('circle');
  var d = new Date();
  var rotation = [timesplit(d.getHours(),0),timesplit(d.getHours(),1),timesplit(d.getMinutes(),0),timesplit(d.getMinutes(),1),timesplit(d.getSeconds(),0),timesplit(d.getSeconds(),1)]
  console.log(d.getHours());
  console.log(rotation);
  for (var i = 0; i < circles.length; i++) {
    circles[i].style.transform = "rotate("+(-circles[i].id*rotation[i])+"deg)";
  }
}

function timesplit(x,y) {
  var k = x.toString();
  if (k.split("")[1]) {
    return k.split("")[y];
  }else if (y == 0) {
    return 0;
  }else {
    return k.split("")[0]
  }
}
