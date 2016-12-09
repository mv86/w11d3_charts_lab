var PieChart = function(chart, title, series){
  var container = document.getElementById('pie-chart');
  var chart = new Highcharts.Chart({
    chart: chart,
    title: title,
    series: series
  });
}