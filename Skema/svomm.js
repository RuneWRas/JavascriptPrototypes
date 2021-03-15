var WeekNo;
var WeekDiff = 0;
var Skema
var rD,rT;
var timer;
window.onload = function () {
  Skema = document.getElementById('skemaet');

  GetWeek();
  Update();
  Start();
  Tid();
  setInterval(function(){ Start(); }, 10000);
  scrollf();
}

function Start() {
  var hate
  hate = new Date();
  var hh = hate.getHours();
  var dd = hate.getDay();


  for (var i = 0; i < Skema.rows[0].cells.length; i++) {
    if (i == dd && (i > 0 && i < 6) && !WeekDiff) {
      Skema.rows[0].cells[i].style.background = "lightgrey";
      rD = i;
    }else {
      Skema.rows[0].cells[i].style.background = "wheat";
    }
  }

  for (var i = 0; i < Skema.rows.length; i++) {
    if (i == hh-7 && (i > 0 && i < 8)) {
      Skema.rows[i].cells[0].style.background = "lightgrey";
      Skema.rows[i].cells[0].style.fontSize = "1.4vw";
      rT = i;
    }else {
      Skema.rows[i].cells[0].style.background = "wheat";
      Skema.rows[i].cells[0].style.fontSize = "1.4vw";
    }
  }
  Tid();
}

function GetWeek() { //Lånt fra inter
  var d = new Date();
  d.setHours(0,0,0);
  d.setDate(d.getDate() + 4 - (d.getDay()||7));
  var yearStart = new Date(d.getFullYear(),0,1);
  WeekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
}

function Update() {
  var raks;
  for (var i = 0; i < Skema.rows.length; i++) {
  raks = Skema.rows[i];
  for (var j = 0; j < raks.cells.length; j++) {
    raks.cells[j];
    textt = raks.cells[j].innerHTML.split(" ");
    if (i>0 &&j>0) {
      raks.cells[j].style.color="red ";
      raks.cells[j].style.background="#f5b3b3";
    }

      for (var k = 0; k < textt.length; k++) {
        textt[k]
        if (textt[k] == (WeekNo+WeekDiff)) {
          raks.cells[j].style.color="green";
          raks.cells[j].style.background="lightgreen";
          if (textt[0] == "*"||textt[0] == "??") {
            raks.cells[j].style.background="lightyellow";
          }
        }
      }
  }
  }
  document.getElementById('uge').innerHTML="Uge "+ (WeekNo+WeekDiff);
}

function Tid() {
  // console.log(rD +" "+ rT);
  if (rD != null && rT != null) {
    for (var j = 0; j < Skema.rows.length; j++) {
      for (var i = 0; i < Skema.rows[0].cells.length; i++) {
        if (rD == i && rT == j && !WeekDiff) {
          Skema.rows[j].cells[i].style.border = "solid 2px BLUE";
          if (Skema.rows[j].cells[i].style.color == "green") {

          }
        } else {
          Skema.rows[j].cells[i].style.border = "solid 1px white";
        }
      }
    }
  }
}

function ChangeWeek(d) {
  if (d == "+") {
    WeekDiff++;
    if ((WeekDiff+WeekNo) > 52) {
      WeekDiff--;
    }
  }else if (d == "-") {
    WeekDiff--;
    if ((WeekDiff+WeekNo) < 34) {
      WeekDiff++;
    }
  }else if (d == "0") {
    WeekDiff = 0;
  }
  Update();
  Start();
  Tid ();
}

var scrolls = true;
function scrollf(key) {
  var d = key;
  clearInterval(timer);
  document.getElementById('scrollwrap').style.opacity = "0";
  if (scrolls) {
    timer = setInterval(scrollaa,1000/120)
    document.getElementById('scrollwrap').style.top = "90vh";
  }else {
    timer = setInterval(scrollaa,1000/120)
    document.getElementById('scrollwrap').style.top = "0vh";
  }
  scrolls = !scrolls;
}

var safee;
var y = 0;
function scrollaa() {
  if (scrolls) {
    y+=100/60;
  }else {
    y-=100/60;
  }
  if (y <= 0) {
    y = 0;
    clearInterval(timer);
    document.getElementById('scrollwrap').style.opacity = "0.5";
  }
  if (y >= 100) {
    y = 100;
    clearInterval(timer);
    document.getElementById('scrollwrap').style.opacity = "0.5";
  }
  document.getElementsByClassName('wasabi')[0].style.top = -y+"vh";
  document.getElementsByClassName('wasabi')[1].style.top = 100-y+"vh";
  document.getElementById('info').style.top = 190-y+"vh";
}

var map = []; // Or you could call it "key"
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
if(map[38] == true) {
  scrolls = true;
  scrollf();
}
if(map[40] == true) {
  scrolls = false;
  scrollf();
}
if (scrolls) {
  if(map[37] == true) {
    ChangeWeek("-")
  }
  if(map[39] == true) {
    ChangeWeek("+")
  }
}
}
