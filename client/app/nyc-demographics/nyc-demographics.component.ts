import { Component, OnInit } from '@angular/core';
//import '../../DataCharts/NYC_zipcode_cluster' as Zipcode_Cluster;
import * as Zipcode_Cluster from './NYC_zipcode_cluster.js';

@Component({
  selector: 'app-nyc-demographics',
  templateUrl: './nyc-demographics.component.html',
  styleUrls: ['./nyc-demographics.component.css']
})
export class NycDemographicsComponent implements OnInit {

  
  constructor() { 
    console.log(Zipcode_Cluster)
  }

  ngOnInit() {
  }

}
