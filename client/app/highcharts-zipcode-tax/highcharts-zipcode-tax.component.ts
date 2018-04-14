import { Component, OnInit } from '@angular/core';
import * as A02650_c1 from './A02650_cluster1.js';
//import { HighchartsService } from '../services/cat.service';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { highchartsFactory } from '../app.module'

declare var require: any;
const histogram = require('highcharts-histogram-bellcurve');

@Component({
  selector: 'app-highcharts-zipcode-tax',
  templateUrl: './highcharts-zipcode-tax.component.html',
  styleUrls: ['./highcharts-zipcode-tax.component.css']
})
export class HighchartsZipcodeTaxComponent implements OnInit {

  constructor() {
  	var data = [3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3, 3, 4, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3, 3.8, 3.2, 3.7, 3.3, 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2, 3, 2.2, 2.9, 2.9, 3.1, 3, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3, 2.8, 3, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3, 3.4, 3.1, 2.3, 3, 2.5, 2.6, 3, 2.6, 2.3, 2.7, 3, 2.9, 2.9, 2.5, 2.8, 3.3, 2.7, 3, 2.9, 3, 3, 2.5, 2.9, 2.5, 3.6, 3.2, 2.7, 3, 2.5, 2.8, 3.2, 3, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7, 3.3, 3.2, 2.8, 3, 2.8, 3, 2.8, 3.8, 2.8, 2.8, 2.6, 3, 3.4, 3.1, 3, 3.1, 3.1, 3.1, 2.7, 3.2, 3.3, 3, 2.5, 3, 3.4, 3];

  	console.log(A02650_c1)
  	this.options = {
	title: {
        text: 'Highcharts Histogram'
    },
    series: [{
        type: histogram,
        xAxis: 1,
        yAxis: 1,
        baseSeries: 1
    }, {
        data: [3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4]
    }]
    };
  }

  options: Object;

  ngOnInit() {
  }

}
