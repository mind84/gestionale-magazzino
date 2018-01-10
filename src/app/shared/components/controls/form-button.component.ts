import { Component, OnInit, HostBinding } from '@angular/core';
import {Field} from '../../interfaces/form-interface'
import {FieldConfig} from '../../interfaces/form-interface'

import {FormGroup} from '@angular/forms'

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.css']
})
export class FormButtonComponent implements Field, OnInit {
  get classHost(){ return this.config.hostStyle}
  get classCont(){ return this.config.containerStyle}
  get classElem(){ return this.config.elementStyle}
  @HostBinding('class') hostClasses:string;
  elementClasses:string;
  contClasses:string;

  constructor() { }

  config: FieldConfig;
  group:FormGroup

  ngOnInit(){
    this.addHostClasses(this.config)
    this.addElemClasses(this.config)
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
