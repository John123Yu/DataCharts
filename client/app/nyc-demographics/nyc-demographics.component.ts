import { Component, OnInit } from '@angular/core';
import * as Zipcode_Cluster from './NYC_zipcode_cluster.js';
import * as demographic_data from './NYC_demographics.js';
import { tileLayer, latLng, marker, icon, circleMarker } from 'leaflet';

var demographic_object = {}

@Component({
  selector: 'app-nyc-demographics',
  templateUrl: './nyc-demographics.component.html',
  styleUrls: ['./nyc-demographics.component.css']
})
export class NycDemographicsComponent implements OnInit {

  demographic_object = {}

  googleMaps = tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    detectRetina: true
  });

  circle_marker(latLng, color, zipcode) {
  	if(color == 0)
  		color = 'red'
  	if(color == 1)
  		color = 'blue'
  	if(color == 2)
  		color = 'green'
  	let circle_marker = circleMarker( latLng, {
	  radius: 6,
	  color: color,
	  className: zipcode
	}).on("click", this.circleClick);
  	return circle_marker
  }
  //blues are very homogenous
  //red less homogenous
  //green is least homogenous
  layers = [ this.googleMaps ]

  circleClick(e) {
   let zipcode = e.target.options.className
   console.log(demographic_object[zipcode])
  }

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Google Maps': this.googleMaps
    }
  };

  options = {
	layers: this.layers
	,
	zoom: 10,
	center: latLng(40.7128, -74.0060)
  };

  constructor() { 
    for(var item in demographic_data['JURISDICTION NAME']){
  		let zipcode = demographic_data['JURISDICTION NAME'][item]
  		demographic_object[zipcode] = {}
  		for(var item_2 in demographic_data) {
  		  demographic_object[zipcode][item_2] = demographic_data[item_2][item]
  		}
  	}
  	//console.log(this.demographic_object)
    console.log(Zipcode_Cluster)
    for(var zipcode in Zipcode_Cluster[0]){
    	let circle_marker = this.circle_marker([ Zipcode_Cluster['LAT'][zipcode], Zipcode_Cluster['LNG'][zipcode] ], Zipcode_Cluster[0][zipcode], zipcode)
    	this.layers.push(circle_marker)
    }

  }

  ngOnInit() {
  }


}
