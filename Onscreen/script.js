var classcolor;
const koko = 5;
var color = ["Red","Blue","Green","Grey","Yellow"];
window.onload = function() {
  classcolor = document.getElementsByClassName('color');
  for (let i = 0; i < classcolor.length; i++) {
    classcolor[i].style.backgroundColor = color[i];
    classcolor[i].addEventListener("click", function testd() {
      console.log(i);
    });
  }

  var customer = { name: "Foo" }
var card = { amount: 7, product: "Bar", unitprice: 42 }
var message = `Hello ${customer.name}, want to buy ${card.amount} ${card.product} for a total of ${card.amount * card.unitprice} bucks?`
  console.log(message);
  ontip();
  console.log(koko);
  setInterval(ontip,100);
}

function ontip() {
  var test = document.getElementById('colortext').getBoundingClientRect();
  for (let i = 0; i < classcolor.length; i++) {
    var cc = classcolor[i].getBoundingClientRect();
    console.log(cc.bottom-(test.top+test.height/2));

    if (cc.bottom-(test.top+test.height/2)<cc.height) {
      document.getElementById('colortext').innerHTML = color[i];
    }
  }
}
