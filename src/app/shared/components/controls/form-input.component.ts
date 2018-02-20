import { Component, OnInit, HostBinding, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {Field} from '../../interfaces/form-interface'
import {FieldConfig, FormChanges} from '../../interfaces/form-interface'
import {FormService} from '../../../services/form-service'
import {FormGroup, AbstractControl} from '@angular/forms'


@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements Field, OnInit, AfterViewInit {
  @HostBinding('class') hostClasses:string;
  elementClasses:string;
  contClasses:string;
  control:AbstractControl;
  controlDirectivesObject:any;
  get classHost(){ return this.config.hostStyle}
  get classCont(){ return this.config.containerStyle}
  get classElem(){ return this.config.elementStyle}
  get controlDirectives() {
    let arrayObj:any={};
    this.config.controlDirectives.forEach(dirname =>{
      arrayObj[dirname] = true
    })
    return arrayObj;
  }
  config: FieldConfig;
  group:FormGroup
  @Input()
  patchValue:any
  updateControl:Function;
  constructor(private fs:FormService, private cd : ChangeDetectorRef) {
    this.updateControl =  this.onChangesControl.bind(this)
  }

  ngOnInit(){
    this.addHostClasses(this.config)
    this.addElemClasses(this.config)
    this.control= this.group.get(this.config.formControlName)
    this.controlDirectivesObject= this.controlDirectives;
    this.control.valueChanges.subscribe(change=>{
      let valuetoupdate;
      if (this.config.simpleChange)
        if (this.config.simleChangeFunction) {
          valuetoupdate = this.fs[this.config.simleChangeFunction](this.group, this.config.paramSimpleChange)
          this.config.linkedSimpleChangeFields.forEach(field=>{
            this.group.controls[field].setValue(valuetoupdate)
          })
        }

    })
  }

  ngAfterViewInit(){
    if (this.patchValue) setTimeout(()=>{
        this.control.setValue(this.patchValue)
    },0);
  }

  addHostClasses(config:FieldConfig):void{
    if(this.classHost)
        this.hostClasses=this.classHost.join(" ");
  }

  addContClasses(config:FieldConfig):void{
    if(this.classCont) this.contClasses=this.classCont.join(" ");
  }

  addElemClasses(config:FieldConfig):void{
    if(this.classElem) this.elementClasses=this.classElem.join(" ");
  }

  onChangesControl(changes:any){
    return this.fs.pushChanges(this.config,{selectedOption:null, updateObj:changes});
  }
}
