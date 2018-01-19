import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {UmService} from '../services/um.service'
import * as _ from 'lodash';

import {DynamicFormComponent} from '../shared/components/dynamic-form.component'
import {FormChanges, FormConfig, FieldConfig} from '../shared/interfaces/form-interface'
import {DynFormsFieldConf} from '../shared/sharedClass/form-config.class'

import {SEARCHFIELDS, INSERT_UMISURA_FORM_FIELDS} from './configuration/unita-misura-form.conf'
//import {UPDATE_CATEGORIE_FORM_FIELDS} from './configuration/update-categorie-articoli-form.conf'


@Component({
  selector: 'app-umisura',
  templateUrl: './umisura.component.html',
  styleUrls: ['./umisura.component.css'],
  providers: [DynFormsFieldConf]
})
export class UmisuraComponent implements OnInit {
  insertUMForm: FormGroup;
  //searchForm: FormGroup;
  insertMode:boolean = false
  searchResults:any = [];
  notifyInsert:any;
  hasResponse:boolean = false;
  hasError:boolean=false;
  hasLoaded:boolean = false;
  um:any = [];
  mainReference:any=[]
  selectedSearchValue:any;
  selectedMainReference:any;


  _insertUmisuraForm:DynamicFormComponent
  searchFormFields:FieldConfig[]
  insertUmisuraFormFields:FieldConfig[]
  updateCategorieFormFields: FieldConfig[]
  formConfig:FormConfig
  @ViewChild('searchForm')
    searchForm: DynamicFormComponent;

  @ViewChild('insertUmisuraForm') set addUmisuraForm(val:DynamicFormComponent) {
    this._insertUmisuraForm = val
  }



  constructor(private UMService:UmService, private _fb: FormBuilder, private dynFieldsConf:DynFormsFieldConf) { }

  ngOnInit() {
    this.searchFormFields = this.dynFieldsConf.getFormFields(SEARCHFIELDS)
    this.insertUmisuraFormFields= this.dynFieldsConf.getFormFields(INSERT_UMISURA_FORM_FIELDS)
    this.formConfig = {
      searchForm: {
        formName: 'searchForm'
      },
       insertUmisuraForm: {
        formName: 'insertUmisuraForm',
        elementStyle:['insertForm']
      }
    }

    //reperimento unità di misura disponibili
    this.UMService.getMainReference().subscribe((um) =>{
    this.UMService.umreference=um;
    this.selectedSearchValue=um[0]
    this.mainReference = _.filter(um, {class:"mainReference"})
    this.selectedMainReference = this.mainReference[0]
    this.um = um
    this.hasLoaded=true;

    this.insertUMForm = this._fb.group({
        nameref: ['', Validators.required ],
        umref: ['', Validators.required ],
        umrefsymb: ['', Validators.required ],
        umdesc: ['', Validators.required ],
        umsymb: ['', Validators.required ],
        conversione:['', Validators.required ]
      })

      //
      // this.searchForm = this._fb.group({
      //     umdesc: null,
      //     umsymb: null
      //   })
      })
  }

  manageFormChange(change:FormChanges){
    if(change.targetForm =='searchForm'){
      this.searchForm.updateFormValues(change);
    }
    else if(change.targetForm =='insertUmisuraForm'){
     this._insertUmisuraForm.updateFormValues(change);
    }
  }
  toggleInsert():boolean {
    return this.insertMode = !this.insertMode
  }
  onChange(ev, form){
    if (ev.id)
      form.controls.umdesc.setValue(ev.umdesc);

  }

  onRefChange(ev, form){
    if (ev && ev.id) {
      form.controls.umref.setValue(ev.umdesc);
    form.controls.umref.setValue(ev.umsymb);
    form.controls.umrefsymb.setValue(ev.umdesc);
  }
  }
  insert(form:FormGroup): any {
    console.log('submit')
    if(form.status == "INVALID") return;
    else return this.UMService.insert(form).subscribe((res:any)=>{
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
