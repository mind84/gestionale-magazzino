import { Component, OnInit, Input, AfterViewInit, EventEmitter, Output } from '@angular/core';
import {UmService} from '../../services/um.service';
import {MaterialiService} from '../../services/materiali.service'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/distinctUntilChanged'
import * as _ from 'lodash'

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit, AfterViewInit {
  _inputFields:any;
  _um:any;
  _index:any;
  dataUPD:any;
  defVal:any;
  notifyInsert:any;
  hasResponse:boolean = false;
  hasError:boolean=false;
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
  constructor(private UMServ: UmService, private _fb: FormBuilder, private matSer:MaterialiService) {

   }

  ngOnInit() {
      this.updateForm = this._fb.group({
          code: ['', Validators.required ],
          name: ['', Validators.required ],
          fornitore: ['', Validators.required ],
          qta: ['', Validators.required],
          umId: ['', Validators.required],
          price: ['', Validators.required ],
          collobj:['', Validators.required ],
          note:''
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
            let event= [this.notifyInsert.cback, this.ind]
            this.updateParent.emit(event)
            this.hasResponse=false;
          }

        },2000)

    })
    }
  }

}
