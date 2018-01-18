import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {MaterialiService} from '../services/materiali.service'
import {CategorieArticoliService} from '../services/categorie-articoli.service'
import {DynamicFormComponent} from '../shared/components/dynamic-form.component'
import {FormChanges, FormConfig, FieldConfig} from '../shared/interfaces/form-interface'
import {DynFormsFieldConf} from '../shared/sharedClass/form-config.class'

import {SEARCHFIELDS, INSERTMATERIALIFORMFIELDS} from './configuration/materiali-forms.conf'
import {UPDATE_MATERIALI_FORM_FIELDS} from './configuration/materiali-updateforms.conf'


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
  insertMode:boolean = false
  searchResults:any = [];

  isUpdating:any = {};

  _inserMaterialiForm:DynamicFormComponent
  searchFormFields:FieldConfig[]
  insertMaterialiFormFields:FieldConfig[]
  updateMaterialiFormFields: FieldConfig[]
  formConfig:FormConfig
  @ViewChild('searchForm')
    searchForm: DynamicFormComponent;

  @ViewChild('insertMaterialiForm') set addTransForm(val:DynamicFormComponent) {
    this._inserMaterialiForm = val
  }



  constructor(
    private matService:MaterialiService,
    private _fb: FormBuilder,
    private catArtServ:CategorieArticoliService,
    private dynFieldsConf:DynFormsFieldConf,
    private cdRef:ChangeDetectorRef
   ) {
     this.searchFormFields = this.dynFieldsConf.getFormFields(SEARCHFIELDS)
     this.insertMaterialiFormFields = this.dynFieldsConf.getFormFields(INSERTMATERIALIFORMFIELDS)
      this.updateMaterialiFormFields = this.dynFieldsConf.getFormFields(UPDATE_MATERIALI_FORM_FIELDS)
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

  }

  toggleInsert() {
    this.insertMode = !this.insertMode
  }
  toggleUpdating(index):any {
    if(!(index in this.isUpdating)) this.isUpdating[index]=null
     this.isUpdating[index] = !this.isUpdating[index]

  }

  updateSearchResults(ev:any){
    let index = _.findIndex(this.searchResults, {_id: ev[0]._id})
    if (index>-1) {
      //è stata modificata la categoria?
      //ev[0].categname = ev[0].catdet[0].name;
      this.searchResults.splice(index, 1, ev[0])
      this.isUpdating[ev[1]]=false;
    }
    else return;
  }

  onFormSubmit(formName:string){
    switch(formName){
      case 'searchForm':
      if(this.searchForm.runPreSubmitValidation()) {
        this.insertMode = false;
        this.isUpdating = {};
        let code = this[formName].dynForm.controls.code.value;
        let name = this[formName].dynForm.controls.name.value;
        let categ = this[formName].dynForm.controls.categ.value;
          if (!code && !name && !categ) return;
          else this.matService.search(code, name, categ).subscribe((res:any)=>{
            this.searchResults=res
          })
      }
      break;
      case 'insertMaterialiForm':
        if(this._inserMaterialiForm.runPreSubmitValidation()) {
          this.matService.insert(this._inserMaterialiForm.dynForm).subscribe((res:any)=>{
            this._inserMaterialiForm.displaySubmitResponse(res)
            if(res.msg==='OK') {
              this._inserMaterialiForm.dynForm.reset()
            }
           })
         //
        }
      break;
      default:
      break
    }

  }
}
