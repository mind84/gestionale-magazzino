import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpParams} from '@angular/common/http';
import { FormGroup} from '@angular/forms';

@Injectable()
export class MagazzinoService {

  constructor(private http: HttpClient) { }

  getTransaction(code:string){
    return this.http.get(`store/transactions?code=${code}`)
  }

  addTransaction(form:FormGroup, art:any){
    let body:any={};
    body.currArt=art;
    body.trans=form.getRawValue()
    return this.http.post('/transaz/add', body)
  }

  remTransaction(form:FormGroup, art:any){
    let body:any={};
    body.currArt=art;
    body.trans=form.getRawValue()
    return this.http.post('/transaz/remove', body)
  }
}
