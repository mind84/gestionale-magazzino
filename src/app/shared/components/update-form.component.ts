import { Component, OnInit, Input, AfterViewInit, EventEmitter, Output, ViewChild} from '@angular/core';
import {UmService} from '../../services/um.service';
import {MaterialiService} from '../../services/materiali.service'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import {Observable} from 'rxjs/Observable'
import {CategorieArticoliService} from '../../services/categorie-articoli.service'
import 'rxjs/add/operator/distinctUntilChanged'
import {Subject} from 'rxjs/Subject'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/filter'
import * as _ from 'lodash'

import {DynamicFormComponent} from './dynamic-form.component'
import {FormChanges, FormConfig, FieldConfig} from '../interfaces/form-interface'
import {DynFormsFieldConf} from '../sharedClass/form-config.class'


@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit, AfterViewInit {


  @Input() formConfig:FormConfig
  @Input() fieldsFormConfig:FieldConfig[]
  @ViewChild('updateInsertForm') updateInsertForm:DynamicFormComponent
  _inputFields:any;
  _um:any;
  _index:any;
  dataUPD:any;
  defVal:any;
  notifyInsert:any;
  hasResponse:boolean = false;
  hasError:boolean=false;
  searchCat$: Subject<string> = new Subject<string>()
  prevCat:any;
  isSearchingCat:boolean;
  catcode:number = null;
  catName:string = "";

  @Output() updateParent = new EventEmitter();
  get inputFields(): any {
    return this._inputFields;
    }
  @Input('inputFields')
  set inputFields(v:any){
    this._inputFields=v;
  }
  @Input('um')
  set um(v:any){
    this._um=v;
  }
  @Input('ind')
  set ind(v:any){
    this._index=v;
  }
  updateForm:any;
  isReady:boolean;
  constructor(private _fb: FormBuilder, private matSer:MaterialiService, private catArtServ:CategorieArticoliService) {

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
    if (_.isEmpty(subjform)) {
      return
    }
    else {
      subjform['realcode'] = this._inputFields.code;
      this.matSer.update(subjform).subscribe((res:any)=>{

          this.updateInsertForm.displaySubmitResponse(res)
          if(res.msg==='OK') {
            let event= [res.cback, this._index]
            this.updateParent.emit(event)

          }

    })
    }
  }

}
