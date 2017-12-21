import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpParams} from '@angular/common/http';
import { FormGroup} from '@angular/forms';

@Injectable()
export class CategorieArticoliService {

  constructor(private http:HttpClient) { }

  insert(form:FormGroup) {
    let body:any = {};
    body = form.getRawValue();
    return this.http.post('/catart/insert', body)
  }

  search(name:string){
    return this.http.get(`/catart?name=${name}`)
  }

  update(form:any){
    return this.http.post("/catart/update", form)
  }

}
