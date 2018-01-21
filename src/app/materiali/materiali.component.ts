import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import {MaterialiService} from '../services/materiali.service'
import {CategorieArticoliService} from '../services/categorie-articoli.service'
import {DynamicFormComponent} from '../shared/components/dynamic-form.component'
import {FormChanges, FormConfig, FieldConfig} from '../shared/interfaces/form-interface'
import {DynFormsFieldConf} from '../shared/sharedClass/form-config.class'

import {SEARCHFIELDS, INSERTMATERIALIFORMFIELDS, UPDATE_MATERIALI_FORM_FIELDS} from './configuration/materiali-forms.conf'

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

  _insertMaterialiForm:DynamicFormComponent
  _updateMaterialiForm:DynamicFormComponent
  searchFormFields:FieldConfig[]
  formInitValue:any
  insertMaterialiFormFields:FieldConfig[]
  updateMaterialiFormFields: FieldConfig[]
  formConfig:FormConfig
  @ViewChild('searchForm')
    searchForm: DynamicFormComponent;

  @ViewChild('insertMaterialiForm') set insertMaterialiForm(val:DynamicFormComponent) {
    this._insertMaterialiForm = val
  }
  @ViewChild('updateMaterialiForm') set updateMaterialiForm(val:DynamicFormComponent) {
    this._updateMaterialiForm = val
  }

  constructor(
    private matService:MaterialiService,
    private catArtServ:CategorieArticoliService,
    private dynFieldsConf:DynFormsFieldConf,
    private cdRef:ChangeDetectorRef
   ) { }

  ngOnInit() {
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
       },
       updateMaterialiForm: {
         formName: 'updateMaterialiForm',
         elementStyle:['insertForm']
       }
     }
   }

  setInitValue(initValue:any){
    this.formInitValue = initValue;
  }

  toggleInsert() {
    this.insertMode = !this.insertMode
  }

  toggleUpdating(index):any {
    if(!(index in this.isUpdating)) this.isUpdating[index]=null
    //contestualmente chiudere tutte le altre
    Object.keys(this.isUpdating).forEach((key)=>{
      if (key == index) this.isUpdating[index] = !this.isUpdating[index]
      else this.isUpdating[key] = false
  })
  }

  manageFormChange(change:FormChanges){
    if(change.targetForm =='searchForm'){
      this.searchForm.updateFormValues(change);
    }
    else if (change.targetForm=='insertMaterialiForm') {
      this._insertMaterialiForm.updateFormValues(change)
    }
    else if (change.targetForm=='updateMaterialiForm') {
      this._updateMaterialiForm.updateFormValues(change)
    }
  }

  updateSearchResults(ev:any){
    const index = _.findIndex(this.searchResults, {_id: ev[0]._id})
    setTimeout((_)=>{
    if (index>-1) {
      this.searchResults.splice(index, 1, ev[0])
      this.isUpdating[ev[1]]=false;
    }
    else return;
    },2000)
  }

  onFormSubmit(event){
    let ev = event;
    switch(ev[0]){
      case 'searchForm':
        this.insertMode = false;
        this.isUpdating = {};
        let code = this[ev[0]].dynForm.controls.code.value;
        let name = this[ev[0]].dynForm.controls.name.value;
        let categ = this[ev[0]].dynForm.controls.categ.value;
        if (!code && !name && !categ) return;
        else this.matService.search(code, name, categ).subscribe((res:any)=>{
          this.searchResults=res
        })
      break;
      case 'insertMaterialiForm':
        this.matService.insert(this._insertMaterialiForm.dynForm).subscribe((res:any)=>{
          this._insertMaterialiForm.displaySubmitResponse(res)
          if(res.msg==='OK') {
            this._insertMaterialiForm.dynForm.reset()
          }
        })
      break;
      case 'updateMaterialiForm':
      let changes = this._updateMaterialiForm.checkForChanges()
      if(changes){
        changes['realcode'] = this.searchResults[event[1]].code;
        this.matService.update(changes).subscribe((res:any)=>{
          this._updateMaterialiForm.displaySubmitResponse(res)
          if(res.msg==='OK') {
            this.updateSearchResults([res.cback, ev[1]])
          }
        })
      }
      break;
      default:
      break
    }
  }
}
