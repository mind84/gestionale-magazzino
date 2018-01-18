import { Component, OnInit, ViewChild } from '@angular/core';
import {CategorieArticoliService} from '../services/categorie-articoli.service';
import {MaterialiService} from '../services/materiali.service'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {DynamicFormComponent} from '../shared/components/dynamic-form.component'
import {FormChanges, FormConfig, FieldConfig} from '../shared/interfaces/form-interface'
import {DynFormsFieldConf} from '../shared/sharedClass/form-config.class'

import {SEARCHFIELDS, INSERT_CATEGORIE_FORM_FIELDS} from './configuration/categorie-articoli-form.conf'
import {UPDATE_CATEGORIE_FORM_FIELDS} from './configuration/update-categorie-articoli-form.conf'

import * as _ from 'lodash';
@Component({
  selector: 'app-categorie-articoli',
  templateUrl: './categorie-articoli.component.html',
  styleUrls: ['./categorie-articoli.component.css'],
    providers: [CategorieArticoliService, DynFormsFieldConf]
})
export class CategorieArticoliComponent implements OnInit {
  insertCatForm: FormGroup;
  //searchForm: FormGroup;
  insertMode:boolean = false
  searchResults:any = [];
  isUpdating:any = {};
  insertResponse:any;

  _inserCategorieForm:DynamicFormComponent
  searchFormFields:FieldConfig[]
  insertCategorieFormFields:FieldConfig[]
  updateCategorieFormFields: FieldConfig[]
  formConfig:FormConfig
  @ViewChild('searchForm')
    searchForm: DynamicFormComponent;

  @ViewChild('insertCategorieForm') set addCategForm(val:DynamicFormComponent) {
    this._inserCategorieForm = val
  }


  constructor(
    private catArtService:CategorieArticoliService,
     private _fb: FormBuilder,
     private dynFieldsConf:DynFormsFieldConf,
   ) { }

  ngOnInit() {
     this.searchFormFields = this.dynFieldsConf.getFormFields(SEARCHFIELDS)
     this.insertCategorieFormFields = this.dynFieldsConf.getFormFields(INSERT_CATEGORIE_FORM_FIELDS)
          this.updateCategorieFormFields = this.dynFieldsConf.getFormFields(UPDATE_CATEGORIE_FORM_FIELDS)
     this.formConfig = {
       searchForm: {
         formName: 'searchForm'
       },
        insertCategorieForm: {
         formName: 'insertCategorieForm',
         elementStyle:['insertForm']
       }
     }

    this.insertCatForm = this._fb.group({
        name: ['', Validators.required ],
        descr: ['', Validators.required ]
      })
  }

  toggleInsert():boolean {
    return this.insertMode = !this.insertMode
  }
  toggleUpdating(index):any {
    if(!(index in this.isUpdating)) this.isUpdating[index]=false
    return this.isUpdating[index] = !this.isUpdating[index]
  }

  insert(form:FormGroup): any {
    if(form.status == "INVALID") return;
    else return this.catArtService.insert(form).subscribe((res:any)=>{
      this.insertResponse= res;
        if (res && res.msg=="OK") form.reset();
    })


  }

    updateSearchResults(ev:any){
      let index = _.findIndex(this.searchResults, {_id: ev[0]._id})
      if (index>-1) {
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
          let name = this.searchForm.dynForm.controls.name.value;
            if (!name) return;
            else return this.catArtService.search(name).subscribe((res:any)=>{
              this.searchResults=res
            })
          }
        break;
        case 'insertCategorieForm':
        if(this.searchForm.runPreSubmitValidation()) {
          this.catArtService.insert(this._inserCategorieForm.dynForm).subscribe((res:any)=>{
            this._inserCategorieForm.displaySubmitResponse(res)
            if(res.msg==='OK') {
              this._inserCategorieForm.dynForm.reset()
            }
          })
        }

        break;
        default:
        break
      }
}
}
