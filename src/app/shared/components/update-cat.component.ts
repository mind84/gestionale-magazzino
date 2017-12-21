import { Component, OnInit, Input, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Observable} from 'rxjs/Observable'
import {CategorieArticoliService} from '../../services/categorie-articoli.service'
import 'rxjs/add/operator/distinctUntilChanged'
import * as _ from 'lodash'

@Component({
  selector: 'app-update-cat',
  templateUrl: './update-cat.component.html',
  styleUrls: ['./update-cat.component.css']
})
export class UpdateCatComponent implements OnInit, AfterViewInit {

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
    this.updateForm = this._fb.group({
        name: ['', Validators.required ],
        descr: ['', Validators.required ]
    })
  }
  ngAfterViewInit(){
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
      subjform['id'] = this._inputFields.id;
      this.carArtServ.update(subjform).subscribe((res:any)=>{
        this.insertResponse=res;
        if (res && res.msg=="OK") {
          setTimeout(()=>{
              let event= [this.insertResponse.cback, this._index]
              this.updateParent.emit(event)
          },2000)
        }
    })
    }
  }

}
