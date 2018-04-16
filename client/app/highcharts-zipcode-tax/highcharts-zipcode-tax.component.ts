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
  
  title: string = 'Total Income Amount - A02650';
  subtitle: string = '';

  public margin = {top: 20, right: 20, bottom: 30, left: 50};
  public width: number;
  public height: number;
  public x: any;
  public y: any;
  public xAxis;
  public yAxis;
  public gX;
  public gY;
  public svg: any;
  public line: d3Shape.Line<[number, number]>;
  public g;
  public bins_max = [];
  public data = {};
  public cluster_max = 0;
  public bar = {};
  public legend;
  public list_of_clusters
  public legendRectSize = 18;
  public legendSpacing = 4;
  public cluster_tracker = {
  			purple: true,
  			orange: true,
  			grey: true,
  			red: true,
  			blue: true,
  			green: true
  		};
  public cluster_safe;

  constructor() {
  }

  	ngOnInit() {
	  	this.chart()
	  	this.cluster_safe = this.list_of_clusters;
	}

	chart() {
		this.list_of_clusters = {	
									0: cluster1,
									1: cluster2,
									2: cluster3, 
									3: cluster4, 
									4: cluster5, 
									5: cluster6
								};
		for(var i in this.list_of_clusters) {
		    this.data[i] = [];
		    for(var item in this.list_of_clusters[i]) {
		        this.data[i].push(this.list_of_clusters[i][item])
		        if(this.list_of_clusters[i][item] > this.cluster_max)
		            this.cluster_max = this.list_of_clusters[i][item]
		    }
		}
		console.log(this.data)
		
		this.initSvg();
	  	this.width = 800
	    this.height = 750
	    this.initAxis();
	    this.drawAxis();
	    this.initLegend();
	    if(this.cluster_tracker['purple'])
	    	this.histogram(this.data[0], 'purple');
	   	if(this.cluster_tracker['orange'])
			this.histogram(this.data[1], 'orange');
		if(this.cluster_tracker['grey'])
			this.histogram(this.data[2], 'grey');
	    if(this.cluster_tracker['red'])
			this.histogram(this.data[3], 'red');
	    if(this.cluster_tracker['blue'])
			this.histogram(this.data[4], 'blue');
	    if(this.cluster_tracker['green'])
			this.histogram(this.data[5], 'green');
	}

  	private initSvg() {
    	this.svg = d3.select("svg").append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    	this.g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  	}

  	private initAxis(arg=null) {
    	this.x = d3Scale.scaleLinear().domain([0,  500]).range([0, this.width])
	    this.bins_max = d3Array.histogram().domain(this.x.domain()).thresholds(this.x.ticks(250))(this.data[1]);
	    console.log(this.bins_max.length)
	    //this.x = d3Scale.scaleLinear().domain([0,  2 * this.bins_max.length]).range([0, this.width])
    	this.y = d3Scale.scaleLinear().domain([0, d3Array.max(this.bins_max, function(d) { return d.length; })]).range([this.height, 0]);
 	}

    private drawAxis(arg=null) {
      	this.xAxis = d3.axisBottom(this.x);
	  	this.yAxis = d3.axisLeft(this.y);

	  	if(!arg){
			this.gX = this.g.append("g")
		    	.attr("class", "axis axis--x")
		  		.attr("transform", "translate(0," + this.height + ")")
	    		.call(this.xAxis);

	    	this.gY = this.g.append("g")
	    		.attr("class", "axis axis--y")
	    		.attr("transform", "translate(10," + 0 + ")")
	    		.call(this.yAxis);
	  	} else {
	  		console.log(this.gX.select('.axis--x'))
	  		this.gX.select('.axis--x').attr("transform", "translate(0," + this.height + ")").call(this.xAxis);
	  	}
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

  	private initLegend() {
	  	this.legend = d3.select("svg").selectAll('.legend')
	  		.data([ 
		  		{name: "cluster 1", color: "purple"},
		  		{name: "cluster 2", color: "orange"},
		  		{name: "cluster 3", color: "grey"},
		  		{name: "cluster 4", color: "red"},
		  		{name: "cluster 5", color: "blue"},
		  		{name: "cluster 6", color: "green"}
	  		]).enter()
			.append('g')
	  		.attr('class', 'legend')
			.attr('transform',(d, i) => {
				var height = this.legendRectSize + this.legendSpacing;          // NEW
	            var offset =  -this.height / 4;     // NEW
	            var horz = 800;                       // NEW
	            var vert = i * height - offset; 
				return "translate(" + horz + "," +  vert + ")";
		});

		this.legend.append('rect')
			.attr('width', this.legendRectSize)
			.attr('height', this.legendRectSize)
			.style('fill', (d) => { return d.color; })
			.on('click', (label) => {
				console.log(label.color)
				d3.selectAll("svg > *").remove();
				var temp = this.cluster_tracker[label.color];
				this.cluster_tracker[label.color] = !temp;
				if(label.color == "purple")
					var number = 0;
				if(label.color == "orange")
					var number = 1;
				if(label.color == "grey")
					var number = 2;
				if(label.color == "red")
					var number = 3;
				if(label.color == "blue")
					var number = 4;
				if(label.color == "green")
					var number = 5;

				if(temp){
					this.list_of_clusters[number] = "";
				} else {
					this.list_of_clusters[number] = this.cluster_safe[label.color];
				}

				this.chart()
			});

		this.legend.append('text')
			.attr('x', this.legendRectSize + this.legendSpacing)
			.attr('y', this.legendRectSize - this.legendSpacing)
			.text( (d) => { return d.name; });
	}

}
