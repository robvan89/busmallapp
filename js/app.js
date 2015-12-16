var choices = [];
var products = [];
var p = 0;
var i1 = '';
var i2 = '';
var i3 = '';
var totalVotes = 0;
var productNames = ['bag','banana','boots','chair','cthulhu','dragon','pen','scissors','shark','sweep','unicorn','usb','water_can','wine_glass']
var labels = [];

var data = {
  labels: [],
  datasets: [
    {
      label: "Chart Data",
      fillColor:"#00930C",
      strokeColor:"#FFFFFF",
      highlightFill:"#AADDAA",
      highlightStroke:"EEAAEE",
      data:[],
    }
  ]
};

function Productoption(pname, imagesrc, chosen, views, tally) {
  this.pname = pname;
  data.labels.push(this.pname);
  this.imagesrc = imagesrc;
  this.chosen = chosen;
  this.views = views;
  this.tally = 0;
  products.push(this);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

Productoption.prototype.succRate = function() {
  var k = this.tally / this.views;
  k = k.toFixed(2);
  console.log(k);
  return k;
}

function buildProds() {
  for (var w = 0; w < productNames.length; w++) {
    new Productoption(productNames[w], '<img src= "img/' + productNames[w] + '.jpg">', false, 0, 0);
  }
};

buildProds();

function selectOpts() {
  choices = [];
  for(var i = 0; i < 3; i++) {
    p = randInt(0,14);
    if(products[p].chosen !== true) {
      choices.push(products[p]);
      products[p].chosen = true;
      products[p].views++;
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

var tCr = document.getElementById('totaldisplay');

function compareNumbers(a, b) {
  return b.succRate() - a.succRate();
}

function getSucc() {
  //products.sort(compareNumbers);
  //data.datasets[0].data.sort(compareNumbers);
  for (var c=0; c<data.labels.length; c++) {
    labels.push(data.labels[c]);
  }
}

var ctx = document.getElementById("myChart").getContext("2d");
var chid = document.getElementById("chartdisplay");

function chartRender() {
  chid.hidden = false;
  console.log('text');
  var myBarChart = new Chart(ctx).Bar(data);
  data.datasets[0].data = [];
}

function totalCalc() {
  tCr.hidden = false;
  tCr.innerHTML = '';
  getSucc();
  if (totalVotes % 15 === 0) {
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
    var teEl = document.createElement('tr');
    for (var q = 0; q < products.length; q++) {
      var tuEl = document.createElement('td');
      tuEl.textContent = products[q].views;
      teEl.appendChild(tuEl);
    }
    tableEl.appendChild(teEl);
    var twEl = document.createElement('tr');
    for (var q = 0; q < products.length; q++) {
      var tjEl = document.createElement('td');
      tjEl.className = 'rate';
      tjEl.textContent = products[q].succRate();
      twEl.appendChild(tjEl);
    }
    tableEl.appendChild(twEl);
  }
  tCr.appendChild(tableEl);
  for (var c=0; c < products.length; c++) {
    data.datasets[0].data.push(products[c].tally);
  }
  chartRender();
}

var dbut = document.getElementById('dbut');

function voteUp(id) {
  id.tally++;
  console.log(id.pname + " has " + id.tally + " votes.");
  //data.datasets[products.indexOf(id)].data.push(id.tally);
  totalVotes++;
  selectOpts();
  renderOut();
  if(totalVotes % 15 === 0) {
    dbut.hidden = false;
  }
  else {
    dbut.hidden = true;
    tCr.hidden = true;
    chid.hidden = true;
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
dbut.addEventListener('click', totalCalc);

selectOpts();
renderOut();
