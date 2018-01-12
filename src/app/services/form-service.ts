import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {MaterialiItem} from '../shared/interfaces/item-materiali.interface'
import {FormChanges, FieldConfig} from '../shared/interfaces/form-interface'


import {MaterialiService} from './materiali.service'
import {CategorieArticoliService} from './categorie-articoli.service'

@Injectable()
export class FormService {
  private pushChange: Subject<FormChanges> = new Subject<FormChanges>()
  public pushChange$:Observable<FormChanges> = this.pushChange.asObservable();
  constructor(private matServ:MaterialiService, private catServ: CategorieArticoliService) { }

  public pushChanges(config: FieldConfig,change:any){
    let changes = this.createChangeItem(config,change);
    
    this.pushChange.next(changes)
  }
  public materialiSearch(par:string):Observable<MaterialiItem>{
    return this.matServ.searchByName(par)
  }

  public categorieSearch(par:string){
    return this.catServ.search(par)
  }

  public createChangeItem(config:FieldConfig,itemConf):FormChanges{
    let changes:FormChanges = {
      formControlName:config.formControlName,
      valueToUpdate:itemConf[config.formControlName],
      fromService:itemConf
    }
    return changes;
  }

}
