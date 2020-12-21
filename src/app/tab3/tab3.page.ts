import { Component, ElementRef, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as HighCharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
import Variablepie from "highcharts/modules/variable-pie";
Variablepie(Highcharts);
import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);

import Cylinder from 'highcharts/modules/cylinder';
Cylinder(Highcharts);
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild("highcharts-areaspline-chart", { read: ElementRef }) container: ElementRef;

  constructor() {}

  ionViewDidEnter() {
    this.plotSimpleBarChart();
    this.plotSimpleStackedBarChart();
    this.plotSimplePieChart();
    this.plotDynamicSplineChart();
    this.plotSimpleDrilldownChart();
    this.plotSimpleVRPieChart()
    this.plotSimple3DBarChart();
  }

  plotSimpleBarChart() {
    let myChart = HighCharts.chart('highcharts-barchart', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Fruit Consumption'
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      series: [
        {
          name: 'Jane',
          type: undefined,
          data: [1, 0, 4]
        },
        {
          name: 'John',
          type: undefined,
          data: [5, 7, 3]
        }]
    });
  }
  plotSimpleStackedBarChart() {
    let myChart = HighCharts.chart('highcharts-stacked-barchart', {
      chart: {
        type: 'bar'
      },
      plotOptions: {
        series: {stacking: 'normal'}
      },
      title: {
        text: 'Fruit Consumption'
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      series: [
        {
          name: 'Jane',
          type: undefined,
          data: [1, 0, 4]
        },
        {
          name: 'John',
          type: undefined,
          data: [5, 7, 3]
        }]
    });  
  }

  plotSimplePieChart() {
    let myChart = HighCharts.chart('highcharts-piechart', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Browser market shares in January, 2018'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: 'black'
            }
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        type: undefined,
        data: [{
          name: 'Chrome',
          y: 61.41,
          sliced: true,
          selected: true
        }, {
          name: 'Internet Explorer',
          y: 11.84
        }, {
          name: 'Firefox',
          y: 10.85
        }, {
          name: 'Edge',
          y: 4.67
        }, {
          name: 'Safari',
          y: 4.18
        }, {
          name: 'Sogou Explorer',
          y: 1.64
        }, {
          name: 'Opera',
          y: 1.6
        }, {
          name: 'QQ',
          y: 1.2
        }, {
          name: 'Other',
          y: 2.61
        }]
      }]
    });
  }
  plotDynamicSplineChart() {
    let myChart = HighCharts.chart('highcharts-Dynamic-chart', {
      chart: {
        type: 'spline',
        animation: true, // don't animate in old IE
        marginRight: 10,
        events: {
          load: function () {

            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = Math.random();
              series.addPoint([x, y], true, true);
            }, 1000);
          }
        }
      },

      time: {
        useUTC: false
      },

      title: {
        text: 'Live random data'
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        title: {
          text: 'Value'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'Random data',
        type: undefined,
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random()
            });
          }
          return data;
        }())
      }]

    });
  }
  plotSimpleDrilldownChart(){
    Highcharts.chart("highcharts-drilldown-chart", {
      // Created pie chart using Highchart
    chart: {
      type: 'column'
    },

  xAxis: {
    type: 'category'
  },
  series: [{
    name: 'Things',
    type: undefined,
    data: [{
        name: 'Animals',
        y: 5,
        drilldown: 'animals'
    }, {
        name: 'Fruits',
        y: 2,
        drilldown: 'fruits'
    }, {
        name: 'Cars',
        y: 4,
        drilldown: 'cars'
    }]
}],
drilldown: {
    series: [{
        id: 'animals',
        type: undefined,
        data: [
            ['Cats', 4],
            ['Dogs', 2],
            ['Cows', 1],
            ['Sheep', 2],
            ['Pigs', 1]
        ]
    }, {
        id: 'fruits',
        type: undefined,
        data: [
            ['Apples', 4],
            ['Oranges', 2]
        ]
    }, {
        id: 'cars',
        type: undefined,
        data: [
            ['Toyota', 4],
            ['Opel', 2],
            ['Volkswagen', 2]
        ]
    }]
}
    })
  
  
  
  }
  plotSimpleVRPieChart() {
    let myChart = Highcharts.chart('highcharts-vr-pie-chart', {
      chart: {
          type: 'variablepie'
      },
      title: {
          text: 'Countries compared by population density and total area.'
      },
      tooltip: {
          headerFormat: '',
          pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
              'Area (square km): <b>{point.y}</b><br/>' +
              'Population density (people per square km): <b>{point.z}</b><br/>'
      },
      series: [{
          type:undefined,
          minPointSize: 10,
          innerSize: '20%',
          zMin: 0,
          name: 'countries',
          data: [{
              name: 'Spain',
              y: 505370,
              z: 92.9
          }, {
              name: 'France',
              y: 551500,
              z: 118.7
          }, {
              name: 'Poland',
              y: 312685,
              z: 124.6
          }, {
              name: 'Czech Republic',
              y: 78867,
              z: 137.5
          }, {
              name: 'Italy',
              y: 301340,
              z: 201.8
          }, {
              name: 'Switzerland',
              y: 41277,
              z: 214.5
          }, {
              name: 'Germany',
              y: 357022,
              z: 235.6
          }]
      }]
  });
  }
  plotSimple3DBarChart(){
    Highcharts.chart('highcharts-3d-bar-chart', {
      chart: {
          type: 'cylinder',
          options3d: {
              enabled: true,
              alpha: 15,
              beta: 15,
              depth: 50,
              viewDistance: 25
          }
      },
      title: {
          text: 'Highcharts Cylinder Chart'
      },

      series: [{
          type:undefined,
          data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
          name: 'Cylinders',
          showInLegend: false
      }]
  });
  }
}
