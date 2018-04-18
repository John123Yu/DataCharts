import { Component, OnInit, OnDestroy } from '@angular/core';
//import * as cluster1 from './A02650_cluster1';
//import * as cluster2 from './A02650_cluster2';
//import * as cluster3 from './A02650_cluster3';
//import * as cluster4 from './A02650_cluster4';
//import * as cluster5 from './A02650_cluster5';
//import * as cluster6 from './A02650_cluster6';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';
import { StoreDataService } from '../services/storeData.service';
import { Data } from '../shared/models/data.model';

@Component({
  selector: 'app-highcharts-zipcode-tax',
  templateUrl: './highcharts-zipcode-tax.component.html',
  styleUrls: ['./highcharts-zipcode-tax.component.css']
})
export class HighchartsZipcodeTaxComponent implements OnInit, OnDestroy {
  
  title: string = '';
  subtitle: string = '';
  private id : number;
  private route$ : Subscription;

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
  public control_panel;
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
  public x_e = 500;
  public y_e = 0;
  public x_o = 0;
  public y_o = 0;
  public data_ = new Data();
  public complete_list: any;
  public x_move;

  	constructor(private storeDataService: StoreDataService, private route : ActivatedRoute) {
  	}

  	ngOnInit() {
  		this.route$ = this.route.params.subscribe(
            (params : Params) => {
                this.id = params["id"]; // cast to number
            }
        );
		console.log(this.id)
		this.data_._id = this.id.toString();
		this.storeDataService.getData(this.data_).subscribe(
			(res) => {
				console.log(res)
				this.title = res.name;
				this.complete_list = res.data_list;
				this.data = res.data_object;
				this.complete_list.sort( (a, b) => { return a - b; });
				var q1 = this.complete_list[Math.floor((this.complete_list.length / 4))];
				var q3 = this.complete_list[Math.ceil((this.complete_list.length * (3 / 4)))];
				var iqr = q3 - q1;
				this.x_move = iqr;
				var maxValue = q3 + iqr*4;
		    	var minValue = q1 - iqr*4;
		    	console.log("q1 ", q1)
		    	console.log("q3 ", q3)
		    	console.log("iqr ", iqr)
		    	console.log(maxValue, minValue)
		    	var filteredValues = this.complete_list.filter( (x) => {
			        return (x <= maxValue);
			    });
			    console.log(filteredValues[filteredValues.length - 1])
			    this.x_e = filteredValues[filteredValues.length - 1]
			    console.log(filteredValues[0])
			  	this.chart(true)
			},
			error => console.log(error)
		)

	}
	ngOnDestroy() {
        if(this.route$) this.route$.unsubscribe();
    }

	chart(arg=null) {
		this.initSvg();
	  	this.width = 1000
	    this.height = 750
	    this.initAxis(arg);
	    this.drawAxis();
	    this.initLegend();
	    this.initArrows();
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
  		if(arg) {
	    	this.x = d3Scale.scaleLinear().domain([this.x_o,  this.x_e]).range([0, this.width])
		    this.bins_max = d3Array.histogram().domain(this.x.domain()).thresholds(this.x.ticks(200))(this.data[1]);
		    this.y_e = d3.max(this.bins_max, function(d) { return d.length; })
	    	this.y = d3Scale.scaleLinear().domain([this.y_o, this.y_e]).range([this.height, 0]);
  		} else {
  			this.x = d3Scale.scaleLinear().domain([this.x_o,  this.x_e]).range([0, this.width])
	    	this.y = d3Scale.scaleLinear().domain([this.y_o, this.y_e]).range([this.height, 0]);
  		}
 	}

    private drawAxis(arg=null) {
      	this.xAxis = d3.axisBottom(this.x);
	  	this.yAxis = d3.axisLeft(this.y);

		this.gX = this.g.append("g")
	    	.attr("class", "axis axis--x")
	  		.attr("transform", "translate(0," + this.height + ")")
    		.call(this.xAxis);

    	this.gY = this.g.append("g")
    		.attr("class", "axis axis--y")
    		.attr("transform", "translate(0," + 0 + ")")
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
				d3.selectAll("svg > *").remove();
				var temp = this.cluster_tracker[label.color];
				this.cluster_tracker[label.color] = !temp;
				this.chart()
			});

		this.legend.append('text')
			.attr('x', this.legendRectSize + this.legendSpacing)
			.attr('y', this.legendRectSize - this.legendSpacing)
			.text( (d) => { return d.name; });
	}

	private initArrows() {

	this.control_panel = d3.select("svg").selectAll('.control_panel')
	  		.data([ 
		  		{name: "XOP"},
		  		{name: "XOM"},
		  		{name: "XEP"},
		  		{name: "XEM"},
		  		{name: "YOP"},
		  		{name: "YOM"},
		  		{name: "YEP"},
		  		{name: "YEM"},
	  		]).enter()
			.append('g')
	  		.attr('class', 'legend')
			.attr('transform',(d, i) => {
				var height = this.legendRectSize + this.legendSpacing;          // NEW
	            var offset =  -this.height / 4;     // NEW
	            var horz = 800;                       // NEW
	            var vert = (i * height - offset) + 170; 
				return "translate(" + horz + "," +  vert + ")";
		});

	this.control_panel.append('rect')
			.attr('width', this.legendRectSize)
			.attr('height', this.legendRectSize)
			.style('fill', (d) => { return "brown"; })
			.on('click', (label) => {
				d3.selectAll("svg > *").remove();
				if(label.name == 'XOP')
					this.x_o += 50;
				if(label.name == 'XOM')
					this.x_o -= 50;
				if(label.name == 'XEP')
					this.x_e += 50;
				if(label.name == 'XEM')
					this.x_e -= 50;
				if(label.name == 'YOP')
					this.y_o += 50;
				if(label.name == 'YOM')
					this.y_o -= 50;
				if(label.name == 'YEP')
					this.y_e += 50;
				if(label.name == 'YEM')
					this.y_e -= 50
				this.chart()
			});

	this.control_panel.append('text')
			.attr('x', this.legendRectSize + this.legendSpacing)
			.attr('y', this.legendRectSize - this.legendSpacing)
			.text( (d) => { return d.name; });
	}
}
