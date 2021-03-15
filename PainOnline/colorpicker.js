var illumination = 50;
var saturation = 50;
var hue = 50;
var hsl,h,ill,il;
function colorsetup() {
  hsl = document.getElementById('hsl');
  h = hsl.getContext('2d');
  ill = document.getElementById('ilm');
  il = ill.getContext('2d');
  hsl.onpointerdown = function(ev) {
    choosehsl(ev);
    return false;
  }
  ill.onpointerdown = function(ev) {
    chooseill(ev);
    ev.preventDefault();
  }
  colorpicker(0)
}
function colorpicker(type) {
  if (type > -1) {
    for (var i = 0; i < hsl.width; i++) {
      for (var j = 0; j < hsl.height; j++) {
        h.fillStyle = 'hsl('+ i +','+(j/2)+'%,'+illumination+'%)';
        h.fillRect(i,j,1,1);
      }
    }
  }
  if (type < 1) {
    for (var i = 0; i < ill.height; i++) {
      il.fillStyle = 'hsl('+ hue +','+saturation+'%,'+i/2+'%)';
      il.fillRect(0,i,ill.width,1);
    }
  }
  document.getElementById('illpick').style.background = 'hsl('+ hue +','+saturation+'%,'+illumination+'%)';
  document.getElementById('hslpick').style.background = 'hsl('+ hue +','+saturation+'%,'+illumination+'%)';
  document.getElementById('illpick').style.top = illumination*2+ill.offsetTop-5+"px";
  document.getElementById('illpick').style.left = ill.offsetLeft-7.5+"px";
  document.getElementById('hslpick').style.top = saturation*2+hsl.offsetTop-5+"px";
  document.getElementById('hslpick').style.left = hue+hsl.offsetLeft-7.5+"px";
}
  function choosehsl(ev){
    if (ev.offsetY > 0 && ev.offsetY < 200) {
      if (ev.offsetX > 0 && ev.offsetX < 360) {
        hue = ev.offsetX;
        saturation = ev.offsetY/2;
        colorpicker(-1);
      }
    }
  }
  function chooseill(ev){
    if (ev.offsetY > 0 && ev.offsetY < 200) {
      illumination = ev.offsetY/2;
      colorpicker(1);
    }
  }
