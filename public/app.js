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
      populateData(countries);
    }
  
  var regionSelectBox = document.getElementById('region-select');
    regionSelectBox.onchange = function(){
    region = this.value;
    populateData(countries);
  };
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
  if (chartType === 'Pie Chart') {
    var pieChart = createPieChart(countries);
    return pieChart;
  };
  if (chartType === 'Column Chart') {
    var columnChart = createColumnChart(countries);
    return columnChart;
  }
}

var createPieChart = function(countries) {
  var title = new TitleObject("Countries by Population");
  var pieChartSeries = new SeriesObject("Population", countries);
  var pieChart = new ChartObject('pie', 'chart');
  new PieChart(pieChart, title, pieChartSeries);
}

var createColumnChart = function(countries) {
  var countryNames = [];
  for (var country of countries) {
    countryNames.push(country.name);
  }
  var yAxis = new YAxis("Population Numbers")
  var xAxis = new XAxis(countryNames);
  var title = new TitleObject("Countries by Population");
  var columnChartSeries = new SeriesObject("Countries", countries);
  var columnChart = new ChartObject('column', 'chart') ;
  new ColumnChart(columnChart, title, columnChartSeries, xAxis, yAxis);
}
