import { Injectable, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpParams} from '@angular/common/http';
import { FormGroup} from '@angular/forms';

@Injectable()
export class MaterialiService implements OnInit {
  private currentSelectedArticle: Subject<any> = new Subject<any>();
  public currentSelectedArticle$: Observable<any> = this.currentSelectedArticle.asObservable();
  public setCurrentFunc: Function;
  public findFunction:Function
  constructor(private http:HttpClient) {
    this.setCurrentFunc = this.setCurrentSelectedArticle.bind(this)
    this.findFunction = this.searchByName.bind(this)
   }
  ngOnInit(){

  }
  insert(form:FormGroup) {
    let body:any = {};
    body = form.getRawValue();
    return this.http.post('/mat/insert', body)
  }

  search(code:string, name:string, categ:any){
    return this.http.get(`/mat?code=${code}&name=${name}&categ=${categ}`)
  }

  update(form:any){
    return this.http.post("/mat/update", form)
  }
  searchByName(term:string){
    return this.http.get(`/mat/byname?name=${term}`)
  }
  public setCurrentSelectedArticle(article:any){
    this.currentSelectedArticle.next(article);
  }

  tryFunc(){
    console.log('triggered')
  }
}
