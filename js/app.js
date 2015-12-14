var choices = [];
var products = [];
var p = 0;
var i1 = '';
var i2 = '';
var i3 = '';
var totalVotes = 0;

function Productoption(pname, imagesrc, chosen, tally) {
  this.pname = pname;
  this.imagesrc = imagesrc;
  this.chosen = chosen;
  this.tally = 0;
  products.push(this);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function selectOpts() {
  choices = [];
  for(var i = 0; i < 3; i++) {
    p = randInt(0,13);
    if(products[p].chosen !== true) {
      choices.push(products[p]);
      products[p].chosen = true;
      console.log(products[p].pname + " was added as option " + i);
    }
    else {
      i--;
    }
  }
  for(var r = 0; r < choices.length; r++) {
    choices[r].chosen = false;
  }
}

var bag = new Productoption('bag','<img src="img/bag.jpg">',false,0);
var banana = new Productoption('banana','<img src="img/banana.jpg">',false,0);
var boots = new Productoption('boots','<img src="img/boots.jpg">',false,0);
var chair = new Productoption('chair','<img src="img/chair.jpg">',false,0);
var cthulhu = new Productoption('cthulhu','<img src="img/cthulhu.jpg">',false,0);
var dragon = new Productoption('dragon','<img src="img/dragon.jpg">',false,0);
var pen = new Productoption('pen','<img src="img/pen.jpg">',false,0);
var scissors = new Productoption('scissors','<img src="img/scissors.jpg">',false,0);
var shark = new Productoption('shark','<img src="img/shark.jpg">',false,0);
var sweep = new Productoption('sweep','<img src="img/sweep.png">',false,0);
var unicorn = new Productoption('unicorn','<img src="img/unicorn.jpg">',false,0);
var usb = new Productoption('usb','<img src="img/usb.gif">',false,0);
var watercan = new Productoption('watercan','<img src="img/water_can.jpg">',false,0);
var wineglass = new Productoption('wineglass','<img src="img/wine_glass.jpg">',false,0);



function renderOut() {
  i1 = document.getElementById('img1');
  i1.innerHTML = choices[0].imagesrc;
  i2 = document.getElementById('img2');
  i2.innerHTML = choices[1].imagesrc;
  i3 = document.getElementById('img3');
  i3.innerHTML = choices[2].imagesrc;
  i1 = choices[0];
  i2 = choices[1];
  i3 = choices[2];
}

function totalCalc() {
  var tCr = document.getElementById('totaldisplay');
  tCr.innerHTML = '';
  if (totalVotes == 15) {
    var tableEl = document.createElement('table');
    var trEl = document.createElement('tr');
    for (var s = 0; s < products.length; s++) {
      var thEl = document.createElement('th');
      thEl.textContent = products[s].pname;
      trEl.appendChild(thEl);
    }
    tableEl.appendChild(trEl);
    var tmEl = document.createElement('tr');
    for (var q = 0; q < products.length; q++) {
      var tdEl = document.createElement('td');
      tdEl.textContent = products[q].tally;
      tmEl.appendChild(tdEl);
    }
    tableEl.appendChild(tmEl);
  }
  tCr.appendChild(tableEl);
}

function voteUp(id) {
  id.tally++;
  console.log(id.pname + " has " + id.tally + " votes.");
  totalVotes++;
  selectOpts();
  renderOut();
  if (totalVotes === 15) {
    totalCalc();
  }
}

img1.addEventListener('click', function(event) {
  voteUp(i1);
});

img2.addEventListener('click', function(event) {
  voteUp(i2);
});

img3.addEventListener('click', function(event) {
  voteUp(i3);
});

selectOpts();
renderOut();
//Some sort of event listener for click with submit - make images hidden checkboxes? Use CE code
