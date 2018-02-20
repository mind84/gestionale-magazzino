import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import {FornitoriService} from '../services/fornitori.service'

import {DynamicFormComponent} from '../shared/components/dynamic-form.component'
import {FormChanges, FormConfig, FieldConfig} from '../shared/interfaces/form-interface'
import {DynFormsFieldConf} from '../shared/sharedClass/form-config.class'

import {SEARCHFIELDS, INSERTFORNITORIFORMFIELDS, UPDATE_FORNITORI_FORM_FIELDS} from './configuration/fornitori-forms.conf'

import * as _ from 'lodash';

@Component({
  selector: 'app-fornitori',
  templateUrl: './fornitori.component.html',
  styleUrls: ['./fornitori.component.css'],
    providers: [FornitoriService, DynFormsFieldConf]
})
export class FornitoriComponent implements OnInit {
  insertMode:boolean = false
  searchResults:any = [];

  isUpdating:any = {};

  _insertFornitoriForm:DynamicFormComponent
  _updateFornitoriForm:DynamicFormComponent
  searchFormFields:FieldConfig[]
  formInitValue:any
  insertFornitoriFormFields:FieldConfig[]
  updateFornitoriFormFields: FieldConfig[]
  formConfig:FormConfig
  @ViewChild('searchForm')
    searchForm: DynamicFormComponent;

  @ViewChild('insertFornitoriForm') set insertFornitoriForm(val:DynamicFormComponent) {
    this._insertFornitoriForm = val
  }
  @ViewChild('updateFornitoriForm') set updateFornitoriForm(val:DynamicFormComponent) {
    this._updateFornitoriForm = val
  }

  constructor(
    private fornService:FornitoriService,
    private dynFieldsConf:DynFormsFieldConf,
    private cdRef:ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.searchFormFields = this.dynFieldsConf.getFormFields(SEARCHFIELDS)
    this.insertFornitoriFormFields = this.dynFieldsConf.getFormFields(INSERTFORNITORIFORMFIELDS)
    this.updateFornitoriFormFields = this.dynFieldsConf.getFormFields(UPDATE_FORNITORI_FORM_FIELDS)
    this.formConfig = {
       searchForm: {
         formName: 'searchForm'
       },
       insertFornitoriForm: {
         formName: 'insertFornitoriForm',
         elementStyle:['insertForm']
       },
       updateFornitoriForm: {
         formName: 'updateFornitoriForm',
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
    else if (change.targetForm=='insertFornitoriForm') {
      this._insertFornitoriForm.updateFormValues(change)
    }
    else if (change.targetForm=='updateFornitoriForm') {
      this._updateFornitoriForm.updateFormValues(change)
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
        let name = this[ev[0]].dynForm.controls.name.value;
        if (!name) return;
        else this.fornService.search(name).subscribe((res:any)=>{
          this.searchResults=res
        })
      break;
      case 'insertFornitoriForm':
        this.fornService.insert(this._insertFornitoriForm.dynForm).subscribe((res:any)=>{
          this._insertFornitoriForm.displaySubmitResponse(res)
          if(res.msg==='OK') {
            this._insertFornitoriForm.dynForm.reset()
          }
        })
      break;
      case 'updateFornitoriForm':
      let changes = this._updateFornitoriForm.checkForChanges()
      if(changes){
        changes['realcode'] = this.searchResults[event[1]].code;
        this.fornService.update(changes).subscribe((res:any)=>{
          this._updateFornitoriForm.displaySubmitResponse(res)
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
