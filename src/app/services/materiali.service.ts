import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpParams} from '@angular/common/http';
import { FormGroup} from '@angular/forms';

@Injectable()
export class MaterialiService {

  constructor(private http:HttpClient) { }

  insert(form:FormGroup) {
    let body:any = {};
    body = form.getRawValue();
    return this.http.post('/mat/insert', body)
  }

  search(code:string, name:string){
    return this.http.get(`/mat?code=${code}&name=${name}`)
  }

  update(form:any){
    console.log(form);
    return this.http.post("/mat/update", form)
  }
}
