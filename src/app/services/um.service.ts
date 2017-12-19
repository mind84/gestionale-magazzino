import { Injectable } from '@angular/core';

import {HttpClient, HttpParams} from '@angular/common/http';
import { FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import {Subject} from 'rxjs/Subject'

@Injectable()
export class UmService {
public umreference: object[] = [];

  constructor(private http:HttpClient) { }

 getMainReference():Observable<any> {
   if (this.umreference.length) return Observable.of(this.umreference)
   else return this.http.get("/um")
 }

 search(code){

   return this.http.get(`/um/code?code=${code}`)
 }

 insert(form:FormGroup) {
   let body:any = {};
   body = form.getRawValue();
   body.refId= body.nameref.id;
   delete body.nameref;
   delete body.umrefsymb;
   delete body.umref;
   return this.http.post("um/insert",body)
 }
}
