var region;
var chartType;

window.onload = function(){

  var url = 'https://restcountries.eu/rest/v1/all';
  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);

  var chartTypeSelectBox = document.getElementById('chart-select');
    chartTypeSelectBox.onchange = function() {
      chartType = this.value;
    }
  
  var regionSelectBox = document.getElementById('region-select');
    regionSelectBox.onchange = function(){
    region = this.value;
    populateData(countries);
  };

  populateData(countries);
}

var populateData = function(countries){
  var europeanCountries = [];
  countries.forEach(function(country){
    if (country.region === region){
      europeanCountries.push(country);
    }
  })
  createChart(buildDataArray(europeanCountries));
}

var buildDataArray = function(countries){
  var europeanCountries = [];
  countries.forEach(function(country){
    var dataObject = { name: "",y: 0};
    dataObject.name = country.name;
    dataObject.y = country.population;

    europeanCountries.push(dataObject);
  })
  return europeanCountries;
}

var createChart = function(countries){
  var chart = new ChartObject('pie', 'pie-chart');
  var title = new TitleObject("Countries by Population");

  var series = new SeriesObject("Country", countries);
  new PieChart(chart, title, series);
}

var handleSelectChanged = function(){
  var pTag = document.querySelector('#regions');
  region = this.value; 
}


  // var chart = new ChartObject('column', 'column-chart');

  // var title = {text: "Our favourite programming languages"};
  // var series = [{
  //   name: "Cohort 7",
  //   data: [{y:8, color: '#f7df1e'},12,3,1],
  // }];
  // var xaxis = {categories: ['Javascript', 'Java', 'Ruby', 'C++']};
  // new ColumnChart(chart, title, series, xaxis);
// }

// chart: {
//   type: 'column',
//   renderTo: container
// },

// title: {
//   text:"Our favourite programming languages"
// },
// series: [{
//   name: "Cohort 7",
//   data: [{y:8, color: '#f7df1e'},12,3,1],

// }],
// xAxis: {
//   categories: ['Javascript', 'Java', 'Ruby', 'C++']
// }

// var chartObject = {function(chartType, chart){
//   type: chartType,
//   renderTo: document.getElementById(chart);}
// }