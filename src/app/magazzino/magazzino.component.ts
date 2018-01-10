import { Component, OnInit,ViewChild, AfterViewInit, AfterViewChecked, Inject, Injector} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {AddMotivation} from '../shared/sharedClass/AddMotivation';
import {RemoveMotivation} from '../shared/sharedClass/RemoveMotivation'
import {MaterialiService} from '../services/materiali.service';
import {MagazzinoService} from '../services/magazzino.service';
import {MaterialiItem} from '../shared/interfaces/item-materiali.interface'
import {gtZero} from '../shared/functions/validators';
import {Subject} from 'rxjs/Subject'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'
import {DynamicFormComponent} from '../shared/components/dynamic-form.component'
import {SearchFormsFieldConf, AddFormsFieldConf} from './magazzino-forms.config';
import {FormChanges, FormConfig} from '../shared/interfaces/form-interface'

import 'rxjs/add/operator/pairwise'
import 'rxjs/add/operator/switchMap'

let searchFactory = (matServ:MaterialiService, storeServ:MagazzinoService)=>{
  return new SearchFormsFieldConf(matServ)
}

@Component({
  selector: 'app-magazzino',
  templateUrl: './magazzino.component.html',
  styleUrls: ['./magazzino.component.css'],
    providers: [
      MaterialiService,
       MagazzinoService,
       {provide: SearchFormsFieldConf, useFactory:searchFactory, deps:[MaterialiService]},
       AddFormsFieldConf
     ]
})
export class MagazzinoComponent implements OnInit {

  //searchForm: FormGroup;
  //addForm:FormGroup;
  remForm:FormGroup;
  variationMode:boolean = true;
  currentArticle:MaterialiItem;
  addMotivation:AddMotivation;
  removeMotivation:any;
  setCodeForSearch:Subject<FormGroup> = new Subject<FormGroup>();
  setCodeForSearch$:Observable<any> = this.setCodeForSearch.asObservable()

  private isAddingMode:boolean = true;
  motivazioniAdd:any;
  motivazioniRem:any;
  byorder:boolean;
  totWarn:boolean=false;
  insertResponse:any;

  searchFormFields;
  addFormFields;
  formConfig:FormConfig

  @ViewChild(DynamicFormComponent) searchForm: DynamicFormComponent;
  @ViewChild(DynamicFormComponent) addTransForm: DynamicFormComponent;
  @ViewChild(DynamicFormComponent) remTransForm: DynamicFormComponent;
  constructor(
    private matService:MaterialiService,
    private _fb: FormBuilder,
    private storeServ: MagazzinoService,
    private searchConf:SearchFormsFieldConf,
    private addConf: AddFormsFieldConf
  ) {
    this.addMotivation = new AddMotivation().motivArray;
    this.motivazioniAdd=this.addMotivation[0].motName;
    this.removeMotivation = new RemoveMotivation().motivArray;
    this.motivazioniRem=this.removeMotivation[0].motName;
    //forms configuration
    this.addFormFields = this.addConf.fields;
    this.searchFormFields = this.searchConf.fields

    this.formConfig = {
      searchForm: {
        formName: 'searchForm'
      },
      addForm: {
        formName:'addForm'
      }
    }
   }

  ngOnInit() {

    /*this.addForm = this._fb.group({
      qtadd:[null, Validators.compose([Validators.required, gtZero])],
      motivazioni:[],
      note:""
    })*/

    this.remForm = this._fb.group({
      qtsub:[null, Validators.compose([Validators.required, gtZero])],
      motivazioni:[],
      note:""
    })

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
    return this.variationMode = !this.variationMode
  }


  addItem(type:boolean){
    return this.isAddingMode=type;
  }

  onChangeAdd(ev,form){
    if (ev=="Da Ordine") {
      this.byorder=true;
    //  this.addForm.addControl('numorder',new FormControl(null,Validators.required))
    }
    else {
      this.byorder=false;
        if(form.controls.numorder) form.controls.numorder.setValue("");
      //  this.addForm.removeControl('numorder');

    }
  }
  onChangeRem(ev,form){
    if (ev=="Storno da Ordine") {
      this.byorder=true;
      this.remForm.addControl('numorder',new FormControl(null,Validators.required))
    }
    else {
      this.byorder=false;
        if(form.controls.numorder) form.controls.numorder.setValue("");
        this.remForm.removeControl('numorder');

    }
  }

  addTrans(form){
      if(form.status =="VALID" && this.currentArticle){
        this.storeServ.addTransaction(form,this.currentArticle).subscribe((res:any)=>{
          this.insertResponse= res;
          setTimeout(()=>{this.insertResponse=null},2000)
          this.currentArticle=res.cback;
          //this.addForm.reset();
        })
      }

    //gestione middleware di salvataggio
  }
  remTrans(form){
    if(form.status =="VALID" && this.currentArticle) {
    if (form.controls.qtsub.value > this.currentArticle.totalInStore.tot) {
      this.totWarn = true;
      return setTimeout(()=>{this.totWarn=false},1900);
    }
    else return this.storeServ.remTransaction(form, this.currentArticle).subscribe((res:any)=>{
      this.insertResponse= res;
      setTimeout(()=>{this.insertResponse=null},2000)
      this.currentArticle=res.cback;
      this.remForm.reset();
    });
  }
  }


  manageFormChange(change:FormChanges){
    let currentForm:DynamicFormComponent =this[change.targetForm]

    switch(change.targetForm){
      case "searchForm":
      //in questo caso, qualsiasi cambiamento comporta un update globale della form
      if(!change.fromService) throw 'Oggetto per update non ricevuto'
        currentForm.updateWholeForm(change)
        this.setCurrentArticle(<MaterialiItem>change.fromService)
      break;
      case "addForm":
      break;
      default:
       return

    }
  }

  onFormSubmit(formName:string) {
    let currentForm:DynamicFormComponent =this[formName];
    switch(formName){
      case "searchForm":
        let currentcode = currentForm.dynForm.getRawValue().code
        if (!currentcode || (this.currentArticle && this.currentArticle.code == currentcode)) return
        else this.setCodeForSearch.next(currentForm.dynForm.getRawValue().code)
      break;
      default:
       return
     }
  }
  setCurrentArticle(article:MaterialiItem) {
    return this.currentArticle = article;
  }

}
