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

import 'rxjs/add/operator/pairwise'
import 'rxjs/add/operator/switchMap'

let searchFactory = (matServ:MaterialiService, storeServ:MagazzinoService)=>{
  return new SearchFormsFieldConf(matServ, storeServ)
}

@Component({
  selector: 'app-magazzino',
  templateUrl: './magazzino.component.html',
  styleUrls: ['./magazzino.component.css'],
    providers: [
      MaterialiService,
       MagazzinoService,
       {provide: SearchFormsFieldConf, useFactory:searchFactory, deps:[MaterialiService, MagazzinoService]}
     ]
})
export class MagazzinoComponent implements OnInit {

  searchForm: FormGroup;
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
  SearchFormFields;
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
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
   }

  ngOnInit() {
    //this.inputConfig= this.SearchFormFields;
    this.searchForm = this._fb.group({
        code: null,
        name: null,
        datfrom: null,
        datto: null
      })
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

      this.matService.currentSelectedArticle$.subscribe((art)=>{
        this.searchForm.controls.name.setValue(art.name);
        this.searchForm.controls.code.setValue(art.code);
        this.currentArticle = art;
      })

      this.setCodeForSearch$
      .pairwise()
      .filter((p)=>{
        return (p[0] !== p[1])
      }).switchMap((val:any)=>{
        return this.matService.searchByCode(val[1]);
      }).subscribe(
        (v:any)=>{
          if (v && v.length) {
            this.searchForm.controls.name.setValue(v[0].name);
            this.currentArticle=v[0];
          }
        })


      this.setCodeForSearch.next(this.searchForm.getRawValue().code)

      this.storeServ.currentSelectedSearchArticle$.subscribe((article:MaterialiItem)=>{
        if (article) {
        let key = Object.keys(article).forEach(key=>{
          console.log("called")
          this.form.setValue(key, article[key])
        })
          console.log()
        }
      })
  }

  // ngAfterViewChecked(){
  //   console.log("check")
  //   if(this.form) {
  //   let previousValid = this.form.valid;
  //   this.form.changes.subscribe(()=>{
  //     if(this.form.valid!== previousValid) {
  //       this.form.setDisabled('submit', true)
  //     }
  //
  //   })
  // }
  // }

  toggleState(){
    return this.variationMode = !this.variationMode
  }

  search(form:FormGroup){
    if (!form.getRawValue().code) return;
    else this.setCodeForSearch.next(form.getRawValue().code)

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
  log(ev){
    console.log(ev)
  }
  changeConf(){
    this.SearchFormFields[0].disabled= !this.SearchFormFields[0].disabled;
    let p = Object.assign({},this.SearchFormFields);
    this.SearchFormFields= p;
  }

}
