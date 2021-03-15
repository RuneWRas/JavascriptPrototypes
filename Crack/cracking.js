var bogg = [' ','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',',','.'];
var lengg = Math.floor(Math.random()*bogg.length);
var starts;
var j = 0;
var k = 0;
var tt;
window.onload = function () {
  starts = document.getElementsByClassName('text')[0].innerHTML.toLowerCase().split("");
  loop();
  setInterval(loop,1000/1000);
}

function loop() {
  if (k == 0) {
    document.getElementsByClassName('text')[0].innerHTML = "";
    k++;
  }
  var l = document.getElementsByClassName('text')[0].innerHTML.split("");
  if (l.length >= starts.length) {
    l = "";
    document.getElementsByClassName('text')[0].innerHTML = "";
    j = 0;
  }
  // document.getElementsByClassName('text')[0].innerHTML = bogg.length + " + " + lengg;
  if (l[l.length-1] == starts[l.length-1]) {

    // k = Math.floor(Math.random()*bogg.length);
    j = 0;
    console.log(j+" "+k);
    document.getElementsByClassName('text')[0].innerHTML = document.getElementsByClassName('text')[0].innerHTML + " ";
  } else {

    j++;
    var l = document.getElementsByClassName('text')[0].innerHTML.split("");
    l[l.length-1] = bogg[j];
    for (var i = 0; i < l.length; i++) {
      if (i==0) {
        tt = l[0]
      }else {
        tt += l[i];
      }
    }
    document.getElementsByClassName('text')[0].innerHTML = tt;
  }
}
