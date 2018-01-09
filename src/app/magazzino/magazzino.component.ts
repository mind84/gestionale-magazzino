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
import {SearchFormsFieldConf} from './magazzino-forms.config';
import {FormChanges, EventChanges} from '../shared/interfaces/form-interface'

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
       {provide: SearchFormsFieldConf, useFactory:searchFactory, deps:[MaterialiService]}
     ]
})
export class MagazzinoComponent implements OnInit {

  //searchForm: FormGroup;
  addForm:FormGroup;
  remForm:FormGroup;
  variationMode:boolean = true;
  currentArticle:any;
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
  searchFormName:string;
  SearchFormFields;
  FORMS:any
  @ViewChild(DynamicFormComponent) searchForm: DynamicFormComponent;
  @ViewChild(DynamicFormComponent) addTransForm: DynamicFormComponent;
  @ViewChild(DynamicFormComponent) remTransForm: DynamicFormComponent;
  constructor(
    private matService:MaterialiService,
    private _fb: FormBuilder,
    private storeServ: MagazzinoService,
    private searchConf:SearchFormsFieldConf
  ) {
    this.addMotivation = new AddMotivation().motivArray;
    this.motivazioniAdd=this.addMotivation[0].motName;
    this.removeMotivation = new RemoveMotivation().motivArray;
    this.motivazioniRem=this.removeMotivation[0].motName;

    this.SearchFormFields = this.searchConf.fields
    this.searchFormName = 'searchForm'

   }

  ngOnInit() {
    this.FORMS = {
      searchForm: {
        name:"searchForm"
      },
      addTransForm: {
          name:'addTransForm'
      },
      remTransForm: {
        name:this.remForm
      }
    }
    this.addForm = this._fb.group({
      qtadd:[null, Validators.compose([Validators.required, gtZero])],
      motivazioni:[],
      note:""
    })

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
              valueToUpdate:v[0].code,
              formControlName:"code",
              fromService:v[0]
            }
            this.manageFormChange({changes:config, formName: this.FORMS.searchForm.name});
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
      this.addForm.addControl('numorder',new FormControl(null,Validators.required))
    }
    else {
      this.byorder=false;
        if(form.controls.numorder) form.controls.numorder.setValue("");
        this.addForm.removeControl('numorder');

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
          this.addForm.reset();
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


  manageFormChange(change:EventChanges){
    let form= this[change.formName];
    if(!form) return;
    let conf = this.searchConf.fields.filter(controlConfig=> controlConfig.formControlName===change.changes.formControlName)[0]
    if (!change.changes.formControlName) return form.dynForm.reset()
    form.setValues(conf,change.changes)

    if (conf.afterChanges.isAlreadySubmitted) {
      this.currentArticle=change.changes.fromService
    }
  }

  onFormSubmit(formName:string) {
    if (formName=="searchForm") {
      let currentcode = this[formName].dynForm.getRawValue().code
      if (!currentcode || (this.currentArticle && this.currentArticle.code == currentcode)) return
      else this.setCodeForSearch.next(this.searchForm.dynForm.getRawValue().code)
    }
  }

}
