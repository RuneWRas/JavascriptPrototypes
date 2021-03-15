var preword = ['yellow','owner','camera','razor','pretty','typical','spoon','onion','cement','entrance','clap','apple','blouse','secret','reach','choir','pilot','other','boat','attack','cabin','invent','woman','answer','eagle','leather','open','enemy','toast','stream','centre','reason'];
window.onload = function() {
  var wrap = document.getElementById('words');

  init();
  function init() {
    for (var i = 0; i < preword.length; i++) {
    var para = document.createElement("div");
    para.className = 'word';
    para.innerHTML = preword[i];
    wrap.appendChild(para);
    }
  }

  var words = wrap.getElementsByClassName('word');
  var space = document.getElementById('space');
  setInterval(function() {
    loop();
  },1000)

  function loop() {

    var kanel = (space.value == null)? "nul" : space.value.split(/\r|\n| /);
    console.log(kanel);
    for (var i = 0; i < words.length; i++) {
      words[i].style.color = "red";
      for (var j = 0; j < kanel.length; j++) {
        if (kanel[j] == words[i].innerText) {
          words[i].style.color = "green";
        }
      }
    }
  }
}
