import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'
@Injectable()
export class CommunicationService {
  private getCom: Subject<any> = new Subject<any>()
  public getCom$: Observable<any> = this.getCom.asObservable()
  public doCom:Function;
  constructor() {
    this.doCom = this.communicate.bind(this)
   }

  public communicate(par?:any){
    this.getCom.next(par);
  }
}
