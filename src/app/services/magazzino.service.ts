import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpParams} from '@angular/common/http';
import { FormGroup} from '@angular/forms';
import {MaterialiItem} from '../shared/interfaces/item-materiali.interface'

@Injectable()
export class MagazzinoService {
  private currentSelectedSearchArticle: Subject<MaterialiItem> = new Subject<MaterialiItem>();
  public currentSelectedSearchArticle$: Observable<any> = this.currentSelectedSearchArticle.asObservable();
  public setCurrArt = this.setCurrentSelectedSearchArticle.bind(this)
  constructor(private http: HttpClient) {


   }

  public setCurrentSelectedSearchArticle(article:MaterialiItem):void{
    this.currentSelectedSearchArticle.next(article);
  }
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
