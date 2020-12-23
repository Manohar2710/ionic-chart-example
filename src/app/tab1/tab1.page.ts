import { Component } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';
import * as Highcharts from 'highcharts';

import { StatsBarChart, StatsPieChart } from '../data/data';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  stockDataList = [
  {id:1,
  name:"DOW j",
  description:"Dow Jones Industries",
  stockValue:"30,216.45",
  buttonValue:"-10.22"},
  {id:2,name:"STI",
  description:"STI index",
  stockValue:"2,827.32",
  buttonValue:"-19.22"},
  {id:3,name:"AAPL",
  description:"Apple inc.",
  stockValue:"128.45",
  buttonValue:"-1.22"},
  {id:4,name:"BA",
  description:"The Boeing Company",
  stockValue:"219.45",
  buttonValue:"-0.22"},
  {id:5,name:"BRK-B",
  description:"Berkshire Hathaway Inc.",
  stockValue:"223.45",
  buttonValue:"+0.22"},
  {id:6,name:"DIS",
  description:"The Walt Disney Company",
  stockValue:"170.45",
  buttonValue:"-2.22"},
  {id:7,name:"GE",
  description:"General Electric Company",
  stockValue:"10.45",
  buttonValue:"-0.02"}];
  title = 'Stocks';
  width: number;
  height: number;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  x: any;
  y: any;
  svgBarChart: any;
  g: any;


  radius: number;
  arc: any;
  labelArc: any;
  labelPer: any;
  pie: any;
  color: any;
  svgPieChart: any;

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;

  }
  ngOnInit() {
    // this.initSvgBarChart();
    // this.initAxis();
    // this.drawAxis();
    // this.drawBars();

    // this.initSvgPieChart();
    // this.drawPie();
    console.log("ngOnInit")
    setTimeout(() => {
    this.stockDataList.map(item=>{
      this.initChart(item.id)
    })
    }, 1000);

    
  }
  async initChart(itemIndex) {
    let divId = 'highcharts-spline-chart-'+itemIndex
    console.log("initChart",itemIndex,divId)

    let myChart = Highcharts.chart(divId, {
      credits: {
        enabled: false
      },
      chart: {
        type: 'spline',
        height: 50,
        width : 100,
        // animation: true, // don't animate in old IE
        // marginRight: 10,
        events: {
          load: function () {

            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = Math.ceil(Math.random() * 99) * (Math.round(Math.random()) ? 1 : -1);
              series.addPoint([x, y], true, true);
            }, 2000);
          }
        }
        
      },

      time: {
        useUTC: false
      },

      title: {
        text: ''
      },
      xAxis: {
        visible:false,
        labels: {
          enabled: false
        }
        
      },
      yAxis: {
        visible:false,
        plotLines: [{
          value: 0,
          width: 1,
          color: '#aaa',
          zIndex: 10
        }],
        
        labels: {
          enabled: false,
          
        }
      },
      tooltip: {
        enabled:false
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      plotOptions: {
        series: {
            color: '#FF0000',
            marker: {
                enabled: false
            },
            point: {
              events: {
                  click: function (e) {
                    e.preventDefault();
                  }
              }
            }
        },
        
      },
      series: [{
        // name: 'Random data',
        type: undefined,

        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.ceil(Math.random() * 99) * (Math.round(Math.random()) ? 1 : -1)
            });
          }
          return data;
        }()),
        zones: [{
          value: 0,
          color: '#ff0000'
        }, {
          color: '#00ff00'
        }]
      }]

    });
  }
  initSvgBarChart() {
    this.svgBarChart = d3.select('#barChart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');
    this.g = this.svgBarChart.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }


  initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(StatsBarChart.map((d) => d.company));
    this.y.domain([0, d3Array.max(StatsBarChart, (d) => d.frequency)]);
  }
  drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');
  }

  drawBars() {
    this.g.selectAll('.bar')
      .data(StatsBarChart)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => this.x(d.company))
      .attr('y', (d) => this.y(d.frequency))
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - this.y(d.frequency));
  }

  initSvgPieChart() {
    this.color = d3Scale.scaleOrdinal()
        .range(['#FFA500', '#00FF00', '#FF0000', '#6b486b', '#FF00FF', '#d0743c', '#00FA9A']);
    this.arc = d3Shape.arc()
        .outerRadius(this.radius - 10)
        .innerRadius(0);
    this.labelArc = d3Shape.arc()
        .outerRadius(this.radius - 40)
        .innerRadius(this.radius - 40);

    this.labelPer = d3Shape.arc()
        .outerRadius(this.radius - 80)
        .innerRadius(this.radius - 80);

    this.pie = d3Shape.pie()
        .sort(null)
        .value((d: any) => d.electionP);

    this.svgPieChart = d3.select('#pieChart')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 ' + Math.min(this.width, this.height) + ' ' + Math.min(this.width, this.height))
        .append('g')
        .attr('transform', 'translate(' + Math.min(this.width, this.height) / 2 + ',' + Math.min(this.width, this.height) / 2 + ')');
  }

  drawPie() {
    const g = this.svgPieChart.selectAll('.arc')
        .data(this.pie(StatsPieChart))
        .enter().append('g')
        .attr('class', 'arc');
    g.append('path').attr('d', this.arc)
        .style('fill', (d: any) => this.color(d.data.party) );
    g.append('text').attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
        .attr('dy', '.35em')
        .text((d: any) => d.data.party);

    g.append('text').attr('transform', (d: any) => 'translate(' + this.labelPer.centroid(d) + ')')
        .attr('dy', '.35em')
        .text((d: any) => d.data.electionP + '%');
  }

  
}
