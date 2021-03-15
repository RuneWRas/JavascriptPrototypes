window.onload = function () {
var alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var nr = 1;
var resultt = [];
var t,y = true;
function all(alinout) {
  var webname = alinout.toLowerCase();
  function diff(array) {
    var samlo
    for (var i = 1; i < array.length; i++) {
      saml.push(Math.abs(array[i]-array[i-1]));
    }
    return saml;
  }

  //var webname = "facebook";
  var samler=[],samlerl=[],samlerd=[], result;
  //console.log(webname);

  for (var i = 0; i < webname.length; i++) {
    for (var j = 0; j < alpha.length; j++) {
      if (alpha[j] == webname[i]) {
       samler.push(j%10);
       samlerl.push(j);
      }
    }
  }
  for (var i = 1; i < samler.length; i++) {
    samlerd.push(Math.abs(samler[i]-samler[i-1]));
  }
  result  =  samler.join("");
  resultl = samlerl.join("");
  return parseInt(3*result)+parseInt(resultl);
}
var list = [];
while (list.length < 1000) {
  var news = [],k,f = true;
  var rand = Math.floor(Math.random()*6)+3;
  for (var i = 0; i < rand; i++) {
    news.push(alpha[Math.floor(Math.random()*alpha.length)])
  }
  k = news.join("");
  f = true;
  for (var i = 0; i < list.length; i++) {
    if (list[i]==k) {
      f = false;
    }
  }
  if (f) {
    list.push(k);
  }
  console.log(nr +" "+list.length);
  nr++;
}
console.log("kamelen");
for (var i = 0; i < list.length; i++) {
  y = true;
  for (var j = 0; j < resultt.length; j++) {
    if (resultt[j] == all(list[i])) {
      y = false;
      console.log(j+" "+resultt[j]);
    }
  }
  if (y) {
     resultt.push(all(list[i]))
  }
  console.log(resultt.length);
}

function kanel(input) {
  var newlist = [];
  var ka = input.toString().split("");
  var count = 0;
  for (var i = 0; i < ka.length; i++) {
    if (ka[i-1]+ka[i]<alpha.length) {
      console.log(ka[i-1]+ka[i]);
      var kkk = (ka[i-1]+ka[i]);
      newlist.push(alpha[parseInt(kkk)])
    } else {
      if (count > 1) {
        newlist.push(alpha[ka[i]%alpha.length]);
        console.log(alpha[ka[i]%alpha.length]);
        count = 0;
      }else {
        newlist.push(ka[i]);
        count++;
      }
    }
  }
  document.getElementById('pass').value = newlist.join("");
}

document.getElementById('site').addEventListener("change", function () {
  console.log("test");
  var kk = all(document.getElementById('site').value);
  document.getElementById('res').value = kk
  kanel(kk);
});






}
