var ChartObject = function(chartType, chart){
  var chart = {type: chartType, renderTo: document.getElementById(chart) }
  return chart;
}