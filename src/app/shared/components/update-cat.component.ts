import { Component, OnInit, Input, AfterViewInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Observable} from 'rxjs/Observable'
import {CategorieArticoliService} from '../../services/categorie-articoli.service'
import 'rxjs/add/operator/distinctUntilChanged'
import * as _ from 'lodash'
import {DynamicFormComponent} from './dynamic-form.component'
import {FormChanges, FormConfig, FieldConfig} from '../interfaces/form-interface'
import {DynFormsFieldConf} from '../sharedClass/form-config.class'


@Component({
  selector: 'app-update-cat',
  templateUrl: './update-cat.component.html',
  styleUrls: ['./update-cat.component.css']
})
export class UpdateCatComponent implements OnInit, AfterViewInit {


  @Input() formConfig:FormConfig
  @Input() fieldsFormConfig:FieldConfig[]
  @ViewChild('updateInsertForm') updateInsertForm:DynamicFormComponent
  _inputFields:any;
  _um:any;
  _index:any;
  dataUPD:any;
  defVal:any;
  insertResponse:any;

  @Output() updateParent = new EventEmitter();
  get inputFields(): any {
    return this._inputFields;
    }
  @Input('inputFields')
  set inputFields(v:any){
    this._inputFields=v;
  }

  @Input('ind')
  set ind(v:any){
    this._index=v;
  }
  updateForm:any;
  isReady:boolean;
  constructor(private _fb: FormBuilder, private carArtServ: CategorieArticoliService) {

   }

  ngOnInit() {

  }
  ngAfterViewInit(){

  }

  setInitValue(initValue:any){
    this.defVal = initValue;
  }

  onFormSubmit(formName:string){
    let subjform = {}
    _.forIn(this.updateInsertForm.dynForm.getRawValue(), (v,k)=>{
      if (v !== this.defVal[k]) subjform[k] = v;
    })
    if (_.isEmpty(subjform)) return;
    else {
      subjform['id'] = this._inputFields.id;
      this.carArtServ.update(subjform).subscribe((res:any)=>{
         this.updateInsertForm.displaySubmitResponse(res)
         if(res.msg==='OK') {
           let event= [res.cback, this._index]
         }
        if (res && res.msg=="OK") {
          setTimeout(()=>{
              let event= [res.cback, this._index]
              this.updateParent.emit(event)
          },2000)
        }
    })
    }

  }

}
