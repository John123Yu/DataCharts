import { Component, OnInit } from '@angular/core';
import * as cluster1 from './A02650_cluster1';
import * as cluster2 from './A02650_cluster2';
import * as cluster3 from './A02650_cluster3';
import * as cluster4 from './A02650_cluster4';
import * as cluster5 from './A02650_cluster5';
import * as cluster6 from './A02650_cluster6';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { Stocks } from '../shared/data';

@Component({
  selector: 'app-highcharts-zipcode-tax',
  templateUrl: './highcharts-zipcode-tax.component.html',
  styleUrls: ['./highcharts-zipcode-tax.component.css']
})
export class HighchartsZipcodeTaxComponent implements OnInit {
  
  title: string = 'Total Income Amount';
  subtitle: string = 'A02650';

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private xAxis;
  private yAxis;
  private gX;
  private gY;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;
  private g;
  private bins_max = [];
  private data = {};
  private cluster_max = 0;
  private bar = {};

  constructor() {
  }

  ngOnInit() {
	var list_of_clusters = [cluster1, cluster2, cluster3, cluster4, cluster5, cluster6];
	for(var i = 0; i < list_of_clusters.length; i++) {
	    this.data[i] = [];
	    for(var item in list_of_clusters[i]) {
	        this.data[i].push(list_of_clusters[i][item])
	        if(list_of_clusters[i][item] > this.cluster_max)
	            this.cluster_max = list_of_clusters[i][item]
	    }
	}
  	this.initSvg();
  	this.width = 800
    this.height = 750
    this.initAxis();
    this.drawAxis();
    this.histogram(this.data[0], 'purple');
	this.histogram(this.data[1], 'orange');
	this.histogram(this.data[2], 'grey');
	this.histogram(this.data[3], 'red');
	this.histogram(this.data[4], 'blue');
	this.histogram(this.data[5], 'green');
  }

  private initSvg() {
    this.svg = d3.select("svg")
           		.append("g")
                .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    this.g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  private initAxis() {
    this.x = d3Scale.scaleLinear().domain([0,  500]).range([0, this.width])
    this.bins_max = d3Array.histogram().domain(this.x.domain()).thresholds(this.x.ticks(250))(this.data[1]);
    this.y = d3Scale.scaleLinear().domain([0, d3Array.max(this.bins_max, function(d) { return d.length; })]).range([this.height, 0]);
  }

  private drawAxis() {
    this.xAxis = d3.axisBottom(this.x);
	this.yAxis = d3.axisLeft(this.y);

	this.gX = this.g.append("g")
    			.attr("class", "axis axis--x")
  			  	.attr("transform", "translate(0," + this.height + ")")
    			.call(this.xAxis);

    this.gY = this.g.append("g")
    			.attr("class", "axis axis--y")
    			.attr("transform", "translate(10," + 0 + ")")
    			.call(this.yAxis);
  }

  private histogram(data, color) {
    var bins = d3.histogram()
        .domain(this.x.domain())
        .thresholds(this.x.ticks(250))
        (data);

    this.bar[color] = this.g.selectAll(".bar" + color)
      .data(bins)
      .enter().append("g")
      .attr("class", "bar")
      .attr("transform", (d) => { return "translate(" + this.x(d.x0) + "," + this.y(d.length) + ")"; });

    this.bar[color].append("rect")
        .attr("x", 1)
        .style("fill", color)
        .style("opacity", .5)
        .attr("width", this.x(bins[0].x1) - this.x(bins[0].x0) - 1)
        .attr("height", (d) => { return this.height - this.y(d.length); });
  }
}
