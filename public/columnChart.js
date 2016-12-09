var ColumnChart = function(chart, title, series, xaxis, yaxis){
  var chart = new Highcharts.Chart({
    chart: chart,
    title: title,
    series: series,
    xAxis: xaxis,
    yAxis: yaxis
  })

}