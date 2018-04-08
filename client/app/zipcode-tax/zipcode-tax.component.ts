import { Component, OnInit } from '@angular/core';
import * as zipcode_tax_cluster from './tax_by_zip_codes_kmeans-noN1.js';
import { tileLayer, latLng, marker, icon, circleMarker } from 'leaflet';


@Component({
  selector: 'app-zipcode-tax',
  templateUrl: './zipcode-tax.component.html',
  styleUrls: ['./zipcode-tax.component.css']
})
export class ZipcodeTaxComponent implements OnInit {

  constructor() {
    console.log(zipcode_tax_cluster['y_kmeans'])
    console.log(zipcode_tax_cluster)
    for(var zipcode in zipcode_tax_cluster['y_kmeans']){
    	if(zipcode_tax_cluster['latitude'][zipcode] == null)
    		continue;
    	if(zipcode_tax_cluster['longitude'][zipcode] == null)
    		continue;
    	let circle_marker = this.circle_marker([ zipcode_tax_cluster['latitude'][zipcode], zipcode_tax_cluster['longitude'][zipcode] ], zipcode_tax_cluster['y_kmeans'][zipcode], zipcode)
    	this.layers.push(circle_marker)
    }
  }

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
  	if(color == 0)
  		color = 'red'
  	if(color == 1)
  		color = 'blue'
  	if(color == 2)
  		color = 'green'
  	if(color == 3)
  		color = 'yellow'
  	let circle_marker = circleMarker( latLng, {
	  radius: 1,
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
