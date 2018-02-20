import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {MaterialiItem} from '../shared/interfaces/item-materiali.interface'

import {FormChanges, FieldConfig} from '../shared/interfaces/form-interface'


import {MaterialiService} from './materiali.service'
import {CategorieArticoliService} from './categorie-articoli.service'
import {FornitoriService} from './fornitori.service'
import {UmService} from './um.service'

@Injectable()
export class FormService {
  private pushChange: Subject<FormChanges> = new Subject<FormChanges>()
  public pushChange$:Observable<FormChanges> = this.pushChange.asObservable();
  constructor(private matServ:MaterialiService, private catServ: CategorieArticoliService, private um:UmService, private fornServ:FornitoriService) { }

  public pushChanges(config: FieldConfig,change:any){
    let changes = this.createChangeItem(config,change);
    this.pushChange.next(changes)
  }
  public materialiSearch(par:string):Observable<MaterialiItem>{
    return this.matServ.searchByName(par)
  }

  public fornitoriSearch(par:string):Observable<any>{
    return this.fornServ.search(par)
  }

  public categorieSearch(par:string){
    return this.catServ.search(par)
  }
  public getUM(){
    return this.um.get();
  }
  public getUMMain(){
      return this.um.getMainReference()
  }

  public createChangeItem(config:FieldConfig,itemConf):FormChanges{
    let changes:FormChanges = {
      formControlName:config.formControlName,
      valueToUpdate:itemConf[config.formControlName],
      fromService:itemConf.updateObj,
      selectedOption: itemConf.selectedOption ? itemConf.selectedOption : null
    }
    return changes;
  }

  public prezzoArticolo(form:FormGroup, lists){
    const scontoForn = form.controls.scontoforn.value;
    const scontoProd = form.controls.scontoprod.value;
    const prezzo = form.controls.price.value;
    if (!prezzo) return null;
    let finalprice;
    finalprice = prezzo*(100-scontoForn)*(100-scontoProd)/10000
    return Math.round(finalprice * 100) / 100;
  }

}
