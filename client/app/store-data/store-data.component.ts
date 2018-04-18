import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import * as cluster1 from './VITA_EIC_cluster1';
import * as cluster2 from './VITA_EIC_cluster2';
import * as cluster3 from './VITA_EIC_cluster3';
import * as cluster4 from './VITA_EIC_cluster4';
import * as cluster5 from './VITA_EIC_cluster5';
import * as cluster6 from './VITA_EIC_cluster6';
//var cluster1, cluster2, cluster3, cluster4, cluster5, cluster6 = "";

import * as data_description from './data_description';
import { StoreDataService } from '../services/storeData.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Data } from '../shared/models/data.model';

@Component({
  selector: 'app-store-data',
  templateUrl: './store-data.component.html',
  styleUrls: ['./store-data.component.css']
})
export class StoreDataComponent implements OnInit {

  data_store = {};
  complete_list = [];
  list_of_clusters;
  data = new Data();
  datas: Data[] = [];
  isLoading = true;
  isEditing = false;

  //addDataForm: FormGroup;
  name = new FormControl('', Validators.required);

  constructor(private storeDataService: StoreDataService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) {}

  ngOnInit() {
  	this.list_of_clusters = { "0": cluster1, "1": cluster2, "2": cluster3, "3": cluster4,  "4": cluster5, "5": cluster6 };
		for(var i in this.list_of_clusters) {
		    this.data_store[i] = [];
		    for(var item in this.list_of_clusters[i]) {
		        this.data_store[i].push(this.list_of_clusters[i][item]);
		        this.complete_list.push(this.list_of_clusters[i][item]);
			    }
		}
		//console.log(this.data_store);
		//console.log(this.complete_list)
		//data_object: object;
	  //data_list: object;
	  this.data.name = "VITA_EIC"
		this.data.data_object = this.data_store;
    this.data.data_list = this.complete_list;
		this.getDatas();
  }

  getDatas() {
    this.storeDataService.getDatas().subscribe(
      data => {
        this.datas = data;
        for(var i=0; i<this.datas.length; i++) {
          this.datas[i]['description'] = data_description[this.datas[i].name]
        }
        //this.datas.push(this.data);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addData() {
    console.log(this.data)
    this.storeDataService.addData(this.data).subscribe(
      res => {
        this.datas.push(res);
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(data: Data) {
    this.isEditing = true;
    this.data = data;
  }

  cancelEditing() {
    this.isEditing = false;
    this.data = new Data();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the datas to reset the editing
    this.getDatas();
  }

  editData(data: Data) {
    this.storeDataService.editData(data).subscribe(
      () => {
        this.isEditing = false;
        this.data = data;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteData(data: Data) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.storeDataService.deleteData(data).subscribe(
        () => {
          const pos = this.datas.map(elem => elem._id).indexOf(data._id);
          this.datas.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}
