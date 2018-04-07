import { Component, OnInit } from '@angular/core';
//import '../../DataCharts/NYC_zipcode_cluster' as Zipcode_Cluster;
import * as Zipcode_Cluster from './NYC_zipcode_cluster.js';
import { tileLayer, latLng, marker, icon, circleMarker } from 'leaflet';

@Component({
  selector: 'app-nyc-demographics',
  templateUrl: './nyc-demographics.component.html',
  styleUrls: ['./nyc-demographics.component.css']
})
export class NycDemographicsComponent implements OnInit {

  googleMaps = tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    detectRetina: true
  });

  circle_marker(latLng, color) {
  	if(color == 0)
  		color = 'red'
  	if(color == 1)
  		color = 'blue'
  	if(color == 2)
  		color = 'green'
  	return  circleMarker( latLng, {
	  radius: 6,
	  color: color
	});
  }
  //blues are very homogenous
  //red less homogenous
  //green is least homogenous
  layers = [ this.googleMaps ]

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Google Maps': this.googleMaps,
    },
    overlays: {
      'Mt. Rainier Paradise Start': this.paradise,
    }
  };

  options = {
	layers: this.layers
	],
	zoom: 10,
	center: latLng(40.7128, -74.0060)
  };

  constructor() { 
    console.log(Zipcode_Cluster)
    for(var zipcode in Zipcode_Cluster[0]){
    	let circleMarker = this.circle_marker([ Zipcode_Cluster['LAT'][zipcode], Zipcode_Cluster['LNG'][zipcode] ], Zipcode_Cluster[0][zipcode])
    	this.layers.push(circleMarker)
    }

  }

  ngOnInit() {
  }

}
