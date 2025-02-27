import { Component, ElementRef, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
import Variablepie from "highcharts/modules/variable-pie";
Variablepie(Highcharts);
import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);

import Cylinder from 'highcharts/modules/cylinder';
Cylinder(Highcharts);
import  HighchartsMore from "highcharts/highcharts-more";
import { highChartData } from '../data/data';
import { StockChart } from 'angular-highcharts';
import { StorageService } from '../storage.service';
HighchartsMore(Highcharts);

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  stock: StockChart;
  constructor(private storageService:StorageService) {
    let dataPayload = {
      labels:['Apples1', 'Bananas2', 'Oranges3'],
      title:"Fruit Consumption1",
      y_axis_title:"Fruit eaten2",
      series:[{
          name: 'Jane1',
          type: undefined,
          data: [-1, 0, 4]
      },
      {
          name: 'John2',
          type: undefined,
          data: [5, 7, 3]
      }]
    }
    this.storageService.setObject("simple_bar_chart",dataPayload)
    .then(result=>{
      console.log("data Payload Saved",result)
      this.plotSimpleBarChart();
    })
    .catch(error=>{
      console.log("error : data Payload not Saved",error)
    })
  }

  ionViewDidEnter() {
    // this.plotSimpleBarChart();
    this.plotSimpleStackedBarChart();
    this.plotSimplePieChart();
    this.plotDynamicSplineChart();
    this.plotSimpleDrilldownChart();
    this.plotSimpleVRPieChart()
    this.plotSimple3DBarChart();
    this.plotSimplePackedBubbleChart()
    this.plotSimpleSpeedoMeterChart()
    this.plotSimpleHighLineChart()
    this.plotSimpleRangeSelectorLineChart()
    // let lineGraph = new LineGraph()
    // lineGraph.createMaster()
    this.plotSimpleBubbleChart()
  }

  plotSimpleBarChart() {
    var payloadData:any = null
    this.storageService.getObject("simple_bar_chart")
    .then(result=>{
      console.log("simple_bar_chart result",result)
      payloadData = result
      let myChart = Highcharts.chart('highcharts-barchart', {
        chart: {
          type: 'bar'
        },
        title: {
          text: payloadData.title
        },
        xAxis: {
          categories: payloadData.labels
        },
        yAxis: {
          title: {
            text: payloadData.y_axis_title
          }
        },
        series: payloadData.series
      });
    })
    .catch(error=>{
      let myChart = Highcharts.chart('highcharts-barchart', {
        chart: {
          type: 'bar'
        },
        title: {
          text: "Fruit Consumption"
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
            data: [-1, 0, 4]
          },
          {
            name: 'John',
            type: undefined,
            data: [5, 7, 3]
          }]
      });    
    })
  }
  plotSimpleStackedBarChart() {
    let myChart = Highcharts.chart('highcharts-stacked-barchart', {
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
    let myChart = Highcharts.chart('highcharts-piechart', {
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
    let myChart = Highcharts.chart('highcharts-Dynamic-chart', {
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
  plotSimplePackedBubbleChart(){
    Highcharts.chart('highcharts-packed-bubble-chart', {
        chart: {
          type: 'packedbubble',
      },
      series: [{
          type:undefined,
          name: 'Coffee', // Coffee series
          data: [{
              // name property is used for the datalabel
              // value property is used for the volume of the bubble
              value: 12,
              name: 'Bert’'
          }, {
              value: 5,
              name: 'John’'
          }, {
              value: 10,
              name: 'Sandra'
          }, {
              value: 7,
              name: 'Cecile'
          }]
      }, {
          type:undefined,
          name: 'Energy drinks', // Energy drinks series
          data: [{
              value: 10,
              name: 'Tristan'
          }]
      }, {
          type:undefined,
          name: 'Tea', // Tea series
          data: [5, 6, 8, {
              value: 10,
              name: 'Mustapha',
              color: 'pink'
          }]
      }]
    });
  
  }
  plotSimpleSpeedoMeterChart(){
    let myChart = Highcharts.chart('highcharts-sm-Gauge-chart', {

      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
      },
  
      title: {
          text: 'Speedometer'
      },
  
      pane: {
          startAngle: -150,
          endAngle: 150,
          background: [{
              backgroundColor: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                      [0, '#FFF'],
                      [1, '#333']
                  ]
              },
              borderWidth: 0,
              outerRadius: '109%'
          }, {
              backgroundColor: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                      [0, '#333'],
                      [1, '#FFF']
                  ]
              },
              borderWidth: 1,
              outerRadius: '107%'
          }, {
              // default background
          }, {
              backgroundColor: '#DDD',
              borderWidth: 0,
              outerRadius: '105%',
              innerRadius: '103%'
          }]
      },
  
      // the value axis
      yAxis: {
          min: 0,
          max: 200,
          minorTickInterval: 'auto',
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: 'inside',
          minorTickColor: '#666',
          tickPixelInterval: 30,
          tickWidth: 2,
          tickPosition: 'inside',
          tickLength: 10,
          tickColor: '#666',
          labels: {
              step: 2,
              rotation:1
          },
          title: {
              text: 'km/h'
          },
          plotBands: [{
              from: 0,
              to: 120,
              color: '#55BF3B' // green
          }, {
              from: 120,
              to: 160,
              color: '#DDDF0D' // yellow
          }, {
              from: 160,
              to: 200,
              color: '#DF5353' // red
          }]
      },
  
      series: [{
          type:undefined, 
          name: 'Speed',
          data: [80],
          tooltip: {
              valueSuffix: ' km/h'
          }
      }]
  
    });
    setInterval(() => { 
      var point = myChart.series[0].points[0],
      newVal,
      inc = Math.round((Math.random() - 0.5) * 50);

      newVal = point.y + inc;
      if (newVal < 0 || newVal > 200) {
          newVal = point.y - inc;
      }

      point.update(newVal);
    }, 500);
  }

  plotSimpleHighLineChart(){
      Highcharts.chart('highcharts-line-graph-chart', {
          chart: {
              zoomType: 'x'
          },
          title: {
              text: 'USD to EUR exchange rate over time'
          },
          subtitle: {
              text: document.ontouchstart === undefined ?
                  'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
          },
          xAxis: {
              type: 'datetime'
          },
          yAxis: {
              title: {
                  text: 'Exchange rate'
              }
          },
          legend: {
              enabled: false
          },
          plotOptions: {
              area: {
     
                  marker: {
                      radius: 2
                  },
                  lineWidth: 1,
                  states: {
                      hover: {
                          lineWidth: 1
                      }
                  },
                  threshold: null
              }
          },

          series: [{
              type: 'area',
              name: 'USD to EUR',
              data: highChartData
          }]
      });
  }

  plotSimpleRangeSelectorLineChart(){
    Highcharts.stockChart('highcharts-range-selector-graph-chart', {
      
      title: {
          text: 'AAPL Stock Price'
      },

      subtitle: {
          text: 'Demo of placing the range selector above the navigator'
      },

      rangeSelector: {
          floating: true,
          y: -65,
          verticalAlign: 'bottom'
      },

      navigator: {
          margin: 60
      },

      series: [{
          type:undefined,
          name: 'AAPL',
          data: [[1545661800000,36.71],[1545834600000,39.29],[1545921000000,39.04],[1546007400000,39.06],[1546266600000,39.44],[1546439400000,39.48],[1546525800000,35.55],[1546612200000,37.06],[1546871400000,36.98],[1546957800000,37.69],[1547044200000,38.33],[1547130600000,38.45],[1547217000000,38.07],[1547476200000,37.5],[1547562600000,38.27],[1547649000000,38.74],[1547735400000,38.97],[1547821800000,39.21],[1548167400000,38.33],[1548253800000,38.48],[1548340200000,38.17],[1548426600000,39.44],[1548685800000,39.08],[1548772200000,38.67],[1548858600000,41.31],[1548945000000,41.61],[1549031400000,41.63],[1549290600000,42.81],[1549377000000,43.54],[1549463400000,43.56],[1549549800000,42.74],[1549636200000,42.6],[1549895400000,42.36],[1549981800000,42.72],[1550068200000,42.54],[1550154600000,42.7],[1550241000000,42.6],[1550586600000,42.73],[1550673000000,43.01],[1550759400000,42.76],[1550845800000,43.24],[1551105000000,43.56],[1551191400000,43.58],[1551277800000,43.72],[1551364200000,43.29],[1551450600000,43.74],[1551709800000,43.96],[1551796200000,43.88],[1551882600000,43.63],[1551969000000,43.13],[1552055400000,43.23],[1552311000000,44.72],[1552397400000,45.23],[1552483800000,45.43],[1552570200000,45.93],[1552656600000,46.53],[1552915800000,47.01],[1553002200000,46.63],[1553088600000,47.04],[1553175000000,48.77],[1553261400000,47.76],[1553520600000,47.19],[1553607000000,46.7],[1553693400000,47.12],[1553779800000,47.18],[1553866200000,47.49],[1554125400000,47.81],[1554211800000,48.51],[1554298200000,48.84],[1554384600000,48.92],[1554471000000,49.25],[1554730200000,50.03],[1554816600000,49.88],[1554903000000,50.15],[1554989400000,49.74],[1555075800000,49.72],[1555335000000,49.81],[1555421400000,49.81],[1555507800000,50.78],[1555594200000,50.97],[1555939800000,51.13],[1556026200000,51.87],[1556112600000,51.79],[1556199000000,51.32],[1556285400000,51.08],[1556544600000,51.15],[1556631000000,50.17],[1556717400000,52.63],[1556803800000,52.29],[1556890200000,52.94],[1557149400000,52.12],[1557235800000,50.72],[1557322200000,50.72],[1557408600000,50.18],[1557495000000,49.29],[1557754200000,46.43],[1557840600000,47.17],[1557927000000,47.73],[1558013400000,47.52],[1558099800000,47.25],[1558359000000,45.77],[1558445400000,46.65],[1558531800000,45.69],[1558618200000,44.92],[1558704600000,44.74],[1559050200000,44.56],[1559136600000,44.35],[1559223000000,44.58],[1559309400000,43.77],[1559568600000,43.33],[1559655000000,44.91],[1559741400000,45.63],[1559827800000,46.31],[1559914200000,47.54],[1560173400000,48.15],[1560259800000,48.7],[1560346200000,48.55],[1560432600000,48.54],[1560519000000,48.19],[1560778200000,48.47],[1560864600000,49.61],[1560951000000,49.47],[1561037400000,49.87],[1561123800000,49.69],[1561383000000,49.65],[1561469400000,48.89],[1561555800000,49.95],[1561642200000,49.94],[1561728600000,49.48],[1561987800000,50.39],[1562074200000,50.68],[1562160600000,51.1],[1562333400000,51.06],[1562592600000,50.01],[1562679000000,50.31],[1562765400000,50.81],[1562851800000,50.44],[1562938200000,50.83],[1563197400000,51.3],[1563283800000,51.13],[1563370200000,50.84],[1563456600000,51.42],[1563543000000,50.65],[1563802200000,51.81],[1563888600000,52.21],[1563975000000,52.17],[1564061400000,51.76],[1564147800000,51.94],[1564407000000,52.42],[1564493400000,52.19],[1564579800000,53.26],[1564666200000,52.11],[1564752600000,51.01],[1565011800000,48.33],[1565098200000,49.25],[1565184600000,49.76],[1565271000000,50.86],[1565357400000,50.25],[1565616600000,50.12],[1565703000000,52.24],[1565789400000,50.69],[1565875800000,50.44],[1565962200000,51.63],[1566221400000,52.59],[1566307800000,52.59],[1566394200000,53.16],[1566480600000,53.12],[1566567000000,50.66],[1566826200000,51.62],[1566912600000,51.04],[1566999000000,51.38],[1567085400000,52.25],[1567171800000,52.19],[1567517400000,51.42],[1567603800000,52.3],[1567690200000,53.32],[1567776600000,53.31],[1568035800000,53.54],[1568122200000,54.17],[1568208600000,55.9],[1568295000000,55.77],[1568381400000,54.69],[1568640600000,54.97],[1568727000000,55.17],[1568813400000,55.69],[1568899800000,55.24],[1568986200000,54.43],[1569245400000,54.68],[1569331800000,54.42],[1569418200000,55.26],[1569504600000,54.97],[1569591000000,54.71],[1569850200000,55.99],[1569936600000,56.15],[1570023000000,54.74],[1570109400000,55.21],[1570195800000,56.75],[1570455000000,56.76],[1570541400000,56.1],[1570627800000,56.76],[1570714200000,57.52],[1570800600000,59.05],[1571059800000,58.97],[1571146200000,58.83],[1571232600000,58.59],[1571319000000,58.82],[1571405400000,59.1],[1571664600000,60.13],[1571751000000,59.99],[1571837400000,60.79],[1571923800000,60.9],[1572010200000,61.65],[1572269400000,62.26],[1572355800000,60.82],[1572442200000,60.81],[1572528600000,62.19],[1572615000000,63.96],[1572877800000,64.38],[1572964200000,64.28],[1573050600000,64.31],[1573137000000,64.86],[1573223400000,65.04],[1573482600000,65.55],[1573569000000,65.49],[1573655400000,66.12],[1573741800000,65.66],[1573828200000,66.44],[1574087400000,66.78],[1574173800000,66.57],[1574260200000,65.8],[1574346600000,65.5],[1574433000000,65.44],[1574692200000,66.59],[1574778600000,66.07],[1574865000000,66.96],[1575037800000,66.81],[1575297000000,66.04],[1575383400000,64.86],[1575469800000,65.43],[1575556200000,66.39],[1575642600000,67.68],[1575901800000,66.73],[1575988200000,67.12],[1576074600000,67.69],[1576161000000,67.86],[1576247400000,68.79],[1576506600000,69.96],[1576593000000,70.1],[1576679400000,69.93],[1576765800000,70],[1576852200000,69.86],[1577111400000,71],[1577197800000,71.07],[1577370600000,72.48],[1577457000000,72.45],[1577716200000,72.88],[1577802600000,73.41],[1577975400000,75.09],[1578061800000,74.36],[1578321000000,74.95],[1578407400000,74.6],[1578493800000,75.8],[1578580200000,77.41],[1578666600000,77.58],[1578925800000,79.24],[1579012200000,78.17],[1579098600000,77.83],[1579185000000,78.81],[1579271400000,79.68],[1579617000000,79.14],[1579703400000,79.43],[1579789800000,79.81],[1579876200000,79.58],[1580135400000,77.24],[1580221800000,79.42],[1580308200000,81.08],[1580394600000,80.97],[1580481000000,77.38],[1580740200000,77.17],[1580826600000,79.71],[1580913000000,80.36],[1580999400000,81.3],[1581085800000,80.01],[1581345000000,80.39],[1581431400000,79.9],[1581517800000,81.8],[1581604200000,81.22],[1581690600000,81.24],[1582036200000,79.75],[1582122600000,80.9],[1582209000000,80.07],[1582295400000,78.26],[1582554600000,74.54],[1582641000000,72.02],[1582727400000,73.16],[1582813800000,68.38],[1582900200000,68.34],[1583159400000,74.7],[1583245800000,72.33],[1583332200000,75.68],[1583418600000,73.23],[1583505000000,72.26],[1583760600000,66.54],[1583847000000,71.33],[1583933400000,68.86],[1584019800000,62.06],[1584106200000,69.49],[1584365400000,60.55],[1584451800000,63.22],[1584538200000,61.67],[1584624600000,61.19],[1584711000000,57.31],[1584970200000,56.09],[1585056600000,61.72],[1585143000000,61.38],[1585229400000,64.61],[1585315800000,61.94],[1585575000000,63.7],[1585661400000,63.57],[1585747800000,60.23],[1585834200000,61.23],[1585920600000,60.35],[1586179800000,65.62],[1586266200000,64.86],[1586352600000,66.52],[1586439000000,67],[1586784600000,68.31],[1586871000000,71.76],[1586957400000,71.11],[1587043800000,71.67],[1587130200000,70.7],[1587389400000,69.23],[1587475800000,67.09],[1587562200000,69.03],[1587648600000,68.76],[1587735000000,70.74],[1587994200000,70.79],[1588080600000,69.64],[1588167000000,71.93],[1588253400000,73.45],[1588339800000,72.27],[1588599000000,73.29],[1588685400000,74.39],[1588771800000,75.16],[1588858200000,75.93],[1588944600000,77.53],[1589203800000,78.75],[1589290200000,77.85],[1589376600000,76.91],[1589463000000,77.39],[1589549400000,76.93],[1589808600000,78.74],[1589895000000,78.29],[1589981400000,79.81],[1590067800000,79.21],[1590154200000,79.72],[1590499800000,79.18],[1590586200000,79.53],[1590672600000,79.56],[1590759000000,79.49],[1591018200000,80.46],[1591104600000,80.83],[1591191000000,81.28],[1591277400000,80.58],[1591363800000,82.88],[1591623000000,83.36],[1591709400000,86],[1591795800000,88.21],[1591882200000,83.97],[1591968600000,84.7],[1592227800000,85.75],[1592314200000,88.02],[1592400600000,87.9],[1592487000000,87.93],[1592573400000,87.43],[1592832600000,89.72],[1592919000000,91.63],[1593005400000,90.01],[1593091800000,91.21],[1593178200000,88.41],[1593437400000,90.44],[1593523800000,91.2],[1593610200000,91.03],[1593696600000,91.03],[1594042200000,93.46],[1594128600000,93.17],[1594215000000,95.34],[1594301400000,95.75],[1594387800000,95.92],[1594647000000,95.48],[1594733400000,97.06],[1594819800000,97.72],[1594906200000,96.52],[1594992600000,96.33],[1595251800000,98.36],[1595338200000,97],[1595424600000,97.27],[1595511000000,92.85],[1595597400000,92.61],[1595856600000,94.81],[1595943000000,93.25],[1596029400000,95.04],[1596115800000,96.19],[1596202200000,106.26],[1596461400000,108.94],[1596547800000,109.67],[1596634200000,110.06],[1596720600000,113.9],[1596807000000,111.11],[1597066200000,112.73],[1597152600000,109.38],[1597239000000,113.01],[1597325400000,115.01],[1597411800000,114.91],[1597671000000,114.61],[1597757400000,115.56],[1597843800000,115.71],[1597930200000,118.28],[1598016600000,124.37],[1598275800000,125.86],[1598362200000,124.82],[1598448600000,126.52],[1598535000000,125.01],[1598621400000,124.81],[1598880600000,129.04],[1598967000000,134.18],[1599053400000,131.4],[1599139800000,120.88],[1599226200000,120.96],[1599571800000,112.82],[1599658200000,117.32],[1599744600000,113.49],[1599831000000,112],[1600090200000,115.36],[1600176600000,115.54],[1600263000000,112.13],[1600349400000,110.34],[1600435800000,106.84],[1600695000000,110.08],[1600781400000,111.81],[1600867800000,107.12],[1600954200000,108.22],[1601040600000,112.28],[1601299800000,114.96],[1601386200000,114.09],[1601472600000,115.81],[1601559000000,116.79],[1601645400000,113.02],[1601904600000,116.5],[1601991000000,113.16],[1602077400000,115.08],[1602163800000,114.97],[1602250200000,116.97],[1602509400000,124.4],[1602595800000,121.1],[1602682200000,121.19],[1602768600000,120.71],[1602855000000,119.02],[1603114200000,115.98],[1603200600000,117.51],[1603287000000,116.87],[1603373400000,115.75],[1603459800000,115.04],[1603719000000,115.05],[1603805400000,116.6],[1603891800000,111.2],[1603978200000,115.32],[1604064600000,108.86],[1604327400000,108.77],[1604413800000,110.44],[1604500200000,114.95],[1604586600000,119.03],[1604673000000,118.69],[1604932200000,116.32],[1605018600000,115.97],[1605105000000,119.49],[1605191400000,119.21],[1605277800000,119.26],[1605537000000,120.3],[1605623400000,119.39],[1605709800000,118.03],[1605796200000,118.64],[1605882600000,117.34],[1606141800000,113.85],[1606228200000,115.17],[1606314600000,116.03],[1606487400000,116.59],[1606746600000,119.05],[1606833000000,122.72],[1606919400000,123.08],[1607005800000,122.94],[1607092200000,122.25],[1607351400000,123.75],[1607437800000,124.38],[1607524200000,121.78],[1607610600000,123.24],[1607697000000,122.41],[1607956200000,121.78],[1608042600000,127.88],[1608129000000,127.81],[1608215400000,128.7],[1608301800000,126.66],[1608561000000,128.23]],
          tooltip: {
              valueDecimals: 2
          }
      }]
  });
}
plotSimpleBubbleChart(){
  Highcharts.chart('highcharts-bubble-graph-chart', {

    chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
    },

    title: {
        text: 'Highcharts bubbles with radial gradient fill'
    },

    xAxis: {
        gridLineWidth: 1,
        accessibility: {
            rangeDescription: 'Range: 0 to 100.'
        }
    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
        accessibility: {
            rangeDescription: 'Range: 0 to 100.'
        }
    },

    series: [{
        type:undefined,
        data: [
            [9, 81, 63],
            [98, 5, 89],
            [51, 50, 73],
            [41, 22, 14],
            [58, 24, 20],
            [78, 37, 34],
            [55, 56, 53],
            [18, 45, 70],
            [42, 44, 28],
            [3, 52, 59],
            [31, 18, 97],
            [79, 91, 63],
            [93, 23, 23],
            [44, 83, 22]
        ],
        marker: {
            fillColor: {
                radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                stops: [
                    [0, 'rgba(255,255,255,0.5)'],
                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
                ]
            }
        }
    }, {
        type:undefined,
        data: [
            [42, 38, 20],
            [6, 18, 1],
            [1, 93, 55],
            [57, 2, 90],
            [80, 76, 22],
            [11, 74, 96],
            [88, 56, 10],
            [30, 47, 49],
            [57, 62, 98],
            [4, 16, 16],
            [46, 10, 11],
            [22, 87, 89],
            [57, 91, 82],
            [45, 15, 98]
        ],
        marker: {
            fillColor: {
                radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                stops: [
                    [0, 'rgba(255,255,255,0.5)'],
                    [1, Highcharts.color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
                ]
            }
        }
    }]

});
}
}
class LineGraph {
  data = highChartData
  detailChart;
  createMaster() {
    let parentClass = this
    console.log("createMaster")
    Highcharts.chart('master-container', {
        chart: {
            reflow: false,
            borderWidth: 0,
            backgroundColor: null,
            marginLeft: 50,
            marginRight: 20,
            zoomType: 'x',
            events: {

                // listen to the selection event on the master chart to update the
                // extremes of the detail chart
                selection: function (event) {
                  console.log("selection")
                    var extremesObject = event.xAxis[0],
                        min = extremesObject.min,
                        max = extremesObject.max,
                        detailData = [],
                        xAxis = this.xAxis[0];

                    // reverse engineer the last part of the data
                    this.series[0].data.forEach(point => {
                        if (point.x > min && point.x < max) {
                            detailData.push([point.x, point.y]);
                        }
                    });

                    // move the plot bands to reflect the new detail span
                    xAxis.removePlotBand('mask-before');
                    xAxis.addPlotBand({
                        id: 'mask-before',
                        from: highChartData[0][0],
                        to: min,
                        color: 'rgba(0, 0, 0, 0.2)'
                    });

                    xAxis.removePlotBand('mask-after');
                    xAxis.addPlotBand({
                        id: 'mask-after',
                        from: max,
                        to: highChartData[highChartData.length - 1][0],
                        color: 'rgba(0, 0, 0, 0.2)'
                    });


                    parentClass.detailChart.series[0].setData(detailData);

                    return false;
                }
            }
        },
        title: {
            text: null
        },
        accessibility: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            minRange:14 * 24 * 3600000,
            plotBands: [{
                id: 'mask-before',
                from: highChartData[0][0],
                to: highChartData[highChartData.length - 1][0],
                color: 'rgba(0, 0, 0, 0.2)'
            }],
            title: {
                text: null
            }
        },
        yAxis: {
            gridLineWidth: 0,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            min: 0.6,
            showFirstLabel: false
        },
        tooltip: {
            formatter: function () {
                return false;
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            series: {
                lineWidth: 1,
                marker: {
                    enabled: false
                },
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                enableMouseTracking: false
            }
        },

        series: [{
            type: 'area',
            name: 'USD to EUR',
            pointInterval: 24 * 3600 * 1000,
            pointStart: highChartData[0][0],
            data: highChartData
        }],

        exporting: {
            enabled: false
        }

    }, masterChart => {
        this.createDetail(masterChart);
    }); // return chart instance
  }
  createDetail(masterChart) {
    // prepare the detail chart
    var detailData = [],
        detailStart = highChartData[0][0];

    masterChart.series[0].data.forEach(point => {
        if (point.x >= detailStart) {
            detailData.push(point.y);
        }
    });

    // create a detail chart referenced by a global variable
    this.detailChart = Highcharts.chart('detail-container', {
        chart: {
            reflow: false,
            marginLeft: 50,
            marginRight: 20,

        },

        credits: {
            enabled: false
        },
        title: {
            text: 'Historical USD to EUR Exchange Rate',
            align: 'left'
        },
        subtitle: {
            text: 'Select an area by dragging across the lower chart',
            align: 'left'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: null
            },
        },
        tooltip: {
            formatter: function () {
                var point = this.points[0];
                return '<b>' + point.series.name + '</b><br/>' + Highcharts.dateFormat('%A %B %e %Y', this.x) + ':<br/>' +
                    '1 USD = ' + Highcharts.numberFormat(point.y, 2) + ' EUR';
            },
            shared: true
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 3
                        }
                    }
                }
            }
        },
        series: [{
            type:undefined,
            name: 'USD to EUR',
            pointStart: detailStart,
            pointInterval: 24 * 3600 * 1000,
            data: detailData
        }],

        exporting: {
            enabled: false
        }

    }); // return chart
  }

}
