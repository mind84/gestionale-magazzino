import { Component, OnInit, Input, AfterViewInit, EventEmitter, Output, ViewChild } from '@angular/core';
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
  constructor(private UMServ: UmService, private _fb: FormBuilder, private matSer:MaterialiService, private catArtServ:CategorieArticoliService) {

   }

  ngOnInit() {
      this.updateForm = this._fb.group({
          code: ['', Validators.required ],
          name: ['', Validators.required ],
          categname: ['', Validators.required ],
          categ:[''],
          fornitore: ['', Validators.required ],
          qta: ['', Validators.required],
          umId: ['', Validators.required],
          price: ['', Validators.required ],
          collobj:['', Validators.required ],
          note:''
      })
      this.searchCat$
        .debounceTime(300)
        .distinctUntilChanged()
        .subscribe((term:string)=>{
          if (term.length <3) this.isSearchingCat = false;
          else {

            return this.catArtServ.search(term).subscribe((categories:any)=>{
              if (categories.length) this.isSearchingCat=true;
              this.prevCat = categories;
            })
          }
        })

  }

  setCurrentCat(cat:any){
    this.isSearchingCat=false;
    this.catName = cat.name;
    this.catcode= cat.id;
  }
  ngAfterViewInit(){
    console.log(this.updateInsertForm);
    setTimeout(()=>{
    this.updateInsertForm.dynForm.patchValue(this._inputFields)
    this.defVal= this.updateForm.getRawValue();

    },0)
    setTimeout(()=>{
    Object.keys(this._inputFields).forEach((key)=>{
      if (key in this.updateForm.controls)
        this.updateForm.controls[key].patchValue(this._inputFields[key]);
    })
    this.defVal= this.updateForm.getRawValue();

    },0)
  }
  update(form:FormGroup, index:number) {
    //form comparison
    let subjform = {}
    _.forIn(form.getRawValue(), (v,k)=>{
      if (v !== this.defVal[k]) subjform[k] = v;
    })
    if (_.isEmpty(subjform)) return;
    else {
      subjform['realcode'] = this._inputFields.code;
      this.matSer.update(subjform).subscribe((res:any)=>{
        if (res && res.msg=="OK") {
          this.hasError=false;
          //emit dell'evento per notificare il parent
        }
        else this.hasError=true;
        this.hasResponse=true;
        this.notifyInsert=res;
        setTimeout(()=>{
          if (this.hasError) return;
          else {
            let event= [this.notifyInsert.cback, this._index]
            this.updateParent.emit(event)
            this.hasResponse=false;
          }

        },2000)

    })
    }
  }


}
