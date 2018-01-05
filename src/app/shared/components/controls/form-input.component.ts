import { Component, OnInit, HostBinding } from '@angular/core';
import {Field} from '../../interfaces/form-interface'
import {FieldConfig} from '../../interfaces/form-interface'

import {FormGroup, AbstractControl} from '@angular/forms'


@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements Field, OnInit {
@HostBinding('class') hostClasses:string;
elementClasses:string;
contClasses:string;
control:AbstractControl;
get classHost(){ return this.config.hostStyle}
get classCont(){ return this.config.containerStyle}
get classElem(){ return this.config.elementStyle}
  constructor() { }
    config: FieldConfig;
    group:FormGroup

    ngOnInit(){
      this.addHostClasses(this.config)
      this.addElemClasses(this.config)
      this.control= this.group.get(this.config.formControlName)

    }

    addHostClasses(config:FieldConfig):void{
      if(this.classHost) {
        this.hostClasses=this.classHost.join(" ");
      }
    }
    addContClasses(config:FieldConfig):void{
          if(this.classCont) {
            this.contClasses=this.classCont.join(" ");
          }
        }

    addElemClasses(config:FieldConfig):void{
      if(this.classElem) {
        this.elementClasses=this.classElem.join(" ");
      }
    }


}
