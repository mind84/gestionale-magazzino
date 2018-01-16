import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {AbstractControl} from '@angular/forms'
import {FieldConfig} from '../interfaces/form-interface'
import * as Vf from '../functions/validators'

@Component({
  selector: 'app-form-field-error-display',
  templateUrl: './form-field-error-display.component.html',
  styleUrls: ['./form-field-error-display.component.css']
})
export class FormFieldErrorDisplayComponent implements OnInit, OnChanges {

control:AbstractControl;
pristine:boolean;
touched:boolean;
invalid:boolean;
showError: boolean = false;
errorMsgs:string[] = [];

@Input('formCntr') set formCntr(val:AbstractControl){
  if(val) this.control = val;
}
@Input('isPristine') set isPristine(val:boolean) {
  this.pristine = val;
}
@Input('isTouched') set isTouched(val:boolean) {
  this.touched = val;
}
@Input('isInvalid') set isInvalid(val:boolean) {
  this.invalid = val;
}
@Input() conf:FieldConfig
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes){
    this.setErrMsg()
  }

  setErrMsg(){
    if (!this.invalid) return this.showError = false;
    if (!this.pristine && this.touched){
      let Err: string[]=[];
      Object.keys(this.control.errors).forEach(key=>{
          if (!Vf.VALIDATOR_CONFIG[key]) {
            Err.push('errore')
            console.warn(`testo di errore per la funzione di validazione ${key} non indicato`)
        }
        else Err.push(Vf.VALIDATOR_CONFIG[key])
      })
      this.showError=true;
      this.errorMsgs=Err
    }
  }

}
