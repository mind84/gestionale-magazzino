import { Component,ChangeDetectorRef, OnInit,ViewChild, AfterViewInit, AfterViewChecked, Injector} from '@angular/core';

import {MaterialiService} from '../services/materiali.service';
import {MagazzinoService} from '../services/magazzino.service';
import {MaterialiItem} from '../shared/interfaces/item-materiali.interface'
import {Subject} from 'rxjs/Subject'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'
import {DynamicFormComponent} from '../shared/components/dynamic-form.component'
import {FormChanges, FormConfig, FieldConfig} from '../shared/interfaces/form-interface'
import {DynFormsFieldConf} from '../shared/sharedClass/form-config.class'
/*configurazioni*/
import {SEARCHFIELDS, ADDTRANSFIELDS, REMTRANSFIELDS} from './configuration/magazzino-forms.conf'

import 'rxjs/add/operator/pairwise'
import 'rxjs/add/operator/switchMap'


@Component({
  selector: 'app-magazzino',
  templateUrl: './magazzino.component.html',
  styleUrls: ['./magazzino.component.css'],
    providers: [
      MaterialiService,
       MagazzinoService,
       DynFormsFieldConf
     ]
})
export class MagazzinoComponent implements OnInit {

  _addTransForm: DynamicFormComponent;
  _remTransForm: DynamicFormComponent;
  variationMode:boolean = true;
  currentArticle:MaterialiItem;

  private setCodeForSearch:Subject<any> = new Subject<any>();
  public setCodeForSearch$:Observable<any> = this.setCodeForSearch.asObservable()

  private isAddingMode:boolean = true;

  searchFormFields:FieldConfig[];
  addFormFields:FieldConfig[];
  remFormFields:FieldConfig[];
  formConfig:FormConfig

  @ViewChild('searchForm')
    searchForm: DynamicFormComponent;

  @ViewChild('addTransForm') set addTransForm(val:DynamicFormComponent) {
    this._addTransForm = val
  }

  @ViewChild('remTransForm') set remTransForm(val:DynamicFormComponent) {
      this._remTransForm=val;
    }

  constructor(
    private matService:MaterialiService,
    private storeServ: MagazzinoService,
    private dynFieldsConf:DynFormsFieldConf,
    private cdRef:ChangeDetectorRef
  ) {
    //forms configuration
    this.searchFormFields = this.dynFieldsConf.getFormFields(SEARCHFIELDS)
    this.addFormFields = this.dynFieldsConf.getFormFields(ADDTRANSFIELDS)
    this.remFormFields = this.dynFieldsConf.getFormFields(REMTRANSFIELDS)
    this.formConfig = {
      searchForm: {
        formName: 'searchForm'
      },
      addTransForm: {
        formName:'addTransForm',
        elementStyle:['insertForm']
      },
      remTransForm: {
        formName:'remTransForm',
        elementStyle:['insertForm']
      }
    }
   }

  ngOnInit() {
    this.setCodeForSearch$
      .switchMap((val:any)=>{
        return this.matService.searchByCode(val);
      }).subscribe(
        (v:any)=>{
          if (v && v.length) {
            let config:FormChanges = {
              targetForm:'searchForm',
              valueToUpdate:v[0].code,
              formControlName:"code",
              fromService:v[0]
            }
            this.manageFormChange(config);
          }
        })
  }

  toggleState(){
    this.variationMode = !this.variationMode
  }


  addItem(type:boolean){
    this.isAddingMode=type;
  }


  manageFormChange(change:FormChanges){
    if(change.targetForm =='searchForm'){
      //in questo caso, qualsiasi cambiamento comporta un update globale della form
      if(!change.fromService) throw 'Oggetto per update non ricevuto'
        this.searchForm.updateWholeForm(change)
        this.setCurrentArticle(<MaterialiItem>change.fromService)
      }
      else if (change.targetForm == "addTransForm"){
        if (!this._addTransForm) this.cdRef.detectChanges()
        if(change.formControlName=="motivazioni") {
          if (change.selectedOption =='Da Ordine'){
            var localFieldConf = this.addFormFields.filter(field=> field.formControlName=='numorder')[0]
            localFieldConf.visible=true;
            if (! this._addTransForm.dynForm.controls[localFieldConf.formControlName]) this._addTransForm.addControl(localFieldConf)
          }
          else {
            this.addFormFields.filter(field=> field.formControlName=='numorder')[0].visible=false;
            this._addTransForm.removeControl(this.addFormFields.filter(field=> field.formControlName=='numorder')[0])
          }
        }
      }
      else if(change.targetForm == "remTransForm") {
        if (!this._remTransForm) this.cdRef.detectChanges()
        if(change.formControlName =="motivazioni") {
          var localFieldConf = this.remFormFields.filter(field=> field.formControlName=='numorder')[0]
          if (change.selectedOption =='Storno da Ordine'){
            localFieldConf.visible=true;
            if (! this._remTransForm.dynForm.controls[localFieldConf.formControlName]) this._remTransForm.addControl(localFieldConf)
          }
          else {

            this._remTransForm.removeControl(this.remFormFields.filter(field=> field.formControlName=='numorder')[0])
            this.remFormFields.filter(field=> field.formControlName=='numorder')[0].visible=false;
          }
        }
      }
      else return
    }

  onFormSubmit(formName:string) {
    switch(formName){
      case "searchForm":
        let currentcode = this.searchForm.dynForm.getRawValue().code
        if (!currentcode || (this.currentArticle && this.currentArticle.code == currentcode)) return
        else this.setCodeForSearch.next(this.searchForm.dynForm.getRawValue().code)
      break;
      case "addTransForm":

          if(this._addTransForm.dynForm.status =="VALID" && this.currentArticle){
            this.storeServ.addTransaction(this._addTransForm.dynForm,this.currentArticle).subscribe((res:any)=>{
              this._addTransForm.displaySubmitResponse(res)
              this._addTransForm.dynForm.reset()
              if(res.cback) this.currentArticle=res.cback;
            })
          }
      break;
      case "remTransForm":
        if(this._remTransForm.dynForm.status =="VALID" && this.currentArticle) {
          if (this._remTransForm.dynForm.controls.quantity.value > this.currentArticle.totalInStore.tot) {
            this._remTransForm.setWarning('quantity','Impossibile sottrarre più elementi di quelli presenti in magazzino')
            this.remFormFields.filter(conf=> conf.formControlName=='quantity')[0].warns = 'Impossibile sottrarre più elementi di quelli presenti in magazzino';
          }
          else return this.storeServ.remTransaction(this._remTransForm.dynForm, this.currentArticle).subscribe((res:any)=>{
            this._remTransForm.displaySubmitResponse(res)
            this._remTransForm.dynForm.reset()
            this.currentArticle=res.cback;
          });
        }
      break;
      default:
       return
     }
  }
  setCurrentArticle(article:MaterialiItem) {
    this.currentArticle = article;
  }

}
