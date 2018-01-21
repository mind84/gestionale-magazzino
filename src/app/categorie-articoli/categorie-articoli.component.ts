import { Component, OnInit, ViewChild } from '@angular/core';
import {CategorieArticoliService} from '../services/categorie-articoli.service';
import {MaterialiService} from '../services/materiali.service'

import {DynamicFormComponent} from '../shared/components/dynamic-form.component'
import {FormChanges, FormConfig, FieldConfig} from '../shared/interfaces/form-interface'
import {DynFormsFieldConf} from '../shared/sharedClass/form-config.class'

import {SEARCHFIELDS, INSERT_CATEGORIE_FORM_FIELDS, UPDATE_CATEGORIE_FORM_FIELDS} from './configuration/categorie-articoli-form.conf'

import * as _ from 'lodash';
@Component({
  selector: 'app-categorie-articoli',
  templateUrl: './categorie-articoli.component.html',
  styleUrls: ['./categorie-articoli.component.css'],
    providers: [CategorieArticoliService, DynFormsFieldConf]
})
export class CategorieArticoliComponent implements OnInit {
  /*visual control*/
  insertMode:boolean = false
  isUpdating:any = {};
  /*search variables*/
  searchResults:any = [];

  /*forms control*/
  formInitValue:any;
  _inserCategorieForm:DynamicFormComponent
  _updateCategorieForm:DynamicFormComponent
  searchFormFields:FieldConfig[]
  insertCategorieFormFields:FieldConfig[]
  updateCategorieFormFields: FieldConfig[]
  formConfig:FormConfig

  @ViewChild('searchForm')
    searchForm: DynamicFormComponent;

  @ViewChild('insertCategorieForm') set addCategForm(val:DynamicFormComponent) {
    this._inserCategorieForm = val
  }
  @ViewChild('updateCategorieForm') set updateCategForm(val:DynamicFormComponent) {
    this._updateCategorieForm = val
  }


  constructor(
    private catArtService:CategorieArticoliService,
     private dynFieldsConf:DynFormsFieldConf,
   ) { }

  ngOnInit() {
    /*initialize fomr control configuration*/
     this.searchFormFields = this.dynFieldsConf.getFormFields(SEARCHFIELDS)
     this.insertCategorieFormFields = this.dynFieldsConf.getFormFields(INSERT_CATEGORIE_FORM_FIELDS)
     this.updateCategorieFormFields = this.dynFieldsConf.getFormFields(UPDATE_CATEGORIE_FORM_FIELDS)
     /*initialize fomr configuration*/
     this.formConfig = {
       searchForm: {
         formName: 'searchForm'
       },
        insertCategorieForm: {
         formName: 'insertCategorieForm',
         elementStyle:['insertForm']
       },
       updateCategorieForm: {
        formName: 'updateCategorieForm',
        elementStyle:['insertForm']
      }
     }
  }

  setInitValue(initValue:any){
      this.formInitValue = initValue;
  }

  toggleInsert():boolean {
    return this.insertMode = !this.insertMode

  }
  toggleUpdating(index):any {
    if(!(index in this.isUpdating)) this.isUpdating[index]=false
    Object.keys(this.isUpdating).forEach((key)=>{
      if (key == index) this.isUpdating[index] = !this.isUpdating[index]
      else this.isUpdating[key] = false
    })
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

  onFormSubmit(event:any){
    let ev = event;
    switch(ev[0]){
      case 'searchForm':
        this.insertMode = false;
        this.isUpdating = {};
        let name = this.searchForm.dynForm.controls.name.value;
          if (name) {
           return this.catArtService.search(name).subscribe((res:any)=>{
            this.searchResults=res
          })
        }
      break;
      case 'insertCategorieForm':
        this.catArtService.insert(this._inserCategorieForm.dynForm).subscribe((res:any)=>{
          this._inserCategorieForm.displaySubmitResponse(res)
          if(res.msg==='OK') {
            this._inserCategorieForm.dynForm.reset()
          }
        })
      break;
      case 'updateCategorieForm':
        let changes = this._updateCategorieForm.checkForChanges()
        if(changes){
          changes['id'] = this.searchResults[event[1]].id;
          this.catArtService.update(changes).subscribe((res:any)=>{
            this._updateCategorieForm.displaySubmitResponse(res)
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
