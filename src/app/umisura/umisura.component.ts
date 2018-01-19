import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {UmService} from '../services/um.service'
import * as _ from 'lodash';

import {DynamicFormComponent} from '../shared/components/dynamic-form.component'
import {FormChanges, FormConfig, FieldConfig} from '../shared/interfaces/form-interface'
import {DynFormsFieldConf} from '../shared/sharedClass/form-config.class'

import {SEARCHFIELDS, INSERT_UMISURA_FORM_FIELDS, UPDATE_UMISURA_FORM_FIELDS} from './configuration/unita-misura-form.conf'
//import {UPDATE_CATEGORIE_FORM_FIELDS} from './configuration/update-categorie-articoli-form.conf'


@Component({
  selector: 'app-umisura',
  templateUrl: './umisura.component.html',
  styleUrls: ['./umisura.component.css'],
  providers: [DynFormsFieldConf]
})
export class UmisuraComponent implements OnInit {

  insertMode:boolean = false
  searchResults:any = [];

  _insertUmisuraForm:DynamicFormComponent
  _updateUmisuraForm:DynamicFormComponent
  searchFormFields:FieldConfig[]
  insertUmisuraFormFields:FieldConfig[]
  updateUmisuraFormFields: FieldConfig[]
  formConfig:FormConfig
  isUpdating:any = {};
  formInitValue:any;
  @ViewChild('searchForm')
    searchForm: DynamicFormComponent;

  @ViewChild('insertUmisuraForm') set addUmisuraForm(val:DynamicFormComponent) {
    this._insertUmisuraForm = val
  }
  @ViewChild('updateUmisuraForm') set updateUmisuraForm(val:DynamicFormComponent) {
    this._updateUmisuraForm = val
  }




  constructor(private UMService:UmService, private _fb: FormBuilder, private dynFieldsConf:DynFormsFieldConf) { }

  ngOnInit() {
    this.searchFormFields = this.dynFieldsConf.getFormFields(SEARCHFIELDS)
    this.insertUmisuraFormFields= this.dynFieldsConf.getFormFields(INSERT_UMISURA_FORM_FIELDS)
    this.updateUmisuraFormFields = this.dynFieldsConf.getFormFields(UPDATE_UMISURA_FORM_FIELDS)
    this.formConfig = {
      searchForm: {
        formName: 'searchForm'
      },
       insertUmisuraForm: {
        formName: 'insertUmisuraForm',
        elementStyle:['insertForm']
      },
      updateUmisuraForm: {
       formName: 'updateUmisuraForm',
       elementStyle:['insertForm']
     }
    }
  }

  manageFormChange(change:FormChanges){
    if(change.targetForm =='searchForm'){
      this.searchForm.updateFormValues(change);
    }
    else if(change.targetForm =='insertUmisuraForm'){
     this._insertUmisuraForm.updateFormValues(change);
    }
    else if(change.targetForm =='updateUmisuraForm'){
     this._updateUmisuraForm.updateFormValues(change);
    }
  }
  toggleInsert():boolean {
    return this.insertMode = !this.insertMode
  }
  toggleUpdating(index):any {
    if(!(index in this.isUpdating)) this.isUpdating[index]=false
    return this.isUpdating[index] = !this.isUpdating[index]
  }

  setInitValue(initValue:any){
    this.formInitValue = initValue;
  }


  onFormSubmit(formName:string){
    if (formName=='searchForm') {
      if(this.searchForm.runPreSubmitValidation()) {
        this.insertMode = false;
        let code = this.searchForm.dynForm.controls.umsymb.value;
          if (!code) return;
          else return this.UMService.search(code).subscribe((res:any)=>{
            this.searchResults=res
          })
          }
    }
    else if (formName =='insertUmisuraForm'){
      return this.UMService.insert(this._insertUmisuraForm.dynForm).subscribe((res:any)=>{
        this._insertUmisuraForm.displaySubmitResponse(res)
          if (res && res.msg=="OK") {
            this._insertUmisuraForm.dynForm.reset();
          }
      })
    }
  }
  search(form:FormGroup):any{
    this.insertMode = false;
    let code = form.controls.umsymb.value.id;
      if (!code) return;
      else return this.UMService.search(code).subscribe((res:any)=>{
        this.searchResults=res
      })
    }

}
