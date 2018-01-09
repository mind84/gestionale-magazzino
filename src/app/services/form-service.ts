import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {MaterialiItem} from '../shared/interfaces/item-materiali.interface'
import {FormChanges} from '../shared/interfaces/form-interface'

@Injectable()
export class FormService {
  private pushChange: Subject<FormChanges> = new Subject<FormChanges>()
  public pushChange$:Observable<FormChanges> = this.pushChange.asObservable();
  constructor() { }

  public pushChanges(changes:FormChanges){
    this.pushChange.next(changes)
  }
}
