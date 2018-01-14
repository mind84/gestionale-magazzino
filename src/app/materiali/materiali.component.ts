import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {MaterialiService} from '../services/materiali.service'
import {CategorieArticoliService} from '../services/categorie-articoli.service'
import {DynamicFormComponent} from '../shared/components/dynamic-form.component'
import {FormChanges, FormConfig, FieldConfig} from '../shared/interfaces/form-interface'
import {DynFormsFieldConf} from '../shared/sharedClass/form-config.class'

import {SEARCHFIELDS, INSERTMATERIALIFORMFIELDS} from './configuration/materiali-forms.conf'


import {UmService} from '../services/um.service'
import {Subject} from 'rxjs/Subject'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/filter'
import * as _ from 'lodash';

@Component({
  selector: 'app-materiali',
  templateUrl: './materiali.component.html',
  styleUrls: ['./materiali.component.css'],
  providers: [MaterialiService, DynFormsFieldConf]
})
export class MaterialiComponent implements OnInit {
  insertMaterialiForm: FormGroup;
  insertMode:boolean = false
  searchResults:any = [];
  notifyInsert:any;
  hasResponse:boolean = false;
  hasError:boolean=false;
  isUpdating:any = {};
  um:any
  selectedSearchValue:any;
  searchCat$: Subject<string> = new Subject<string>()
  searchCat$Search: Subject<string> = new Subject<string>()
  prevCat:any;
  isSearchingCat:boolean;
  catcode:number = null;
  catName:string = "";
  prevCatSearch:any;
  isSearchingCatSearch:boolean;
  catcodeSearch:number = null;
  catNameSearch:string = "";


  _inserMaterialiForm:DynamicFormComponent
  searchFormFields:FieldConfig[]
  insertMaterialiFormFields:FieldConfig[]
  formConfig:FormConfig
  @ViewChild('searchForm')
    searchForm: DynamicFormComponent;

  @ViewChild('insertMaterialiForm') set addTransForm(val:DynamicFormComponent) {
    this._inserMaterialiForm = val
  }



  constructor(
    private matService:MaterialiService,
    private _fb: FormBuilder,
    private UMService:UmService,
    private catArtServ:CategorieArticoliService,
    private dynFieldsConf:DynFormsFieldConf,
    private cdRef:ChangeDetectorRef
   ) {
     this.searchFormFields = this.dynFieldsConf.getFormFields(SEARCHFIELDS)
     this.insertMaterialiFormFields = this.dynFieldsConf.getFormFields(INSERTMATERIALIFORMFIELDS)
     this.formConfig = {
       searchForm: {
         formName: 'searchForm'
       },
       insertMaterialiForm: {
         formName: 'insertMaterialiForm',
         elementStyle:['insertForm']
       }
     }

    }
  manageFormChange(change:FormChanges){
    if(change.targetForm =='searchForm'){
      this.searchForm.updateFormValues(change);
    }
    else if (change.targetForm=='insertMaterialiForm') {
      this._inserMaterialiForm.updateFormValues(change)
    }
  }
  ngOnInit() {
    this.UMService.getMainReference().subscribe((um) =>{
      this.um=um;
      this.UMService.umreference=um;
      this.selectedSearchValue=um[0]

      // this.insertMaterialiForm = this._fb.group({
      //     code: ['', Validators.required ],
      //     name: ['', Validators.required ],
      //     categname: ['', Validators.required ],
      //     categ:[''],
      //     fornitore: ['', Validators.required ],
      //     qta: ['', Validators.required],
      //     umId: ['', Validators.required],
      //     price: ['', Validators.required ],
      //     collobj:['', Validators.required ],
      //     note:''
      //   })
    })
  }

  toggleInsert() {
    this.insertMode = !this.insertMode
    //this.cdRef.detectChanges()
  }
  toggleUpdating(index):any {
    if(!(index in this.isUpdating)) this.isUpdating[index]=false
    return this.isUpdating[index] = !this.isUpdating[index]
  }

  insert(form:FormGroup): any {
    if(form.status == "INVALID") return;
    else return this.matService.insert(form).subscribe((res:any)=>{
        if (res && res.msg=="OK") {
          this.hasError=false;
          form.reset();
        }
        else this.hasError=true;
        this.hasResponse=true;
        this.notifyInsert=res;
        setTimeout(()=>{this.hasResponse=false},1000)
    })


  }

  updateSearchResults(ev:any){
    let index = _.findIndex(this.searchResults, {_id: ev[0]._id})
    if (index>-1) {
      //è stata modificata la categoria?
      ev[0].categname = ev[0].catdet[0].name;
      this.searchResults.splice(index, 1, ev[0])
      this.isUpdating[ev[1]]=false;
    }
    else return;
  }

  onFormSubmit(formName:string){
    switch(formName){
      case 'searchForm':
      this.insertMode = false;
      let code = this[formName].dynForm.controls.code.value;
      let name = this[formName].dynForm.controls.name.value;
      let categ = this[formName].dynForm.controls.categ.value;
        if (!code && !name && !categ) return;
        else this.matService.search(code, name, categ).subscribe((res:any)=>{
          //elaborare la risposta con lodash
          _.forEach(res, (v,k)=>{
            if (v.catdet.length) v.categname = v.catdet[0].name
        })
          this.searchResults=res
        })
      break;
      default:
      break
    }

  }
}
