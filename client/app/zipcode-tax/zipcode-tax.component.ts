import { Component, OnInit } from '@angular/core';
import * as zipcode_tax_cluster from './tax_by_zip_codes_kmeans-noN1.js';
import { tileLayer, latLng, marker, icon, circleMarker } from 'leaflet';
import * as cluster_means from './cluster_means 2.js';

var green = 0,
	grey = 0, 
	red = 0, 
	blue = 0, 
	orange = 0;

@Component({
  selector: 'app-zipcode-tax',
  templateUrl: './zipcode-tax.component.html',
  styleUrls: ['./zipcode-tax.component.css']
})
export class ZipcodeTaxComponent implements OnInit {

  constructor() {
    //console.log(zipcode_tax_cluster['y_kmeans'])
    //console.log(zipcode_tax_cluster)
    for(var zipcode in zipcode_tax_cluster['y_kmeans']){
    	if(zipcode_tax_cluster['latitude'][zipcode] == null)
    		continue;
    	if(zipcode_tax_cluster['longitude'][zipcode] == null)
    		continue;
    	let circle_marker = this.circle_marker([ zipcode_tax_cluster['latitude'][zipcode], zipcode_tax_cluster['longitude'][zipcode] ], zipcode_tax_cluster['y_kmeans'][zipcode], zipcode)
    	this.layers.push(circle_marker)
    }
    console.log(cluster_means)
    console.log("green: ", green)
    console.log("red: ", red)
    console.log("grey: ", grey)
    console.log("orange: ", orange)
    console.log("blue: ", blue)
  }

  cluster_means = cluster_means;

  ngOnInit() {
  }

  googleMaps = tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    detectRetina: true
  });

  layers = [ this.googleMaps ]

  circle_marker(latLng, color, zipcode) {
  	//console.log(latLng, color, zipcode)
  	if(color == 0) {
  		color = 'green';
  		green++;
  	}
  	if(color == 1) {
  		color = 'orange'
  		orange++;
  	}
  	if(color == 2) {
  		color = 'red'
  		red++;
  	}
  	if(color == 3) {
  		color = 'blue'
  		blue++;
  	}
  	if(color == 4) {
  		color = 'grey'
  		grey++;
  	}
  	let circle_marker = circleMarker( latLng, {
	  radius: .5,
	  color: color,
	  className : zipcode
	}).on("click", this.circleClick);
  	return circle_marker
  }

  circleClick(e) {
   let zipcode = e.target.options.className
   console.log(zipcode)
  }

  layersControl = {
    baseLayers: {
      'Google Maps': this.googleMaps
    }
  };

  options = {
	layers: this.layers,
	zoom: 5,
	center: latLng(40.7128, -74.0060)
  };

}
