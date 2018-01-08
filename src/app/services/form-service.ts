import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpParams} from '@angular/common/http';
import { FormGroup} from '@angular/forms';
import {MaterialiItem} from '../shared/interfaces/item-materiali.interface'

@Injectable()
export class FormService {
  private pushChange: Subject<any> = new Subject<any>()
  public pushChange$:Observable<any> = this.pushChange.asObservable();
  constructor() { }

  public pushChanges(changes:any){
    this.pushChange.next(changes)
  }
}
