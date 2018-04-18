import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Data } from '../shared/models/data.model';

@Injectable()
export class StoreDataService {

  constructor(private http: HttpClient) { }

  getDatas(): Observable<Data[]> {
    return this.http.get<Data[]>('/api/datas');
  }

  countDatas(): Observable<number> {
    return this.http.get<number>('/api/datas/count');
  }

  addData(data: Data): Observable<Data> {
    return this.http.post<Data>('/api/data', data);
  }

  getData(data: Data): Observable<Data> {
    return this.http.get<Data>(`/api/data/${data._id}`);
  }

  editData(data: Data): Observable<string> {
    console.log(data)
    return this.http.put(`/api/data/${data._id}`, data, { responseType: 'text' });
  }

  deleteData(data: Data): Observable<string> {
    return this.http.delete(`/api/data/${data._id}`, { responseType: 'text' });
  }

}
