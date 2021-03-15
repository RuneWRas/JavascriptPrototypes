window.onload = function() {
document.getElementById("in").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      document.getElementById("tess").innerHTML = document.getElementById("tess").innerHTML +"<br>" + document.getElementById("in").value;
      document.getElementById("tess").style.opacity = "0.8";
      document.getElementById("tess").style.background= "grey";
      document.getElementById("in").value = "";
      document.getElementById("tess").scrollTop += 200;
    }
});
}
